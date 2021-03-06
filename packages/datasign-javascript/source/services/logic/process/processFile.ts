// #region imports
    // #region libraries
    import path from 'path';

    import {
        statSync,
        promises as fs,
    } from 'fs';
    // #endregion libraries


    // #region external
    import {
        DatasignCompilerData,
        DatasignCompileResult,
        Target,
    } from '~data/interfaces';

    import {
        targets,
    } from '~data/constants';

    import DatasignCompiler from '~objects/Compiler';

    import {
        DATASIGN_FILENAME_EXTENSION,
        resolves,
    } from '~data/constants';

    import {
        ProcessData,
        Resolve,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const resolveFilename = (
    name: string,
    target: Target,
) => {
    let extension = '';
    switch (target) {
        case targets.typescript:
            extension = '.ts';
            break;
        case targets.graphql:
            extension = '.graphql';
            break;
        case targets.proto:
            extension = '.proto';
            break;
    }
    return name + extension;
}


const writeFiles = async (
    name: string,
    contents: DatasignCompileResult,
    targets: Target[],
    outputPath: string,
) => {
    for (const target of targets) {
        const targetData = contents[target];

        if (targetData) {
            const filename = resolveFilename(name, target);
            const targetPath = path.join(outputPath, filename);
            await fs.writeFile(targetPath, targetData);
        }
    }
}


const resolveOutputPath = (
    filepath: string,
    output: string,
    resolve: Resolve,
) => {
    switch (resolve) {
        case resolves.file:
            {
                const relativePath = path.relative(process.cwd(), filepath);
                const relativeDirectory = path.dirname(relativePath);
                const outputPath = path.join(output, relativeDirectory);
                return outputPath;
            }
        case resolves.process:
            {
                const relativePath = path.relative(process.cwd(), filepath);
                const relativeDirectory = path.dirname(relativePath);
                const outputPath = path.join(output, relativeDirectory);
                return outputPath;
            }
        case resolves.flatten:
            {
                const outputPath = output;
                return outputPath;
            }
    }
}


const handleFile = async (
    filepath: string,
    data: ProcessData,
) => {
    const {
        output,
        resolve,
        targets,
        comments,
        spacing,
        preserve,
        generated,
    } = data;

    const filename = path.basename(filepath, DATASIGN_FILENAME_EXTENSION);

    const source = await fs.readFile(filepath, 'utf-8');
    const outputPath = resolveOutputPath(
        filepath,
        output,
        resolve,
    );

    const compilerData: DatasignCompilerData = {
        source,
        targets,
        filename,
        options: {
            comments,
            spacing,
            preserveSpacing: preserve,
            generatedNotice: generated,
        },
    };
    const compiler = new DatasignCompiler(compilerData);
    const contents = compiler.compile();

    await writeFiles(
        filename,
        contents,
        targets,
        outputPath,
    );
}


const processFile = async (
    file: string,
    data: ProcessData,
) => {
    const filepath = path.isAbsolute(file)
        ? file
        : path.join(process.cwd(), file);
    const statistics = statSync(filepath);

    if (!statistics.isDirectory()) {
        const extension = path.extname(file);

        if (extension !== DATASIGN_FILENAME_EXTENSION) {
            return;
        }

        await handleFile(filepath, data);
        return;
    }

    const files = await fs.readdir(filepath);

    for (const file of files) {
        const subfilePath = path.join(filepath, file);
        await processFile(subfilePath, data);
    }
}
// #endregion module



// #region exports
export default processFile;
// #endregion exports
