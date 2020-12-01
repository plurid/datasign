// #region imports
    // #region external
    import {
        Target,
    } from '#objects/Compiler';
    // #endregion external
// #endregion imports



// #region module
export interface ProcessData {
    targets: Target[];
    output: string;
    resolve: Resolve;
    merge: boolean | string | undefined;
    comments: boolean;
    spacing: number;
    preserve: boolean;
    generated: boolean;
}


export type ResolveFile = 'file';
export type ResolveProcess = 'process';
export type ResolveFlatten = 'flatten';
export type Resolve = ResolveFile | ResolveProcess | ResolveFlatten;
export interface Resolves {
    file: ResolveFile;
    process: ResolveProcess;
    flatten: ResolveFlatten;
}
// #endregion module
