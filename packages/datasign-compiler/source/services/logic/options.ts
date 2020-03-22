import {
    DatasignCompilerOptions,
} from '../../data/interfaces';

import {
    defaultDatasignCompilerOptions,
} from '../../data/constants';



const resolveCompilerOptions = (
    options: Partial<DatasignCompilerOptions> | undefined
) => {
    if (!options) {
        return defaultDatasignCompilerOptions;
    }

    const commentsOptions = typeof options.comments === 'boolean'
        ? options.comments
        : false
    const preserveSpacingOptions = typeof options.preserveSpacing === 'boolean'
        ? options.preserveSpacing
        : false
    const spacing = options.spacing || 4;

    const compilerOptions: DatasignCompilerOptions = {
        comments: commentsOptions,
        preserveSpacing: preserveSpacingOptions,
        spacing,
    };
    return compilerOptions;
}


export default resolveCompilerOptions;
