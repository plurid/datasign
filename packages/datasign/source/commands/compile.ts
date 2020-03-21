import {
    CompileData,
} from '../data/interfaces';



const compileCommand = async (
    data: CompileData,
) => {
    const {
        files,
        target,
        output,
        resolve,
    } = data;

    console.log('files', files);
    console.log('target', target);
    console.log('output', output);
    console.log('resolve', resolve);
}


export default compileCommand;
