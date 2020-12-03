// #region imports
    // #region external
    import {
        ResolveFile,
        ResolveProcess,
        ResolveFlatten,
        Resolves,


        TargetTypescript,
        TargetGraphQL,
        TargetProtocolBuffers,
        Targets,

        TypeEntityAnnotation,
        TypeEntityComment,
        TypeFieldAnnotation,
        TypeDataStart,
        TypeDataEnd,
        TypeDataField,
        TypeEmptyLine,

        DatasignCompilerOptions,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const DATASIGN_CLI_VERSION = '0.0.0-0';

export const DATASIGN_FILENAME_EXTENSION = '.datasign';
export const DATASIGN_MEDIA_TYPE = 'application/datasign';



export const fetcherDefaultImportHeaders = {
    Accept: 'text/plain,application/json,' + DATASIGN_MEDIA_TYPE,
};


export const datasignParseOptions: any = {
    filebase: '',
    absolutePaths: {},
    authorization: {},
    allowFilesystem: true,
    allowNetwork: true,
};


export const resolveFile: ResolveFile = 'file';
export const resolveProcess: ResolveProcess = 'process';
export const resolveFlatten: ResolveFlatten = 'flatten';
export const resolves: Resolves = {
    file: resolveFile,
    process: resolveProcess,
    flatten: resolveFlatten,
};



export const targetTypescript: TargetTypescript = 'typescript';
export const targetGraphQL: TargetGraphQL = 'graphql';
export const targetProtocolBuffers: TargetProtocolBuffers = 'proto';

export const targets: Targets = {
    graphql: targetGraphQL,
    proto: targetProtocolBuffers,
    typescript: targetTypescript,
};


export const typeEntityAnnotation: TypeEntityAnnotation = 'ENTITY_ANNOTATION';
export const typeEntityComment: TypeEntityComment = 'ENTITY_COMMENT';
export const typeFieldAnnotation: TypeFieldAnnotation = 'FIELD_ANNOTATION';
export const typeDataStart: TypeDataStart = 'DATA_START';
export const typeDataEnd: TypeDataEnd = 'DATA_END';
export const typeDataField: TypeDataField = 'DATA_FIELD';
export const typeEmptyLine: TypeEmptyLine = 'EMPTY_LINE';

export const lineTypes = {
    entityAnnotation: typeEntityAnnotation,
    entityComment: typeEntityComment,
    fieldAnnotation: typeFieldAnnotation,
    dataStart: typeDataStart,
    dataEnd: typeDataEnd,
    dataField: typeDataField,
    emptyLine: typeEmptyLine,
};



export const ONE_NEW_LINE = '\n';
export const TWO_NEW_LINES = '\n\n';



export const defaultDatasignCompilerOptions: DatasignCompilerOptions = {
    comments: false,
    preserveSpacing: false,
    spacing: 4,
    generatedNotice: true,
};
// #endregion module
