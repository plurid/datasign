import path from 'path';
import {
    statSync,
    promises as fs,
} from 'fs';

import DatasignCompiler from '@plurid/datasign-compiler';

import {
    ProcessData,
} from '../../data/interfaces';



const writeFiles = async (
    contents: any,
    targets: any,
) => {

}

const handleFile = async (
    filepath: string,
    data: ProcessData,
) => {
    const {
        output,
        resolve,
        targets,
    } = data;

    console.log('filepath', filepath);
    console.log('targets', targets);
    console.log('output', output);
    console.log('resolve', resolve);

   // check if file is a .datasign file

   const source = await fs.readFile(filepath, 'utf-8');

   const compilerData = {
       source,
       targets,
       options: {
           comments: false,
       },
   };
   const compiler = new DatasignCompiler(compilerData);
   const contents = compiler.compile();

   await writeFiles(contents, targets);
}


const processFile = async (
    file: string,
    data: ProcessData,
) => {
    const extension = path.extname(file);

    if (extension !== '.datasign') {
        return;
    }

    console.log('extension', extension);

    const filepath = path.join(process.cwd(), file);
    const statistics = statSync(filepath);

    if (!statistics.isDirectory()) {
        await handleFile(filepath, data);
        return;
    }

    const files = await fs.readdir(filepath);

    for (const file of files) {
        await processFile(file, data);
    }
}


export default processFile;
