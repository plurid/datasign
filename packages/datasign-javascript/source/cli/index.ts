import program, {
    CommanderStatic,
} from 'commander';

import {
    compileCommand,
} from '../commands';

import {
    CompileData,
} from '../data/interfaces';

import {
    separateList,
    stringToBoolean,
} from '../services/utilities';



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
                comments,
                spacing,
                preserve,
                generated,
            } = program;
            const targets = separateList(target);

            const data: CompileData = {
                files,
                targets,
                output,
                resolve,
                comments,
                spacing,
                preserve: typeof preserve === 'string'
                    ? stringToBoolean(preserve)
                    : preserve,
                generated: typeof generated === 'string'
                    ? stringToBoolean(generated)
                    : generated,
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
        ).option(
            '-c, --comments [value]',
            'compile the comments into the target files',
            false,
        ).option(
            '-s, --spacing <value>',
            'indentation spacing to be used in the compiled files',
            '4',
        ).option(
            '-p, --preserve [value]',
            'preserve new lines spacing of the datasign file',
            false,
        ).option(
            '-g, --generated [value]',
            'inject a header in each generated file mentioning the source',
            true,
        );

    program.parseAsync(process.argv);
}


const cli = () => {
    main(program);
}


export default cli;
