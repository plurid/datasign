// #region imports
    // #region internal
    import DatasignParser from '../objects/DatasignParser';
    // #endregion internal
// #endregion imports



// #region module
const parseSource = (
    value: string,
) => {
    const locator = new DatasignParser();
    const data = locator.parse(value);

    return data;
}
// #endregion module



// #region exports
export {
    parseSource,
};
// #endregion exports
