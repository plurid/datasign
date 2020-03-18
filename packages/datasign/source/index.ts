import program, {
    CommanderStatic,
} from 'commander';



async function main(
    program: CommanderStatic,
) {
    program
        .name('datasign')
        .usage('<command>')
        .version('0.1.0', '-v, --version');


    program.parseAsync(process.argv);
}


main(program);
