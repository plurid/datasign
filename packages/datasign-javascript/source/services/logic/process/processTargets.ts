// #region imports
    // #region external
    import {
        Target,
    } from '#objects/Compiler';
    // #endregion external
// #endregion imports



// #region module
const processTargets = (
    argTargets: string[],
) => {
    const targets: Target[] = [];

    for (const argTarget of argTargets) {
        switch (argTarget) {
            case 'typescript':
                targets.push(argTarget);
                break;
            case 'graphql':
                targets.push(argTarget);
                break;
            case 'protobuf':
                targets.push(argTarget);
                break;
        }
    }

    return targets;
}
// #endregion module



// #region exports
export default processTargets;
// #endregion exports
