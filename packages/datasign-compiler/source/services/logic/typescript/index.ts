import {
    DatasignEntity,
    DatasignEntityData,
} from '../../../data/interfaces';



const generateTypescriptFields = (
    data: DatasignEntityData[],
) => {
    const fields: string[] = [];

    for (const field of data) {
        const fieldText = `    ${field.name}${field.required ? '' : '?'}: ${field.type};`;
        fields.push(fieldText);
    }

    return fields;
}


const generateTypescriptEntity = (
    entity: DatasignEntity,
) => {
    const fields = generateTypescriptFields(entity.data);
    const stringedFields = fields.join('\n');

    const entityText = `
export interface ${entity.name} {
${stringedFields}
}
`;
    return entityText;
}

const generateTypescript = (
    parsed: DatasignEntity[],
) => {
    let typescriptText = '';

    for (const entity of parsed) {
        const entityText = generateTypescriptEntity(entity);
        typescriptText += entityText;
    }

    return typescriptText;
}


export default generateTypescript;
