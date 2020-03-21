import {
    DatasignCompilerData,
    DatasignCompileResult,
    Target,
} from '../../data/interfaces';

import {
    targets,
} from '../../data/constants';

import {
    parseSource,

    generateGraphql,
    generateProtobuf,
    generateTypescript,
} from '../../services/logic';



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

    compile(): DatasignCompileResult {
        const parsedSource = parseSource(this.source);

        const graphql = this.targets.includes(targets.graphql)
            ? generateGraphql(parsedSource)
            : '';
        const protobuf = this.targets.includes(targets.protobuf)
            ? generateProtobuf(parsedSource)
            : '';
        const typescript = this.targets.includes(targets.typescript)
            ? generateTypescript(parsedSource)
            : '';

        return {
            source: this.source,
            graphql,
            protobuf,
            typescript,
        };
    }
}


export default DatasignCompiler;
