import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

const config = {
    input: 'src/index.js',
    external: ['react', 'prop-types'],
    output: [{ file: 'dist/wizard.min.js', format: 'cjs' }],
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        terser({
            include: [/^.+\.min\.js$/, '*esm*']
        }),
    ],
}

export default config
