// #region imports
    // #region libraries
    import path from 'path';

    import {
        promises as fs,
    } from 'fs';
    // #endregion libraries


    // #region exports
    import {
        targets,
    } from '#Compiler/data/constants';

    import {
        Target,
        DatasignEntity,
        DatasignCompilerOptions,
    } from '#Compiler/data/interfaces';

    import {
        resolveCompilerOptions,

        parseSource,

        generateGraphql,
        generateProtobuf,
        generateTypescript,
    } from '#Compiler/services/logic';

    import {
        isDatasignText,
    } from '#Compiler/services/utilities';
    // #endregion exports
// #endregion imports



// #region module
class Loader {
    private source: string;
    private parsedSource: DatasignEntity[] = [];
    private options: DatasignCompilerOptions;

    constructor(
        source: string,
        options: Partial<DatasignCompilerOptions>
    ) {
        this.source = source;
        this.options = resolveCompilerOptions(options);
    }

    async load(
        target: Target,
    ) {
        if (!isDatasignText(this.source) && this.parsedSource === []) {
            try {
                const filepath = path.join(process.cwd(), this.source);
                const content = await fs.readFile(filepath, 'utf-8');
                this.source = content;
                this.parsedSource = parseSource(this.source, this.options);
            } catch (error) {
                console.log('File not found.');
            }
        }

        if (this.parsedSource === []) {
            this.parsedSource = parseSource(this.source, this.options);
        }

        switch (target) {
            case targets.graphql:
                return generateGraphql(undefined, this.parsedSource, this.options);
            case targets.protobuf:
                return generateProtobuf(undefined, this.parsedSource, this.options);
            case targets.typescript:
                return generateTypescript(undefined, this.parsedSource, this.options);
        }
    }
}
// #endregion module



// #region exports
export default Loader;
// #endregion exports
