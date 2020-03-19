import {
    DatasignCompilerData,
    DatasignCompileResult,
    DatasignEntity,
    Target,
} from '../../data/interfaces';

import {
    targets,
} from '../../data/constants';



class DatasignCompiler {
    private source: string;
    private targets: Target[];

    constructor(
        data: DatasignCompilerData,
    ) {
        const {
            source,
            targets,
        } = data;

        this.source = source;
        this.targets = targets;
    }

    parseSource() {
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
        console.log(this.source);
        console.log(entities);

        return entities;
    }

    generateTypescript(
        parsed: DatasignEntity[],
    ) {
        return '';
    }

    generateGraphql(
        parsed: DatasignEntity[],
    ) {
        return '';
    }

    generateProtobuf(
        parsed: DatasignEntity[],
    ) {
        return '';
    }

    compile(): DatasignCompileResult {
        const parsedSource = this.parseSource();

        const typescript = this.targets.includes(targets.typescript)
            ? this.generateTypescript(parsedSource)
            : '';
        const graphql = this.targets.includes(targets.graphql)
            ? this.generateGraphql(parsedSource)
            : '';
        const protobuf = this.targets.includes(targets.protobuf)
            ? this.generateProtobuf(parsedSource)
            : '';

        return {
            source: this.source,
            typescript,
            graphql,
            protobuf,
        };
    }
}


export default DatasignCompiler;
