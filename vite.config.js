import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { renderDesignStructure } from './scripts/design-structure.mjs'
import { buildViewModel } from './scripts/feed-model.mjs'

// Splice the per-project "Design structure" panel (S3) at `<!-- @design-structure: <id> -->`
// markers in detail pages — build-time + dev, no client JS, no source mutation. Absent-tolerant:
// renders nothing until the feed carries scope/decisions/activity (v1).
function designStructure() {
  const byId = new Map(buildViewModel().projects.map((e) => [e.id, e]))
  return {
    name: 'design-structure',
    transformIndexHtml(html) {
      return html.replace(/<!--\s*@design-structure:\s*([a-z0-9-]+)\s*-->/g, (_, id) =>
        renderDesignStructure(byId.get(id)),
      )
    },
  }
}

export default defineConfig({
  appType: 'mpa',
  plugins: [designStructure()],

  // Base URL for GitHub Pages
  base: '/',

  build: {
    // Output directory
    outDir: 'dist',

    // Generate sourcemaps for debugging
    sourcemap: false,

    // Optimize build
    minify: 'oxc',
    target: 'es2020',

    // Chunk size warnings
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        cv: resolve(import.meta.dirname, 'cv.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
        colophon: resolve(import.meta.dirname, 'colophon.html'),
        404: resolve(import.meta.dirname, '404.html'),

        // Projects
        'projects-index': resolve(import.meta.dirname, 'projects/index.html'),
        'projects-dicee': resolve(import.meta.dirname, 'projects/dicee.html'),
        'projects-maat': resolve(import.meta.dirname, 'projects/maat.html'),
        'projects-the-nash-group': resolve(import.meta.dirname, 'projects/the-nash-group.html'),
        'projects-host-capability-substrate': resolve(
          import.meta.dirname,
          'projects/host-capability-substrate.html',
        ),
        'projects-symmetry-groups': resolve(import.meta.dirname, 'projects/symmetry-groups.html'),
        'projects-scopecam': resolve(import.meta.dirname, 'projects/scopecam.html'),
        'projects-budget-triage': resolve(import.meta.dirname, 'projects/budget-triage.html'),
        'projects-flux': resolve(import.meta.dirname, 'projects/flux.html'),
        experience: resolve(import.meta.dirname, 'experience/index.html'),
        research: resolve(import.meta.dirname, 'research/index.html'),
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
