import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        maat: resolve(__dirname, 'maat/index.html'),
        scopecam: resolve(__dirname, 'scopecam/index.html'),
      }
    }
  }
})