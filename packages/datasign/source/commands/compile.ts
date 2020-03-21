import {
    CompileData,
} from '../data/interfaces';



const compileCommand = async (
    data: CompileData,
) => {
    const {
        files,
        targets,
        output,
        resolve,
    } = data;

    console.log('files', files);
    console.log('targets', targets);
    console.log('output', output);
    console.log('resolve', resolve);
}


export default compileCommand;
