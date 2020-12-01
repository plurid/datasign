// #region imports
    // #region external
    import {
        DatasignEntity,
        DatasignEntityData,
        DatasignCompilerOptions,
        DatasignAnnotation,
    } from '../../../data/interfaces';

    import {
        capitalize,
        formatCode,
        resolveSpacing,
        extractAnnotationsByType,
        constructGeneratedNotice,
    } from '../../utilities';
    // #endregion external
// #endregion imports



// #region module
export const resolveAnnotationTypedField = (
    annotation: DatasignAnnotation,
) => {
    if (annotation.value.split(' ').length === 1) {
        return annotation.value;
    }

    if (annotation.value.includes('type:')) {
        return annotation.value.replace('type: ', '');
    }

    return;
}


const resolveGraphqlFieldType = (
    type: string,
    annotations: DatasignAnnotation[],
) => {
    for (const annotation of annotations) {
        const type = resolveAnnotationTypedField(annotation);
        if (type) {
            return type;
        }
    }

    switch (type) {
        case 'number':
            return 'Int';
        default:
            return capitalize(type);
    }
}

const resolveGraphqlEntityType = (
    annotations: DatasignAnnotation[],
) => {
    for (const annotation of annotations) {
        const type = resolveAnnotationTypedField(annotation);
        if (type) {
            return type;
        }
    }

    return 'type';
}


const resolveGraphqlFieldAnnotations = (
    annotations: DatasignAnnotation[],
) => {
    let fieldAnnotation = '';

    for (const annotation of annotations) {
        if (annotation.value.includes('directive:')) {
            const directiveValue = annotation.value.replace('directive:', '').trim();

            const directiveNameRE = new RegExp(/^(\w+)/);
            const directiveNameMatch = directiveValue.match(directiveNameRE);
            if (!directiveNameMatch) {
                continue;
            }
            const directiveName = directiveNameMatch[1];

            const directiveArguments = directiveValue
                .replace(`${directiveName}: `, '');

            const directiveText = ` @${directiveName}(${directiveArguments})`;
            fieldAnnotation += directiveText;
        }
    }

    return fieldAnnotation;
}

const generateGraphqlFields = (
    data: DatasignEntityData[],
    options: DatasignCompilerOptions,
) => {
    const fields: string[] = [];

    const spacing = resolveSpacing(options.spacing);
    const separator = ': ';

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

        const requiredMark = required ? '!' : '';
        const fieldType = resolveGraphqlFieldType(type, field.annotations);
        const fieldAnnotation = resolveGraphqlFieldAnnotations(field.annotations);
        const fieldText = spacing + name + separator + fieldType + requiredMark + fieldAnnotation;
        fields.push(fieldText);
    }

    return fields;
}


const formatGraphqlComments = (
    comments: string,
) => {
    comments = comments.replace(/\/\//g, '#');
    comments = comments.replace(/\/\*\*/g, '#');
    comments = comments.replace(/\s\*/g, '#');
    comments = comments.replace(/\s\*\//g, '#');
    return comments;
}


const generateGraphqlEntity = (
    entity: DatasignEntity,
    options: DatasignCompilerOptions,
) => {
    const fields = generateGraphqlFields(entity.data, options);
    const stringedFields = fields.join('\n');
    const stringedComments = entity.comments !== ''
        ? entity.comments + '\n'
        : '';
    const formattedComments = formatGraphqlComments(stringedComments);
    const graphqlAnnotations = extractAnnotationsByType(entity.annotations, 'graphql');
    const graphqlEntityType = resolveGraphqlEntityType(graphqlAnnotations);

    const entityText = formattedComments
        + `${graphqlEntityType} ${entity.name} {\n`
        + stringedFields
        + '\n}';

    return entityText;
}

const generateGraphql = (
    filename: string | undefined,
    parsed: DatasignEntity[],
    options: DatasignCompilerOptions,
) => {
    const generatedMessage = constructGeneratedNotice(filename, 'graphql');

    const graphqlText = options.generatedNotice
        ? [generatedMessage]
        : [];

    for (const entity of parsed) {
        const entityText = generateGraphqlEntity(entity, options);
        graphqlText.push(entityText);
    }

    return formatCode(graphqlText);
}
// #endregion module



// #region exports
export default generateGraphql;
// #endregion exports
