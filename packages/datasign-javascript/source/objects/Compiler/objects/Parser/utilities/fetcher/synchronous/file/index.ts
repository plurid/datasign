// #region imports
    // #region libraries
    import fs from 'fs';
    // #endregion libraries


    // #region external
    import {
        DatasignInterpreterOptions,
    } from '../../../../data/interfaces';

    import {
        resolveFetchFile,
    } from '../../logic';
    // #endregion external
// #endregion imports



// #region module
const fetchFromFile = (
    file: string,
    options: DatasignInterpreterOptions,
) => {
    const {
        filepath,
        filetype,
        filebase,
    } = resolveFetchFile(
        file,
        options,
    );

    const data = fs.readFileSync(
        filepath,
        'utf-8',
    );

    return {
        data,
        filetype,
        filebase,
    };
}
// #endregion module



// #region exports
export {
    fetchFromFile,
};
// #endregion exports
