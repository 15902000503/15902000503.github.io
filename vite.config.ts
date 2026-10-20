import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: '/15902000503.github.io',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})