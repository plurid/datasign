// #region imports
    // #region external
    import DatasignParser from '..';
    // #endregion external
// #endregion imports



// #region module
describe('DatasignParser', () => {
    it('collection', () => {
        const data = `
            One {
                two string
            }
        `;

        const datasignParser = new DatasignParser();
        const parsed = datasignParser.parse(data);
    });
});
// #endregion module
