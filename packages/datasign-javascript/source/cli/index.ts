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
        DATASIGN_CLI_VERSION,
    } from '#data/constants';

    import {
        processOptions,
    } from '#services/logic';
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
            '-m, --merge [name]',
            'merge the output into a single file',
            undefined,
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
            const data = processOptions(
                options,
            );

            await compileCommand(
                files,
                data,
            );
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
