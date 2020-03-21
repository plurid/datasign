import {
    DatasignEntity,
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


const parseEntity = (
    unparsedEntity: string[],
) => {
    const entity: DatasignEntity = {
        id: 'Item',
        name: 'Item',
        data: [
            {
                name: 'id',
                type: 'string',
                required: true,
            },
        ],
    };

    console.log('unparsedEntity', unparsedEntity);


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
    unparsedEntities: (string[])[],
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
    let unparsedEntity = [];

    for (const line of lines) {
        if (isComment(line)) {
            continue;
        }

        if (isAnnotation(line)) {
            addingToEntity = true;
            unparsedEntity.push(line);
            continue;
        }

        if (isDatasignStart(line)) {
            addingToEntity = true;
            unparsedEntity.push(line);
            continue;
        }

        if (isDatasignEnd(line)) {
            unparsedEntity.push(line);
            unparsedEntities.push(unparsedEntity);
            unparsedEntity = [];
            addingToEntity = false;
            continue;
        }

        if (addingToEntity) {
            unparsedEntity.push(line);
            continue;
        }
    }

    return parseEntities(unparsedEntities);
}


export default parseSource;
