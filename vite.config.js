import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cv: resolve(__dirname, 'cv.html'),
        contact: resolve(__dirname, 'contact.html'),
        research: resolve(__dirname, 'research/index.html'),
        'research-maat': resolve(__dirname, 'research/maat.html'),
        'research-scopecam': resolve(__dirname, 'research/scopecam.html'),
        academic: resolve(__dirname, 'academic/index.html'),
        'academic-publications': resolve(__dirname, 'academic/publications.html'),
        // Legacy paths - to be removed after migration
        maat: resolve(__dirname, 'maat/index.html'),
        scopecam: resolve(__dirname, 'scopecam/index.html'),
      }
    }
  }
})