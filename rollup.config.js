import typescript from '@rollup/plugin-typescript'

export default {
    input: './src/Wizard.tsx',
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
    plugins: [typescript()],
}
