/**
 * SVGO Configuration for Braid Timeline SVGs
 *
 * Optimizes SVGs while preserving elements needed for interactivity:
 * - IDs (for JS targeting and CSS selectors)
 * - Classes (for styling)
 * - data-* attributes (for JS data binding)
 *
 * Usage:
 *   svgo input.src.svg -o output.svg --config svgo.config.js
 */

module.exports = {
  multipass: true,

  // Output formatting
  js2svg: {
    indent: 2,
    pretty: true,
  },

  plugins: [
    // Keep defaults but configure specific plugins
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Preserve IDs - critical for interactivity
          cleanupIds: {
            preserve: [
              /^era-/,
              /^strand-/,
              /^crossover-/,
              /^label-/,
              /^hitarea-/,
              /^shadow/,
              /^gradient-/,
              /^filter-/,
              /^braid-/,
              /^convergence/,
              /^year-/,
              'braid-timeline-svg',
              'era-hitareas',
              'era-labels',
              'year-markers',
              'braid-strands',
            ],
            minify: false,
          },

          // Don't remove viewBox - needed for responsive scaling
          removeViewBox: false,

          // Keep title/desc for accessibility
          removeTitle: false,
          removeDesc: false,

          // Don't inline styles - we use CSS custom properties
          inlineStyles: false,

          // Don't merge paths - preserves our strand segments
          mergePaths: false,

          // Keep groups - needed for layer organization
          collapseGroups: false,
        },
      },
    },

    // Remove Inkscape-specific metadata
    {
      name: 'removeAttrs',
      params: {
        attrs: [
          'inkscape:*',
          'sodipodi:*',
          'xmlns:inkscape',
          'xmlns:sodipodi',
        ],
      },
    },

    // Remove editor metadata elements
    {
      name: 'removeMetadata',
    },

    // Remove XML comments
    {
      name: 'removeComments',
    },

    // Remove empty containers (but not groups with IDs)
    {
      name: 'removeEmptyContainers',
    },

    // Preserve data-* attributes for JS
    {
      name: 'removeUnknownsAndDefaults',
      params: {
        keepDataAttrs: true,
      },
    },

    // Sort attributes for consistent diffs
    {
      name: 'sortAttrs',
      params: {
        xmlnsOrder: 'alphabetical',
      },
    },
  ],
};
