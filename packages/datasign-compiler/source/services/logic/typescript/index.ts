import {
    DatasignEntity,
    DatasignEntityData,
    DatasignCompilerOptions,
} from '../../../data/interfaces';

import {
    trimSpace,
    formatCode,
} from '../../utilities';



const generateTypescriptFields = (
    data: DatasignEntityData[],
) => {
    const fields: string[] = [];

    const spacing = '    ';
    const separator = ': ';
    const semicolon = ';';
    for (const field of data) {
        const {
            name,
            type,
            required,
        } = field;
        const requireString = required ? '' : '?';
        const fieldText = spacing + name + requireString + separator + type + semicolon;
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
    return trimSpace(entityText);
}

const generateTypescript = (
    parsed: DatasignEntity[],
    options: DatasignCompilerOptions,
) => {
    const typescriptText = [];

    for (const entity of parsed) {
        const entityText = generateTypescriptEntity(entity);
        typescriptText.push(entityText);
    }

    return formatCode(typescriptText);
}


export default generateTypescript;
