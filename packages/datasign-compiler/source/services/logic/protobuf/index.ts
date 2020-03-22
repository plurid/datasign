import {
    DatasignEntity,
    DatasignEntityData,
    DatasignCompilerOptions,
} from '../../../data/interfaces';

import {
    trimSpace,
    formatCode,
} from '../../utilities';



const generateProtobufFields = (
    data: DatasignEntityData[],
    options: DatasignCompilerOptions,
) => {
    const fields: string[] = [];

    // required string id = 1
    const spacing = '    ';
    const space = ' ';
    const equal = ' = ';
    const semicolon = ';';

    for (const [index, field] of data.entries()) {
        const {
            name,
            type,
            required,
            empty
        } = field;

        if (empty) {
            if (options.preserveSpacing) {
                fields.push('');
            }
            continue;
        }

        const requiredString = required ? 'required ' : '';
        const fieldIndex = index + 1;
        const fieldText = spacing + requiredString + type + space + name + equal + fieldIndex + semicolon;
        fields.push(fieldText);
    }

    return fields;
}


const generateProtobufEntity = (
    entity: DatasignEntity,
    options: DatasignCompilerOptions,
) => {
    const fields = generateProtobufFields(entity.data, options);
    const stringedFields = fields.join('\n');

    const entityText = `
message ${entity.name} {
${stringedFields}
}
    `;

    return trimSpace(entityText);
}

const generateProtobuf = (
    parsed: DatasignEntity[],
    options: DatasignCompilerOptions,
) => {
    let protobufText = [];

    for (const entity of parsed) {
        const entityText = generateProtobufEntity(entity, options);
        protobufText.push(entityText);
    }

    return formatCode(protobufText);
}


export default generateProtobuf;
