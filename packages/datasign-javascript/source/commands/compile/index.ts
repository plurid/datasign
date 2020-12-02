// #region imports
    // #region external
    import {
        ProcessData,
    } from '#data/interfaces';

    import Metacompiler from '#objects/Metacompiler';
    // #endregion external
// #endregion imports



// #region module
const compileCommand = async (
    files: string[],
    data: ProcessData,
) => {
    try {
        const metacompiler = new Metacompiler(
            files,
            data,
        );
        await metacompiler.emit();
    } catch (error) {
        console.log(`Datasign :: Something went wrong. Could not compile '${files.join(' ')}'.`);

        if (data.debug) {
            console.log(error);
        }

        return;
    }
}
// #endregion module



// #region exports
export default compileCommand;
// #endregion exports
