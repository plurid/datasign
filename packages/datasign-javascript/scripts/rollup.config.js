// #region imports
    // #region libraries
    import ttypescript from 'ttypescript';
    import commonjs from '@rollup/plugin-commonjs';
    import sourceMaps from 'rollup-plugin-sourcemaps';
    import typescript from 'rollup-plugin-typescript2';
    // #endregion libraries


    // #region external
    import pkg from '../package.json';
    // #endregion external
// #endregion imports



// #region module
const datasign = {
    input: `source/index.ts`,
    external: [
        'fs',
        'path',
        'util',
        'commander',
    ],
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
            exports: 'named',
        },
    ],
    watch: {
        include: 'source/**',
    },
    plugins: [
        commonjs(),
        sourceMaps(),
        typescript({
            file: '../tsconfig.json',
            typescript: ttypescript,
            useTsconfigDeclarationDir: true,
        }),
    ],
};
// #endregion module



// #region exports
export default datasign;
// #endregion exports
