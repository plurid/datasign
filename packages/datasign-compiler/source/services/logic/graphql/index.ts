import {
    DatasignEntity,
    DatasignEntityData,
    DatasignCompilerOptions,
} from '../../../data/interfaces';

import {
    capitalize,
    formatCode,
} from '../../utilities';



const generateGraphqlFields = (
    data: DatasignEntityData[],
    options: DatasignCompilerOptions,
) => {
    const fields: string[] = [];

    const spacing = '    ';
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
        const typeString = capitalize(type);
        const fieldText = spacing + name + separator + typeString + requireString;
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

    const entityText = formattedComments
        + `type ${entity.name} {\n`
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
