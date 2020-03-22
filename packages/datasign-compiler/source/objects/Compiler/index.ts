import {
    DatasignCompilerData,
    DatasignCompilerOptions,
    DatasignCompileResult,
    Target,
} from '../../data/interfaces';

import {
    targets,
} from '../../data/constants';

import {
    resolveCompilerOptions,

    parseSource,

    generateGraphql,
    generateProtobuf,
    generateTypescript,
} from '../../services/logic';



class DatasignCompiler {
    private source: string;
    private targets: Target[];
    private options: DatasignCompilerOptions;

    constructor(
        data: DatasignCompilerData,
    ) {
        const {
            source,
            targets,
            options,
        } = data;

        this.source = source;
        this.targets = targets;
        this.options = resolveCompilerOptions(options);
    }

    compile(): DatasignCompileResult {
        const parsedSource = parseSource(this.source, this.options);

        const graphql = this.targets.includes(targets.graphql)
            ? generateGraphql(parsedSource, this.options)
            : '';
        const protobuf = this.targets.includes(targets.protobuf)
            ? generateProtobuf(parsedSource, this.options)
            : '';
        const typescript = this.targets.includes(targets.typescript)
            ? generateTypescript(parsedSource, this.options)
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
