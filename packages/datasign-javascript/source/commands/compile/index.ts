// #region imports
    // #region external
    import {
        ProcessData,
    } from '#data/interfaces';

    import {
        processFile,
    } from '#services/logic';
    // #endregion external
// #endregion imports



// #region module
const compileCommand = async (
    files: string[],
    data: ProcessData,
) => {
    for (const file of files) {
        await processFile(file, data);
    }
}
// #endregion module



// #region exports
export default compileCommand;
// #endregion exports
