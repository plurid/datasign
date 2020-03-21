import {
    DatasignEntity,
} from '../../../data/interfaces';



const generateProtobuf = (
    parsed: DatasignEntity[],
) => {
    let protobufText = '';

    const generateProtobufEntity = (
        entity: DatasignEntity,
    ) => {
        const entityText = `
message ${entity.name} {
required string id = 1
}
        `;
        return entityText;
    }

    for (const entity of parsed) {
        const entityText = generateProtobufEntity(entity);
        protobufText += entityText;
    }

    return protobufText;
}


export default generateProtobuf;
