// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        DATASIGN_FILENAME_EXTENSION,
    } from '#data/constants';
    // #endregion external
// #endregion imports



// #region module
const mapToObject = <K, V>(
    map: Map<K, V>,
) => {
    let obj: any = {};

    for (let [k,v] of map) {
        obj[k] = v;
    }

    return obj;
}


const isURL = (
    path: string,
) => {
    return path.startsWith('http');
}


const solveExtensionName = (
    extname: string,
) => {
    if (extname === DATASIGN_FILENAME_EXTENSION) {
        return {
            filetype: DATASIGN_FILENAME_EXTENSION,
            concatenate: false,
        };
    }

    return {
        filetype: DATASIGN_FILENAME_EXTENSION,
        concatenate: true,
    };
}


const removeEndDoubleNewline = (
    value: string,
) => {
    return value.slice(
        0,
        value.length - 1,
    );
}


const resolveAbsolutePath = (
    value: string,
) => {
    const absolutePath = path.isAbsolute(value);
    const filepath = absolutePath
        ? value
        : path.join(
            process.cwd(),
            value,
        );

    return filepath;
}
// #endregion module



// #region exports
export {
    mapToObject,
    isURL,
    solveExtensionName,
    removeEndDoubleNewline,
    resolveAbsolutePath,
};
// #endregion exports
