// #region imports
    // #region external
    import {
        DatasignCompilerData,
        DatasignCompilerOptions,
        DatasignCompileResult,
        Target,
    } from '~data/interfaces';

    import {
        targets,
    } from '~data/constants';

    import {
        resolveCompilerOptions,

        parseSource,

        generateGraphql,
        generateProtobuf,
        generateTypescript,
    } from '~services/logic';
    // #endregion external
// #endregion imports



// #region module
class Compiler {
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
        const proto = this.targets.includes(targets.proto)
            ? generateProtobuf(this.filename, parsedSource, this.options)
            : '';
        const typescript = this.targets.includes(targets.typescript)
            ? generateTypescript(this.filename, parsedSource, this.options)
            : '';

        return {
            source: this.source,
            graphql,
            proto,
            typescript,
        };
    }
}
// #endregion module



// #region exports
export default Compiler;
// #endregion exports
