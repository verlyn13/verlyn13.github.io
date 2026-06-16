import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  appType: 'mpa',

  // Base URL for GitHub Pages
  base: '/',

  build: {
    // Output directory
    outDir: 'dist',

    // Generate sourcemaps for debugging
    sourcemap: false,

    // Optimize build
    minify: 'esbuild',
    target: 'es2020',

    // Chunk size warnings
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cv: resolve(__dirname, 'cv.html'),
        contact: resolve(__dirname, 'contact.html'),
        colophon: resolve(__dirname, 'colophon.html'),

        // Projects
        'projects-dicee': resolve(__dirname, 'projects/dicee.html'),
        'projects-maat': resolve(__dirname, 'projects/maat.html'),
        'projects-the-nash-group': resolve(__dirname, 'projects/the-nash-group.html'),
        'projects-host-capability-substrate': resolve(
          __dirname,
          'projects/host-capability-substrate.html',
        ),
        'projects-symmetry-groups': resolve(__dirname, 'projects/symmetry-groups.html'),
        'projects-scopecam': resolve(__dirname, 'projects/scopecam.html'),
        'projects-budget-triage': resolve(__dirname, 'projects/budget-triage.html'),
        'projects-flux': resolve(__dirname, 'projects/flux.html'),
        experience: resolve(__dirname, 'experience/index.html'),
        research: resolve(__dirname, 'research/index.html'),
      },
      output: {
        // Manual chunk splitting for better caching
        manualChunks: undefined,
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },

  // Preview server config
  preview: {
    port: 4173,
    strictPort: false,
    open: true,
  },

  // Dev server config
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
})
