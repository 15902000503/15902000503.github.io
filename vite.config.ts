import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createProxy } from './src/utils/proxy.ts'

export default defineConfig(async () => {
  const env = await loadEnv('development', process.cwd())
  const viteProxyList = env.VITE_PROXY ? JSON.parse(env.VITE_PROXY) : []
  return {
    plugins: [vue(), vueJsx(), vueDevTools(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    vite: {
      server: {
        open: true,
        proxy: createProxy(viteProxyList),
      },
    },
  }
})
