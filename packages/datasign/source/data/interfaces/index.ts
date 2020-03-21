import {
    Target,
} from '@plurid/datasign-compiler';



export interface CompileData {
    files: string[];
    targets: string[];
    output: string;
    resolve: string;
}


export interface ProcessData {
    targets: Target[];
    output: string;
    resolve: Resolve;
}


export type ResolveFile = 'file';
export type ResolveProcess = 'process';
export type ResolveFlatten = 'flatten';
export type Resolve = ResolveFile | ResolveProcess | ResolveFlatten;
