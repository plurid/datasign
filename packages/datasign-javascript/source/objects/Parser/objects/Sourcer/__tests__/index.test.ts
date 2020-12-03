// #region imports
    // #region external
    import Sourcer from '..';
    // #endregion external
// #endregion imports



// #region module
describe('Sourcer', () => {
    it('collection', () => {
        const data = `
            One {
                two string
            }
        `;

        const sourcer = new Sourcer();
        const parsed = sourcer.parse(data);
    });
});
// #endregion module
