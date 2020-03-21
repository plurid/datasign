import program, {
    CommanderStatic,
} from 'commander';

import DatasignCompiler, {
    DatasignLoader,
} from '@plurid/datasign-compiler';

import {
    compileCommand,
} from './commands';

import {
    CompileData,
} from './data/interfaces';

import {
    separateList,
} from './services/utilities';



const main = async (
    program: CommanderStatic,
) => {
    program
        .name('datasign')
        .usage('<files>')
        .version('0.1.0', '-v, --version')
        .action(async (_, files) => {
            if (!files) {
                program.outputHelp();
                return;
            }

            const {
                target,
                output,
                resolve,
            } = program;
            const targets = separateList(target);

            const data: CompileData = {
                files,
                targets,
                output,
                resolve,
            };
            await compileCommand(data);
        });

    program
        .option(
            '-t, --target <type>',
            'compilation targets: typescript, graphql, protobuf',
            'typescript,graphql,protobuf',
        ).option(
            '-o, --output <path>',
            'output path',
            '.',
        ).option(
            '-r, --resolve <type>',
            'resolve the output path relative to the "file" directory, "process" directory, or "flatten" into the output path',
            'file',
        );

    program.parseAsync(process.argv);
}

const cli = () => {
    main(program);
}


export {
    cli,
    DatasignCompiler,
    DatasignLoader,
}
