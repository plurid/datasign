import {
    DatasignEntity,
    DatasignEntityData,
} from '../../../data/interfaces';

import {
    capitalize,
    trimSpace,
    formatCode,
} from '../../utilities';



const generateGraphqlFields = (
    data: DatasignEntityData[],
) => {
    const fields: string[] = [];

    const spacing = '    ';
    const separator = ': ';
    for (const field of data) {
        const {
            name,
            type,
            required,
        } = field;
        const requireString = required ? '!' : '';
        const typeString = capitalize(type);
        const fieldText = spacing + name + separator + typeString + requireString;
        fields.push(fieldText);
    }

    return fields;
}

const generateGraphqlEntity = (
    entity: DatasignEntity,
) => {
    const fields = generateGraphqlFields(entity.data);
    const stringedFields = fields.join('\n');

    const entityText = `
type ${entity.name} {
${stringedFields}
}
    `;
    return trimSpace(entityText);
}

const generateGraphql = (
    parsed: DatasignEntity[],
) => {
    const graphqlText = [];

    for (const entity of parsed) {
        const entityText = generateGraphqlEntity(entity);
        graphqlText.push(entityText);
    }

    return formatCode(graphqlText);
}


export default generateGraphql;
