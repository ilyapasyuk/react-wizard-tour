import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

const config = {
    input: './src/index.js',
    external: ['react', 'prop-types'],
    output: [
        {
            file: 'dist/wizard.esm.js',
            format: 'esm',
        },
        {
            file: 'dist/wizard.esm.min.js',
            format: 'esm',
            plugins: [terser()],
        },
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
    ],
}

export default config
