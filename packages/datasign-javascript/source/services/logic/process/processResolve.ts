// #region imports
    // #region external
    import {
        Resolve,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const processResolve = (
    resolve: string,
): Resolve => {
    const value = resolve.toLowerCase();

    switch (value) {
        case 'file':
        case 'process':
        case 'flatten':
            return value;
        default:
            return 'file';
    }
}
// #endregion module



// #region exports
export default processResolve;
// #endregion exports
