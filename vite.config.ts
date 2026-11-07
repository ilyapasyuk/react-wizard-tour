import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

/** The library build; `vite build --mode demo` builds the demo site instead. */
const libraryBuild = {
  lib: {
    entry: 'src/Wizard/index.ts',
    formats: ['es' as const],
    fileName: 'index',
  },
  rollupOptions: {
    external: [/^react($|\/)/, /^react-dom($|\/)/, /^@floating-ui\//],
    output: { banner: "'use client';" },
  },
}

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: { port: 3000, open: true },
  // Relative base: the demo works on GitHub Pages under /react-wizard-tour/.
  base: mode === 'demo' ? './' : '/',
  build: mode === 'demo' ? { outDir: 'demo-dist' } : libraryBuild,
  test: {
    globals: true,
    coverage: { include: ['src/Wizard/**'], exclude: ['**/*.test.tsx', '**/types.ts'] },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['src/**/*.test.tsx'],
          exclude: ['src/**/*.browser.test.tsx'],
          setupFiles: ['src/test/setup.ts'],
        },
      },
      {
        // Layout needs a real engine: positioning is checked in Chromium.
        extends: true,
        test: {
          name: 'browser',
          include: ['src/**/*.browser.test.tsx'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium', viewport: { width: 1000, height: 700 } }],
          },
        },
      },
    ],
  },
}))
