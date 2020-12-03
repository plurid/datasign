// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        ProcessData,
    } from '~data/interfaces';

    import {
        separateList,
        stringToBoolean,
    } from '~services/utilities';

    import processTargets from './processTargets';
    import processResolve from './processResolve';
    // #endregion external
// #endregion imports



// #region module
const processOptions = (
    options: any,
) => {
    const {
        target,
        output,
        resolve,
        merge,
        comments,
        spacing,
        preserve,
        generated,
        debug,
    } = options;

    const targets = processTargets(
        separateList(target)
    );
    const outputValue = path.join(
        process.cwd(),
        output,
    );
    const resolveValue = processResolve(resolve);
    const parsedSpacing = parseInt(spacing);
    const spacingValue = isNaN(parsedSpacing)
        ? 4
        : parsedSpacing;
    const preserveValue = typeof preserve === 'string'
        ? stringToBoolean(preserve)
        : preserve;
    const generatedValue = typeof generated === 'string'
        ? stringToBoolean(generated)
        : generated;

    const processData: ProcessData = {
        targets,
        output: outputValue,
        resolve: resolveValue,
        merge,
        comments,
        spacing: spacingValue,
        preserve: preserveValue,
        generated: generatedValue,
        debug,
    };

    return processData;
}
// #endregion module



// #region exports
export default processOptions;
// #endregion exports
