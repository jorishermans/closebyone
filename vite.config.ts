import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'globalThis'
  },
  plugins: [vue(), nodePolyfills()],
})
