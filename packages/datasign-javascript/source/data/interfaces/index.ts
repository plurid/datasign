// #region imports
    // #region external
    import {
        Target,
    } from '#objects/Compiler';
    // #endregion external
// #endregion imports



// #region module
export interface CompileData {
    files: string[];
    targets: string[];
    output: string;
    resolve: string;
    comments: boolean;
    spacing: string;
    preserve: boolean;
    generated: boolean;
}


export interface ProcessData {
    targets: Target[];
    output: string;
    resolve: Resolve;
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