import {
    DatasignEntity,
    DatasignEntityData,
} from '../../../data/interfaces';

import {
    trimSpace,
    formatCode,
} from '../../utilities';



const generateProtobufFields = (
    data: DatasignEntityData[],
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
        } = field;
        const requiredString = required ? 'required ' : '';
        const fieldIndex = index + 1;
        const fieldText = spacing + requiredString + type + space + name + equal + fieldIndex + semicolon;
        fields.push(fieldText);
    }

    return fields;
}


const generateProtobufEntity = (
    entity: DatasignEntity,
) => {
    const fields = generateProtobufFields(entity.data);
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
) => {
    let protobufText = [];

    for (const entity of parsed) {
        const entityText = generateProtobufEntity(entity);
        protobufText.push(entityText);
    }

    return formatCode(protobufText);
}


export default generateProtobuf;
