import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'

export default {
    input: './src/Wizard/index.tsx',
    output: [
        {
            file: 'dist/wizard.esm.js',
            format: 'esm',
            plugins: [typescript()],
        },
        {
            file: 'dist/wizard.esm.min.js',
            format: 'esm',
            plugins: [typescript()],
        },
    ],
    external: ['react'],
    plugins: [
        typescript(),
        copy({
            targets: [{ src: 'src/index.d.ts', dest: 'dist' }],
        }),
    ],
}
