import { terser } from "rollup-plugin-terser";
import babel from 'rollup-plugin-babel'

const config = {
    input: 'src/index.js',
    external: ['react'],
    output: [
        { file: 'lib.js', format: 'cjs' },
        { file: 'lib.min.js', format: 'cjs' },
        { file: 'lib.esm.js', format: 'es' },
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        terser({
            include: [/^.+\.min\.js$/, '*esm*'],
            exclude: [ 'some*' ]
        })
    ],
}

export default config
