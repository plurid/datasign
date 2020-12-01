import {
    Resolve,
} from '../../data/interfaces';



const processResolve = (
    argResolve: string,
): Resolve => {
    switch (argResolve) {
        case 'file':
            return argResolve;
        case 'process':
            return argResolve;
        case 'flatten':
            return argResolve;
        default:
            return 'file';
    }
}


export default processResolve;
