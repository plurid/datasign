// #region imports
    // #region external
    import {
        ProcessData,
    } from '~data/interfaces';

    import {
        processFile,
    } from '~services/logic';
    // #endregion external
// #endregion imports



// #region module
class Metacompiler {
    private files: string[];
    private data: ProcessData;

    constructor(
        files: string[],
        data: ProcessData,
    ) {
        this.files = files;
        this.data = data;
    }

    public async emit() {
        if (this.data.merge) {
            // handle outputting into a single file
        }

        for (const file of this.files) {
            await processFile(
                file,
                this.data,
            );
        }
    }
}
// #endregion module



// #region exports
export default Metacompiler;
// #endregion exports
