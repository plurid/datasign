import {
    DatasignCompilerData,
    DatasignCompileResult,
    Target,
} from '../../data/interfaces';

import {
    targets,
} from '../../data/constants';



class DatasignCompiler {
    private source: string;
    private targets: Target[];

    constructor(
        data: DatasignCompilerData,
    ) {
        const {
            source,
            targets,
        } = data;

        this.source = source;
        this.targets = targets;
    }

    compile(): DatasignCompileResult {
        const typescript = this.targets.includes(targets.typescript)
            ? ''
            : '';
        const graphql = this.targets.includes(targets.graphql)
            ? ''
            : '';
        const protobuf = this.targets.includes(targets.protobuf)
            ? ''
            : '';

        return {
            source: this.source,
            typescript,
            graphql,
            protobuf,
        };
    }
}


export default DatasignCompiler;
