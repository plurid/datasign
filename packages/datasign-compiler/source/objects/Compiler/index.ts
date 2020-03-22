import {
    DatasignCompilerData,
    DatasignCompilerOptions,
    DatasignCompileResult,
    Target,
} from '../../data/interfaces';

import {
    targets,
    defaultDatasignCompilerOptions,
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
        this.options = this.resolveOptions(options);
    }

    resolveOptions(
        options: Partial<DatasignCompilerOptions> | undefined
    ) {
        if (!options) {
            return defaultDatasignCompilerOptions;
        }

        const commentsOptions = typeof options.comments === 'boolean'
            ? options.comments
            : false
        const preserveSpacingOptions = typeof options.preserveSpacing === 'boolean'
            ? options.preserveSpacing
            : false

        const compilerOptions: DatasignCompilerOptions = {
            comments: commentsOptions,
            preserveSpacing: preserveSpacingOptions,
        };
        return compilerOptions;
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
