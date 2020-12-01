// #region imports
    // #region external
    import {
        Resolve,
    } from '#data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const processResolve = (
    argResolve: string,
): Resolve => {
    switch (argResolve) {
        case 'file':
            return argResolve;
        case 'process':
            return argResolve;
        case 'flatten':
            return argResolve;
        default:
            return 'file';
    }
}
// #endregion module



// #region exports
export default processResolve;
// #endregion exports
