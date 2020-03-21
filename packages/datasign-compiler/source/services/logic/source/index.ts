import {
    lineTypes,
} from '../../../data/constants';

import {
    DatasignEntity,
    DatasignEntityData,
    TypedLine,
} from '../../../data/interfaces';



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

const trimTrailingSpace = (
    line: string,
) => {
    return line.replace(/\s+$/g, '');
}

const trimLeadingSpace = (
    line: string,
) => {
    return line.replace(/^\s+/g, '');
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

const extractField = (
    line: string,
    fieldAnnotations: string[],
) => {
    // TODO
    // parse fieldAnnotations

    const split = line.split(':');
    const name = split[0].trim().replace('?', '');
    const type = split[1].trim().replace(';', '');
    const required = !/\?/.test(line);

    const field: DatasignEntityData = {
        name,
        type,
        required,
    };

    return field;
}


const parseEntity = (
    unparsedEntity: TypedLine[],
) => {
    let name = '';
    let id = '';
    const data = [];
    let entityAnnotations = [];
    let fieldAnnotations = [];

    for (const line of unparsedEntity) {
        const {
            type,
            value,
        } = line;

        switch (type) {
            case 'ENTITY_ANNOTATION':
                entityAnnotations.push(value);
                break;
            case 'FIELD_ANNOTATION':
                fieldAnnotations.push(value);
                break;
            case 'DATA_START':
                name = extractEntityName(value);
                break;
            case 'DATA_END':
                break;
            case 'DATA_FIELD':
                {
                    const field = extractField(value, fieldAnnotations);
                    fieldAnnotations = [];
                    data.push(field);
                    break;
                }
            case 'EMPTY_LINE':
                break;
        }
    }

    // TOOD
    // parse entity annotations

    const entity: DatasignEntity = {
        id,
        name,
        data,
    };
    console.log(entity);
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
