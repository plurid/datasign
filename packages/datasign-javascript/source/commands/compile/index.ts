// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        CompileData,
        ProcessData,
    } from '#data/interfaces';

    import {
        processFile,
        processTargets,
        processResolve,
    } from '#services/logic';
    // #endregion external
// #endregion imports



// #region module
const compileCommand = async (
    data: CompileData,
) => {
    const {
        files,
        targets,
        output,
        resolve,
        merge,
        comments,
        spacing,
        preserve,
        generated,
    } = data;

    const parsedSpacing = parseInt(spacing);
    const spacingValue = isNaN(parsedSpacing)
        ? 4
        : parsedSpacing;

    const processData: ProcessData = {
        targets: processTargets(targets),
        output: path.join(process.cwd(), output),
        resolve: processResolve(resolve),
        merge,
        comments,
        spacing: spacingValue,
        preserve,
        generated,
    };

    for (const file of files) {
        await processFile(file, processData);
    }
}
// #endregion module



// #region exports
export default compileCommand;
// #endregion exports
