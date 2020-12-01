// #region imports
    // #region external
    import {
        ResolveFile,
        ResolveProcess,
        ResolveFlatten,
        Resolves,
    } from '#data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const DATASIGN_CLI_VERSION = '0.0.0-0';

export const DATASIGN_FILENAME_EXTENSION = '.datasign';
export const DATASIGN_MEDIA_TYPE = 'application/datasign';


export const resolveFile: ResolveFile = 'file';
export const resolveProcess: ResolveProcess = 'process';
export const resolveFlatten: ResolveFlatten = 'flatten';
export const resolves: Resolves = {
    file: resolveFile,
    process: resolveProcess,
    flatten: resolveFlatten,
};
// #endregion module
