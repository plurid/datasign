import {
    DatasignEntity,
} from '../../../data/interfaces';



const generateGraphql = (
    parsed: DatasignEntity[],
) => {
    let graphqlText = '';

    const generateGraphqlEntity = (
        entity: DatasignEntity,
    ) => {
        const entityText = `
type ${entity.name} {
id: String!
}
        `;
        return entityText;
    }

    for (const entity of parsed) {
        const entityText = generateGraphqlEntity(entity);
        graphqlText += entityText;
    }

    return graphqlText;
}


export default generateGraphql;
