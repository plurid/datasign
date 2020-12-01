import {
    ResolveFile,
    ResolveProcess,
    ResolveFlatten,
    Resolves,
} from '../interfaces';

export const DATASIGN_EXTENSION = '.datasign';


export const resolveFile: ResolveFile = 'file';
export const resolveProcess: ResolveProcess = 'process';
export const resolveFlatten: ResolveFlatten = 'flatten';
export const resolves: Resolves = {
    file: resolveFile,
    process: resolveProcess,
    flatten: resolveFlatten,
};
