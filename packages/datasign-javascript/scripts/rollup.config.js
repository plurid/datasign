// #region imports
    // #region libraries
    import commonjs from '@rollup/plugin-commonjs';
    import sourceMaps from 'rollup-plugin-sourcemaps';
    import typescript from 'rollup-plugin-typescript2';
    // #endregion libraries
// #endregion imports



// #region module
const datasign = {
    input: `source/index.ts`,
    output: [
        {
            file: './distribution/index.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
        },
        {
            file: './distribution/index.es.js',
            format: 'es',
            sourcemap: true,
            exports: 'named',
        },
    ],
    external: [
        'fs',
        'path',
        'commander',
    ],
    watch: {
        include: 'source/**',
    },
    plugins: [
        commonjs(),
        sourceMaps(),
        typescript({
            file: '../tsconfig.json',
            useTsconfigDeclarationDir: true,
        }),
    ],
};
// #endregion module



// #region exports
export default datasign;
// #endregion exports
