import path from 'path';
import {
    statSync,
    promises as fs,
} from 'fs';

import DatasignCompiler from '@plurid/datasign-compiler';



const handleFile = async (
    filepath: string,
) => {
    // console.log('filepath', filepath);
    // console.log('targets', targets);
    // console.log('output', output);
    // console.log('resolve', resolve);

   // check if file is a .datasign file
   const fileData = await fs.readFile(filepath, 'utf-8');

   const compilerData = {
       source: fileData,
       targets: [],
       options: {
           comments: false,
       },
   }

   const compiler = new DatasignCompiler(compilerData);

   const result = compiler.compile();

   // write files
}


const processFile = async (
    file: string,
    data: any,
) => {
    const filepath = path.join(__dirname, file);
    const statistics = statSync(filepath);

    if (!statistics.isDirectory()) {
        await handleFile(filepath);
    } else {
        // read files from dir
        // loop over files
    }
}


export default processFile;
