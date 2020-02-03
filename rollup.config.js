import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

const config = {
    input: 'src/index.js',
    external: ['react', 'prop-types'],
    output: [{ file: 'public/wizard.min.js', format: 'cjs' }],
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        terser({
            include: [/^.+\.min\.js$/, '*esm*'],
            exclude: ['some*'],
        }),
    ],
}

export default config
