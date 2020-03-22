import {
    DatasignEntity,
    DatasignEntityData,
} from '../../../data/interfaces';

import {
    capitalize,
} from '../../utilities';



const generateGraphqlFields = (
    data: DatasignEntityData[],
) => {
    const fields: string[] = [];

    const spacing = '    ';
    for (const field of data) {
        const {
            name,
            type,
            required,
        } = field;
        const requireString = required ? '!' : '';
        const typeString = capitalize(type);
        const fieldText = spacing + name + ': ' + typeString + requireString;
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
    return entityText;
}

const generateGraphql = (
    parsed: DatasignEntity[],
) => {
    let graphqlText = '';

    for (const entity of parsed) {
        const entityText = generateGraphqlEntity(entity);
        graphqlText += entityText;
    }

    return graphqlText;
}


export default generateGraphql;
