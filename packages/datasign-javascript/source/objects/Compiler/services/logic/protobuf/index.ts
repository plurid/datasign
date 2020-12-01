// #region imports
    // #region external
    import {
        DatasignEntity,
        DatasignEntityData,
        DatasignCompilerOptions,
    } from '#Compiler/data/interfaces';

    import {
        formatCode,
        resolveSpacing,
        constructGeneratedNotice,
    } from '#Compiler/services/utilities';
    // #endregion external
// #endregion imports



// #region module
const resolveProtobufType = (
    type: string,
) => {
    switch (type) {
        case 'number':
            return 'int32';
        case 'boolean':
            return 'bool';
        default:
            return type;
    }
}

const generateProtobufFields = (
    data: DatasignEntityData[],
    options: DatasignCompilerOptions,
) => {
    const fields: string[] = [];

    const spacing = resolveSpacing(options.spacing);
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

        const resolvedType = resolveProtobufType(type);

        const requiredString = required ? 'required ' : '';
        const fieldIndex = index + 1;
        const fieldText = spacing + requiredString + resolvedType + space + name + equal + fieldIndex + semicolon;
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
    const stringedComments = entity.comments !== ''
        ? entity.comments + '\n'
        : '';

    const entityText = stringedComments
        + `message ${entity.name} {\n`
        + stringedFields
        + '\n}';

    return entityText;
}

const generateProtobuf = (
    filename: string | undefined,
    parsed: DatasignEntity[],
    options: DatasignCompilerOptions,
) => {
    const generatedMessage = constructGeneratedNotice(filename, 'protobuf');
    const syntaxProtobuf = 'syntax = "proto3";\n\n';

    const protobufText = options.generatedNotice
        ? [generatedMessage, syntaxProtobuf,]
        : [syntaxProtobuf];

    for (const entity of parsed) {
        const entityText = generateProtobufEntity(entity, options);
        protobufText.push(entityText);
    }

    return formatCode(protobufText);
}
// #endregion module



// #region exports
export default generateProtobuf;
// #endregion exports
