import {
    DatasignEntity,
} from '../../../data/interfaces';



const parseSource= (
    source: string,
) => {
    // TODO
    // from such a data specificator
        // data Item {
        //     id: string;
        // }
    // generate the data entities
    const entities: DatasignEntity[] = [
        {
            id: 'Item',
            name: 'Item',
            data: [
                {
                    name: 'id',
                    type: 'string',
                    required: true,
                },
            ],
        },
    ];
    console.log(source);
    console.log(entities);

    return entities;
}


export default parseSource;
