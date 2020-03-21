import path from 'path';
import {
    statSync,
    promises as fs,
} from 'fs';

import DatasignCompiler, {
    DatasignCompileResult,
    Target,
} from '@plurid/datasign-compiler';

import {
    ProcessData,
    Resolve,
} from '../../data/interfaces';



const resolveFilename = (
    target: Target,
) => {
    switch (target) {
        case 'typescript':
            return 'file.ts';
        case 'graphql':
            return 'file.graphql';
        case 'protobuf':
            return 'file.proto';
    }
}


const writeFiles = async (
    contents: DatasignCompileResult,
    targets: Target[],
    outputPath: string,
) => {
    for (const target of targets) {
        const targetData = contents[target];

        if (targetData) {
            const filename = resolveFilename(target);
            const targetPath = path.join(outputPath, filename);
            await fs.writeFile(targetPath, targetData);
        }
    }

    // console.log(contents);
    // console.log(targets);
    // console.log(outputPath);
}

const resolveOutputPath = (
    filepath: string,
    output: string,
    resolve: Resolve,
) => {
    switch (resolve) {
        case 'file':
            {
                const relativePath = path.relative(process.cwd(), filepath);
                const relativeDirectory = path.dirname(relativePath);
                const outputPath = path.join(output, relativeDirectory);
                return outputPath;
            }
        case 'process':
            {
                const relativePath = path.relative(process.cwd(), filepath);
                const relativeDirectory = path.dirname(relativePath);
                const outputPath = path.join(output, relativeDirectory);
                return outputPath;
            }
        case 'flatten':
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
    } = data;

    // console.log('filepath', filepath);
    // console.log('targets', targets);
    // console.log('output', output);
    // console.log('resolve', resolve);

    const source = await fs.readFile(filepath, 'utf-8');
    const outputPath = resolveOutputPath(
        filepath,
        output,
        resolve,
    );

    const compilerData = {
        source,
        targets,
        options: {
            comments: false,
        },
    };
    const compiler = new DatasignCompiler(compilerData);
    const contents = compiler.compile();

    await writeFiles(
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

        if (extension !== '.datasign') {
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


export default processFile;
