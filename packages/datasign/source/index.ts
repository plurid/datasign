import program, {
    CommanderStatic,
} from 'commander';

import {
    compileCommand,
} from './commands';

import {
    CompileData,
} from './data/interfaces';

import {
    separateList,
} from './services/utilities';



async function main(
    program: CommanderStatic,
) {
    program
        .name('datasign')
        .usage('<files>')
        .version('0.1.0', '-v, --version')
        .action(async (_, files) => {
            if (!files) {
                program.outputHelp();
                return;
            }

            const target = separateList(program.target);
            const {
                output,
                resolve,
            } = program;

            const data: CompileData = {
                files,
                target,
                output,
                resolve,
            };
            await compileCommand(data);
        });

    program
        .option(
            '-t, --target <type>',
            'compilation targets: typescript, graphql, protobuf',
            'typescript,graphql,protobuf'
        ).option(
            '-o, --output <path>',
            'output path',
            '.',
        ).option(
            '-r, --resolve <type>',
            'resolve the output path relative to "file" directory, "process" directory, or "flatten" into the output path',
            'file',
        );

    program.parseAsync(process.argv);
}


main(program);
