import {
    DatasignEntity,
} from '../../../data/interfaces';



const generateTypescript = (
    parsed: DatasignEntity[],
) => {
    let typescriptText = '';

    const generateTypescriptEntity = (
        entity: DatasignEntity,
    ) => {
        const entityText = `
export interface ${entity.name} {
id: string;
}
        `;
        return entityText;
    }

    for (const entity of parsed) {
        const entityText = generateTypescriptEntity(entity);
        typescriptText += entityText;
    }

    return typescriptText;
}


export default generateTypescript;
