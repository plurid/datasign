// #region imports
    // #region external
    import {
        DatasignCompilerOptions,
    } from '~data/interfaces';

    import {
        defaultDatasignCompilerOptions,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
const resolveCompilerOptions = (
    options: Partial<DatasignCompilerOptions> | undefined
) => {
    if (!options) {
        return defaultDatasignCompilerOptions;
    }

    const commentsOptions = typeof options.comments === 'boolean'
        ? options.comments
        : false
    const preserveSpacingOptions = typeof options.preserveSpacing === 'boolean'
        ? options.preserveSpacing
        : false
    const spacing = options.spacing || 4;
    const generatedNoticeOptions = typeof options.generatedNotice === 'boolean'
        ? options.generatedNotice
        : true;

    const compilerOptions: DatasignCompilerOptions = {
        comments: commentsOptions,
        preserveSpacing: preserveSpacingOptions,
        spacing,
        generatedNotice: generatedNoticeOptions,
    };
    return compilerOptions;
}
// #endregion module



// #region exports
export default resolveCompilerOptions;
// #endregion exports
