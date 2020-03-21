import {
    lineTypes,
} from '../../../data/constants';

import {
    DatasignEntity,
    TypedLine,
} from '../../../data/interfaces';



const isComment = (
    line: string,
) => {
    return /^\s*?\/\//.test(line);
}


const isAnnotation = (
    line: string,
) => {
    return /^\s*?@/.test(line);
}


const isDatasignStart = (
    line: string,
) => {
    return /^\s*data \w+ {/.test(line);
}


const isDatasignEnd = (
    line: string,
) => {
    return /^\s*}/.test(line);
}

const removeInlineComment = (
    line: string,
) => {
    return line.replace(/\/\/.+$/, '');
}

const trimTrailingSpace = (
    line: string,
) => {
    return line.replace(/\s+$/g, '');
}

const trimLeadingSpace = (
    line: string,
) => {
    return line.replace(/^\s+/g, '');
}

const extractEntityName = (
    line: string,
) => {
    const nameRE = /^\s*data (\w+) {/;
    const match = line.match(nameRE);
    if (match) {
        return match[1];
    }
    return '';
}


const parseEntity = (
    unparsedEntity: TypedLine[],
) => {
    // const entity: DatasignEntity = {
    //     id: 'Item',
    //     name: 'Item',
    //     data: [
    //         {
    //             name: 'id',
    //             type: 'string',
    //             required: true,
    //         },
    //     ],
    // };
    const entity: DatasignEntity = {
        id: '',
        name: '',
        data: [],
    };
    const data = [];

    for (const line of unparsedEntity) {
        switch (line.type) {
            case 'ENTITY_ANNOTATION':
                break;
            case 'FIELD_ANNOTATION':
                break;
            case 'DATA_START':
                entity.name = extractEntityName(line.value);
                break;
            case 'DATA_END':
                break;
            case 'DATA_FIELD':
                break;
            case 'EMPTY_LINE':
                break;
        }
    }


    // console.log('unparsedEntity', unparsedEntity);



    // TODO
    // from such a data specificator
        // data Item {
        //     id: string;
        // }
    // generate the data entities
    // const entities: DatasignEntity[] = [
    //     {
    //         id: 'Item',
    //         name: 'Item',
    //         data: [
    //             {
    //                 name: 'id',
    //                 type: 'string',
    //                 required: true,
    //             },
    //         ],
    //     },
    // ];
    // console.log(source);
    // console.log(entities);

    return entity;
}


const parseEntities = (
    unparsedEntities: (TypedLine[])[],
) => {
    const entities: DatasignEntity[] = [];

    for (const unparsedEntity of unparsedEntities) {
        entities.push(parseEntity(unparsedEntity));
    }

    return entities;
}


const parseSource= (
    source: string,
) => {
    const lines = source.split('\n');

    const unparsedEntities = [];
    let addingToEntity = false;
    let unparsedEntity: TypedLine[] = [];

    for (let line of lines) {
        if (isComment(line)) {
            continue;
        }

        line = removeInlineComment(line);
        line = trimTrailingSpace(line);

        if (isAnnotation(line)) {
            const typedLine: TypedLine = {
                value: line,
                type: addingToEntity
                    ? lineTypes.fieldAnnotation
                    : lineTypes.entityAnnotation,
            };
            unparsedEntity.push(typedLine);
            continue;
        }

        if (isDatasignStart(line)) {
            addingToEntity = true;
            const typedLine: TypedLine = {
                value: line,
                type: lineTypes.dataStart,
            };
            unparsedEntity.push(typedLine);
            continue;
        }

        if (isDatasignEnd(line)) {
            const typedLine: TypedLine = {
                value: line,
                type: lineTypes.dataEnd,
            };
            unparsedEntity.push(typedLine);
            unparsedEntities.push(unparsedEntity);
            unparsedEntity = [];
            addingToEntity = false;
            continue;
        }

        if (addingToEntity) {
            const typedLine: TypedLine = {
                value: line,
                type: line !== ''
                    ? lineTypes.dataField
                    : lineTypes.emptyLine,
            };
            unparsedEntity.push(typedLine);
            continue;
        }
    }

    return parseEntities(unparsedEntities);
}


export default parseSource;
