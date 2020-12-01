// #region imports
    // #region external
    import {
        ProcessData,
    } from '#data/interfaces';

    import Metacompiler from '#objects/Compiler/objects/Metacompiler';
    // #endregion external
// #endregion imports



// #region module
const compileCommand = async (
    files: string[],
    data: ProcessData,
) => {
    const metacompiler = new Metacompiler(
        files,
        data,
    );
    await metacompiler.emit();
}
// #endregion module



// #region exports
export default compileCommand;
// #endregion exports
