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
    } = data;

    const processData: ProcessData = {
        targets: processTargets(targets),
        output: path.join(__dirname, output),
        resolve: processResolve(resolve),
    };

    for (const file of files) {
        await processFile(file, processData);
    }
}


export default compileCommand;
