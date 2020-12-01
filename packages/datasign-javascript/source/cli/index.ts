// #region imports
    // #region libraries
    import program, {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries


    // #region external
    import {
        compileCommand,
    } from '#commands/index';

    import {
        CompileData,
    } from '#data/interfaces';

    import {
        DATASIGN_CLI_VERSION,
    } from '#data/constants';

    import {
        separateList,
        stringToBoolean,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const main = async (
    program: CommanderStatic,
) => {
    program
        .storeOptionsAsProperties(false)
        .passCommandToAction(false)
        .name('datasign')
        .usage('<files | directories...>')
        .version(DATASIGN_CLI_VERSION, '-v, --version');

    program
        .arguments('<files...>')
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
            true,
        ).option(
            '-s, --spacing <value>',
            'indentation spacing to be used in the compiled files',
            '4',
        ).option(
            '-p, --preserve [value]',
            'preserve new lines spacing of the datasign file',
            true,
        ).option(
            '-g, --generated [value]',
            'inject a header in each generated file mentioning the source',
            true,
        )
        .action(async (
            files: string[],
            options,
        ) => {
            const {
                target,
                output,
                resolve,
                comments,
                spacing,
                preserve,
                generated,
            } = options;
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


    program.parseAsync(process.argv);
}


const cli = () => {
    main(program);
}
// #endregion module



// #region exports
export default cli;
// #endregion exports
