import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'
import { copyFileSync, mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync, cpSync } from 'node:fs'

const rootDir = import.meta.dirname

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.json',
      outDir: 'dist',
      cleanVueFileName: true,
    }),
    {
      name: 'bundle-tokens-and-styles',
      closeBundle() {
        const distDir = resolve(rootDir, 'dist')
        const distTokensDir = resolve(distDir, 'tokens')
        if (!existsSync(distTokensDir)) {
          mkdirSync(distTokensDir, { recursive: true })
        }

        // Copy raw tokens.css to dist/tokens/tokens.css
        const srcTokensCss = resolve(rootDir, 'src/tokens/tokens.css')
        const distTokensCss = resolve(distTokensDir, 'tokens.css')
        copyFileSync(srcTokensCss, distTokensCss)

        // Find compiled component CSS (netuvio-ui.css or style.css)
        const files = readdirSync(distDir)
        const componentCssFile = files.find(f => f.endsWith('.css') && f !== 'styles.css' && f !== 'tokens.css')
        let componentCss = ''
        if (componentCssFile) {
          componentCss = readFileSync(resolve(distDir, componentCssFile), 'utf-8')
        }

        // Copy fonts directory to dist/fonts and dist/tokens/fonts if files exist
        const srcFontsDir = resolve(rootDir, 'src/tokens/fonts')
        const distFontsDir = resolve(distDir, 'fonts')
        const distTokensFontsDir = resolve(distTokensDir, 'fonts')
        if (existsSync(srcFontsDir)) {
          cpSync(srcFontsDir, distFontsDir, { recursive: true, force: true })
          cpSync(srcFontsDir, distTokensFontsDir, { recursive: true, force: true })
        }

        const tokensContent = readFileSync(srcTokensCss, 'utf-8')
        const combinedStyles = `/* Netuvio UI - Combined Tokens & Component Styles */\n${tokensContent}\n\n/* Component Styles */\n${componentCss}`
        writeFileSync(resolve(distDir, 'styles.css'), combinedStyles, 'utf-8')
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(rootDir, 'src'),
    },
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: {
        'vue/index': resolve(rootDir, 'src/vue/index.ts'),
        'tokens/index': resolve(rootDir, 'src/tokens/index.ts'),
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
