import {
    DatasignCompilerOptions,
} from '../../data/interfaces';



class DatasignCompiler {
    private text: string;
    private targets: string[];

    constructor({
        text,
        targets
    }: DatasignCompilerOptions) {
        this.text = text;
        this.targets = targets;
    }

    compile() {
        return this.text;
    }
}


export default DatasignCompiler;
