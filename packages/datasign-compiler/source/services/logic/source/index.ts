import {
    lineTypes,
} from '../../../data/constants';

import {
    DatasignEntity,
    DatasignEntityData,
    DatasignAnnotation,
    TypedLine,
} from '../../../data/interfaces';

import {
    trimTrailingSpace,
} from '../../../services/utilities';



const isComment = (
    line: string,
) => {
    return /^\s*?\/\//.test(line);
}


const isAnnotation = (
    line: string,
) => {
    return /^\s*?@/.test(line);
}


const isDatasignStart = (
    line: string,
) => {
    return /^\s*data \w+ {/.test(line);
}


const isDatasignEnd = (
    line: string,
) => {
    return /^\s*}/.test(line);
}

const removeInlineComment = (
    line: string,
) => {
    return line.replace(/\/\/.+$/, '');
}


const extractEntityName = (
    line: string,
) => {
    const nameRE = /^\s*data (\w+) {/;
    const match = line.match(nameRE);
    if (match) {
        return match[1];
    }
    return '';
}


const allowedFieldAnnotations = [
    'graphql',
    'protobuf',
    'typescript',
];

const extractFieldAnnotations = (
    line: string,
): DatasignAnnotation | undefined => {
    const split = line.split(':');

    const name = split[0].trim().replace('@', '');
    if (!allowedFieldAnnotations.includes(name)) {
        return;
    }

    const value = split[1].trim().replace(';', '');

    const annotation: DatasignAnnotation = {
        name,
        value,
    };
    return annotation;
}

const parseFieldAnnotations = (
    fieldAnnotations: string[]
) => {
    const annotations = [];

    for (const fieldAnnotation of fieldAnnotations) {
        const annotation = extractFieldAnnotations(fieldAnnotation);
        if (annotation) {
            annotations.push(annotation);
        }
    }

    return annotations;
}

const extractField = (
    line: string,
    fieldAnnotations: string[],
) => {
    const split = line.split(':');
    const name = split[0].trim().replace('?', '');
    const type = split[1].trim().replace(';', '');
    const requiredRE = new RegExp('\\?');
    const required = !requiredRE.test(line);

    const annotations = parseFieldAnnotations(fieldAnnotations);

    const field: DatasignEntityData = {
        name,
        type,
        required,
        annotations,
        comment: '',
    };

    return field;
}


const allowedEntityAnnotations = [
    'entityID',
];

const extractEntityAnnotations = (
    line: string,
): DatasignAnnotation | undefined => {
    const split = line.split(':');

    const name = split[0].trim().replace('@', '');
    if (!allowedEntityAnnotations.includes(name)) {
        return;
    }

    const value = split[1].trim().replace(';', '');

    const annotation: DatasignAnnotation = {
        name,
        value,
    };
    return annotation;
}

const parseEntityAnnotations = (
    entityAnnotations: string[],
): DatasignAnnotation[] => {
    const annotations = [];

    for (const entityAnnotation of entityAnnotations) {
        const annotation = extractEntityAnnotations(entityAnnotation);
        if (annotation) {
            annotations.push(annotation);
        }
    }

    return annotations;
}

const parseEntity = (
    unparsedEntity: TypedLine[],
) => {
    let name = '';
    let id = '';
    let unparsedEntityAnnotations = [];
    let unparsedFieldAnnotations = [];
    const data = [];

    for (const line of unparsedEntity) {
        const {
            type,
            value,
        } = line;

        switch (type) {
            case 'ENTITY_ANNOTATION':
                unparsedEntityAnnotations.push(value);
                break;
            case 'FIELD_ANNOTATION':
                unparsedFieldAnnotations.push(value);
                break;
            case 'DATA_START':
                name = extractEntityName(value);
                break;
            case 'DATA_END':
                break;
            case 'DATA_FIELD':
                {
                    const field = extractField(value, unparsedFieldAnnotations);
                    unparsedFieldAnnotations = [];
                    data.push(field);
                    break;
                }
            case 'EMPTY_LINE':
                break;
        }
    }

    const entityAnnotations = parseEntityAnnotations(unparsedEntityAnnotations);
    const entity: DatasignEntity = {
        id,
        name,
        data,
        annotations: entityAnnotations,
        comment: '',
    };

    return entity;
}


const parseEntities = (
    unparsedEntities: (TypedLine[])[],
) => {
    const entities: DatasignEntity[] = [];

    for (const unparsedEntity of unparsedEntities) {
        entities.push(parseEntity(unparsedEntity));
    }

    return entities;
}


const parseSource= (
    source: string,
) => {
    const lines = source.split('\n');

    const unparsedEntities = [];
    let addingToEntity = false;
    let unparsedEntity: TypedLine[] = [];

    for (let line of lines) {
        if (isComment(line)) {
            continue;
        }

        line = removeInlineComment(line);
        line = trimTrailingSpace(line);

        if (isAnnotation(line)) {
            const typedLine: TypedLine = {
                value: line,
                type: addingToEntity
                    ? lineTypes.fieldAnnotation
                    : lineTypes.entityAnnotation,
            };
            unparsedEntity.push(typedLine);
            continue;
        }

        if (isDatasignStart(line)) {
            addingToEntity = true;
            const typedLine: TypedLine = {
                value: line,
                type: lineTypes.dataStart,
            };
            unparsedEntity.push(typedLine);
            continue;
        }

        if (isDatasignEnd(line)) {
            const typedLine: TypedLine = {
                value: line,
                type: lineTypes.dataEnd,
            };
            unparsedEntity.push(typedLine);
            unparsedEntities.push(unparsedEntity);
            unparsedEntity = [];
            addingToEntity = false;
            continue;
        }

        if (addingToEntity) {
            const typedLine: TypedLine = {
                value: line,
                type: line !== ''
                    ? lineTypes.dataField
                    : lineTypes.emptyLine,
            };
            unparsedEntity.push(typedLine);
            continue;
        }
    }

    return parseEntities(unparsedEntities);
}


export default parseSource;
