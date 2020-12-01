// #region imports
    // #region external
    import {
        processFile,
    } from '#services/logic';
    // #endregion external
// #endregion imports



// #region module
class Metacompiler {
    private files: string[];
    private data: any;

    constructor(
        files: string[],
        data: any,
    ) {
        this.files = files;
        this.data = data;
    }

    public async emit() {
        for (const file of this.files) {
            await processFile(file, this.data);
        }
    }
}
// #endregion module



// #region exports
export default Metacompiler;
// #endregion exports
