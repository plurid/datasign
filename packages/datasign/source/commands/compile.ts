import path from 'path';

import {
    CompileData,
    ProcessData,
} from '../data/interfaces';

import {
    processFile,
    processTargets,
    processResolve,
} from '../services/logic';



const compileCommand = async (
    data: CompileData,
) => {
    const {
        files,
        targets,
        output,
        resolve,
        comments,
        spacing,
        preserve,
    } = data;

    const parsedSpacing = parseInt(spacing);
    const spacingValue = isNaN(parsedSpacing)
        ? 4
        : parsedSpacing;

    const processData: ProcessData = {
        targets: processTargets(targets),
        output: path.join(process.cwd(), output),
        resolve: processResolve(resolve),
        comments,
        spacing: spacingValue,
        preserve,
    };

    for (const file of files) {
        await processFile(file, processData);
    }
}


export default compileCommand;
