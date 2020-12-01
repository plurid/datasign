// #region imports
    // #region internal
    import processOptions from './process/processOptions';
    import processFile from './process/processFile';
    import processTargets from './process/processTargets';
    import processResolve from './process/processResolve';


    import resolveCompilerOptions from './options';

    import parseSource from './source';

    import generateGraphql from './graphql';
    import generateProtobuf from './protobuf';
    import generateTypescript from './typescript';
    // #endregion internal
// #endregion imports



// #region exports
export {
    processOptions,
    processFile,
    processTargets,
    processResolve,


    resolveCompilerOptions,

    parseSource,

    generateGraphql,
    generateProtobuf,
    generateTypescript,
};
// #endregion exports
