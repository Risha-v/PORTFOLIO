import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// ⚠️ MUST match GitHub repository name exactly (case-sensitive)
const repoName = 'PORTFOLIO'

export default defineConfig({
  base: `/${repoName}/`,

  plugins: [react()],

  resolve: {
    alias: {
      '@api': resolve(__dirname, 'src/api'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@app-types': resolve(__dirname, 'src/types'),
      '@styles': resolve(__dirname, 'src/styles')
    }
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,   // 🔥 force clean build (important)
    sourcemap: false     // GitHub Pages does not need sourcemaps
  }
})
