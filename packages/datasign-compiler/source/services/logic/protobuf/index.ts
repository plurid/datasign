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



const generateProtobufFields = (
    data: DatasignEntityData[],
) => {
    const fields: string[] = [];

    // required string id = 1
    const spacing = '    ';
    const space = ' ';
    const equal = ' = ';
    for (const [index, field] of data.entries()) {
        const {
            name,
            type,
            required,
        } = field;
        const requiredString = required ? 'required ' : '';
        const fieldIndex = index + 1;
        const fieldText = spacing + requiredString + type + space + name + equal + fieldIndex;
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

    return protobufText.join(TWO_NEW_LINES) + ONE_NEW_LINE;
}


export default generateProtobuf;
