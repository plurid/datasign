// #region imports
    // #region internal
    import Sourcer from '../objects/Sourcer';
    // #endregion internal
// #endregion imports



// #region module
const parseSource = (
    value: string,
) => {
    const sourcer = new Sourcer();
    const data = sourcer.parse(value);

    return data;
}
// #endregion module



// #region exports
export {
    parseSource,
};
// #endregion exports
