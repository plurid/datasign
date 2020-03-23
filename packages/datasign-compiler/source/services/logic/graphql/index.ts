import {
    DatasignEntity,
    DatasignEntityData,
    DatasignCompilerOptions,
    DatasignAnnotation,
} from '../../../data/interfaces';

import {
    capitalize,
    formatCode,
    resolveSpacing,
} from '../../utilities';



const resolveGraphqlType = (
    type: string,
) => {
    switch (type) {
        case 'number':
            return 'Int';
        default:
            return capitalize(type);
    }
}

const resolveGraphqlEntityType = (
    annotations: DatasignAnnotation[],
) => {
    const graphqlAnnotations = [];
    for (const annotation of annotations) {
        if (annotation.name === 'graphql') {
            graphqlAnnotations.push(annotation);
        }
    }

    for (const graphqlAnnotation of graphqlAnnotations) {
        if (graphqlAnnotation.value.split(' ').length === 1) {
            return graphqlAnnotation.value;
        }

        if (graphqlAnnotation.value.includes('type:')) {
            return graphqlAnnotation.value.replace('type: ', '');
        }
    }

    return 'type';
}


const generateGraphqlFields = (
    data: DatasignEntityData[],
    options: DatasignCompilerOptions,
) => {
    const fields: string[] = [];

    const spacing = resolveSpacing(options.spacing);
    const separator = ': ';

    for (const field of data) {
        const {
            name,
            type,
            required,
            empty,
        } = field;

        if (empty) {
            if (options.preserveSpacing) {
                fields.push('');
            }
            continue;
        }

        const requireString = required ? '!' : '';
        const resolvedType = resolveGraphqlType(type);
        const fieldText = spacing + name + separator + resolvedType + requireString;
        fields.push(fieldText);
    }

    return fields;
}


const formatGraphqlComments = (
    comments: string,
) => {
    comments = comments.replace(/\/\//g, '#');
    comments = comments.replace(/\/\*\*/g, '#');
    comments = comments.replace(/\s\*/g, '#');
    comments = comments.replace(/\s\*\//g, '#');
    return comments;
}


const generateGraphqlEntity = (
    entity: DatasignEntity,
    options: DatasignCompilerOptions,
) => {
    const fields = generateGraphqlFields(entity.data, options);
    const stringedFields = fields.join('\n');
    const stringedComments = entity.comments !== ''
        ? entity.comments + '\n'
        : '';
    const formattedComments = formatGraphqlComments(stringedComments);
    const graphqlType = resolveGraphqlEntityType(entity.annotations);

    const entityText = formattedComments
        + `${graphqlType} ${entity.name} {\n`
        + stringedFields
        + '\n}';

    return entityText;
}

const generateGraphql = (
    parsed: DatasignEntity[],
    options: DatasignCompilerOptions,
) => {
    const graphqlText = [];

    for (const entity of parsed) {
        const entityText = generateGraphqlEntity(entity, options);
        graphqlText.push(entityText);
    }

    return formatCode(graphqlText);
}


export default generateGraphql;
