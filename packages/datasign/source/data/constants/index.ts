import {
    ResolveFile,
    ResolveProcess,
    ResolveFlatten,
    ResolveTypes,
} from '../interfaces';

export const DATASIGN_EXTENSION = '.datasign';


export const resolveFile: ResolveFile = 'file';
export const resolveProcess: ResolveProcess = 'process';
export const resolveFlatten: ResolveFlatten = 'flatten';
export const resolveTypes: ResolveTypes = {
    file: resolveFile,
    process: resolveProcess,
    flatten: resolveFlatten,
};
