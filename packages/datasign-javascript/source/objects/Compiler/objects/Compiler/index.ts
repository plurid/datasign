// #region imports
    // #region external
    import {
        DatasignCompilerData,
        DatasignCompilerOptions,
        DatasignCompileResult,
        Target,
    } from '#Compiler/data/interfaces';

    import {
        targets,
    } from '#Compiler/data/constants';

    import {
        resolveCompilerOptions,

        parseSource,

        generateGraphql,
        generateProtobuf,
        generateTypescript,
    } from '#Compiler/services/logic';
    // #endregion external
// #endregion imports



// #region module
class DatasignCompiler {
    private source: string;
    private targets: Target[];
    private filename: string | undefined;
    private options: DatasignCompilerOptions;

    constructor(
        data: DatasignCompilerData,
    ) {
        const {
            filename,
            source,
            targets,
            options,
        } = data;

        this.filename = filename;
        this.source = source;
        this.targets = targets;
        this.options = resolveCompilerOptions(options);
    }

    compile(): DatasignCompileResult {
        const parsedSource = parseSource(this.source, this.options);

        const graphql = this.targets.includes(targets.graphql)
            ? generateGraphql(this.filename, parsedSource, this.options)
            : '';
        const protobuf = this.targets.includes(targets.protobuf)
            ? generateProtobuf(this.filename, parsedSource, this.options)
            : '';
        const typescript = this.targets.includes(targets.typescript)
            ? generateTypescript(this.filename, parsedSource, this.options)
            : '';

        return {
            source: this.source,
            graphql,
            protobuf,
            typescript,
        };
    }
}
// #endregion module



// #region exports
export default DatasignCompiler;
// #endregion exports
