import {
    ONE_NEW_LINE,
    TWO_NEW_LINES,
} from '../../../data/constants';

import {
    DatasignEntity,
    DatasignEntityData,
} from '../../../data/interfaces';

import {
    trimSpace,
} from '../../utilities';



const generateTypescriptFields = (
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
        const requireString = required ? '' : '?';
        const fieldText = spacing + name + requireString + separator + type;
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
) => {
    const typescriptText = [];

    for (const entity of parsed) {
        const entityText = generateTypescriptEntity(entity);
        typescriptText.push(entityText);
    }

    return typescriptText.join(TWO_NEW_LINES) + ONE_NEW_LINE;
}


export default generateTypescript;
