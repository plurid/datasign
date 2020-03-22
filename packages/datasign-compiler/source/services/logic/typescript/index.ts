import {
    DatasignEntity,
    DatasignEntityData,
    DatasignCompilerOptions,
} from '../../../data/interfaces';

import {
    formatCode,
} from '../../utilities';



const generateTypescriptFields = (
    data: DatasignEntityData[],
    options: DatasignCompilerOptions,
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
            empty,
        } = field;

        if (empty) {
            if (options.preserveSpacing) {
                fields.push('');
            }
            continue;
        }

        const requireString = required ? '' : '?';
        const fieldText = spacing + name + requireString + separator + type + semicolon;
        fields.push(fieldText);
    }

    return fields;
}


const generateTypescriptEntity = (
    entity: DatasignEntity,
    options: DatasignCompilerOptions,
) => {
    const fields = generateTypescriptFields(entity.data, options);
    const stringedFields = fields.join('\n');
    const stringedComments = entity.comments !== ''
        ? entity.comments + '\n'
        : '';


    const entityText = stringedComments
        + `export interface ${entity.name} {`
        + stringedFields
        + '}';

    return entityText;
}

const generateTypescript = (
    parsed: DatasignEntity[],
    options: DatasignCompilerOptions,
) => {
    const typescriptText = [];

    for (const entity of parsed) {
        const entityText = generateTypescriptEntity(entity, options);
        typescriptText.push(entityText);
    }

    return formatCode(typescriptText);
}


export default generateTypescript;
