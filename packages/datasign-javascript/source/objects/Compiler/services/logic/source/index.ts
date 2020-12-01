// #region imports
    // #region external
    import {
        lineTypes,
    } from '#Compiler/data/constants';

    import {
        DatasignEntity,
        DatasignEntityData,
        DatasignAnnotation,
        TypedLine,
        DatasignCompilerOptions,
    } from '#Compiler/data/interfaces';

    import {
        trimTrailingSpace,
    } from '#Compiler/services/utilities';
    // #endregion external
// #endregion imports



// #region module
const isComment = (
    line: string,
) => {
    const normalCommentRE = new RegExp('^\\s*?\\/\\/');
    if (normalCommentRE.test(line)) {
        return true;
    }

    const documentationCommentRE = new RegExp('^(\\s*\\/\\*\\*)|(\\s*\\*\\/?)');
    if (documentationCommentRE.test(line)) {
        return true;
    }

    return false;
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

    /**
     * If value is not a single word, e.g. 'ID', 'input',
     * recombine the line without the name,
     * else simply store the single word.
     */
    const value = split.length > 2
        ? split.slice(1).join(':').trim().replace(';', '')
        : split[1].trim().replace(';', '');

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
        comments: '',
    };

    return field;
}


const allowedEntityAnnotations = [
    'entityID',
    'graphql',
];

const extractEntityAnnotations = (
    line: string,
): DatasignAnnotation | undefined => {
    const split = line.split(':');

    const name = split[0].trim().replace('@', '');
    if (!allowedEntityAnnotations.includes(name)) {
        return;
    }

    /**
     * If value is not a single word, e.g. 'ID', 'input',
     * recombine the line without the name,
     * else simply store the single word.
     */
    const value = split.length > 2
        ? split.slice(1).join(':').trim().replace(';', '')
        : split[1].trim().replace(';', '');

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
    const commentsLines= [];

    for (const line of unparsedEntity) {
        const {
            type,
            value,
        } = line;

        switch (type) {
            case 'ENTITY_ANNOTATION':
                unparsedEntityAnnotations.push(value);
                break;
            case 'ENTITY_COMMENT':
                commentsLines.push(value);
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
                {
                    const emptyField: DatasignEntityData = {
                        name: '',
                        type: '',
                        required: false,
                        annotations: [],
                        comments: '',
                        empty: true,
                    };
                    data.push(emptyField);
                    break;
                }
        }
    }

    const entityAnnotations = parseEntityAnnotations(unparsedEntityAnnotations);
    const comments = commentsLines.join('\n')
    const entity: DatasignEntity = {
        id,
        name,
        data,
        annotations: entityAnnotations,
        comments,
    };
    // console.log('entity', entity);

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


const parseSource = (
    source: string,
    options: DatasignCompilerOptions,
) => {
    const lines = source.split('\n');

    const unparsedEntities = [];
    let addingToEntity = false;
    let unparsedEntity: TypedLine[] = [];

    for (let line of lines) {
        if (isComment(line)) {
            if (options.comments && !addingToEntity) {
                const typedLine: TypedLine = {
                    value: line,
                    type: lineTypes.entityComment,
                };
                unparsedEntity.push(typedLine);
            }
            continue;
        }

        if (!options.comments) {
            line = removeInlineComment(line);
        }
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

        if (options.preserveSpacing) {
            if (!addingToEntity && line === '') {
                const typedLine: TypedLine = {
                    value: line,
                    type: lineTypes.emptyLine,
                };
                unparsedEntity.push(typedLine);
            }
        }
    }

    return parseEntities(unparsedEntities);
}
// #endregion module



// #region exports
export default parseSource;
// #endregion exports
