import StyleDictionary from 'style-dictionary'

// Emit only semantic-tier tokens; primitives stay internal (reference source only),
// which is the practical enforcement of "components never touch primitives".
StyleDictionary.registerFilter({
  name: 'semantic-only',
  filter: (token) => token.filePath.includes('semantic'),
})

// Flat var names: semantic tokens are top-level leaves, so the CSS var == the leaf name.
// Preserves the existing --ink, --accent, --space-1, ... names and avoids any group prefix.
StyleDictionary.registerTransform({
  name: 'name/leaf',
  type: 'name',
  transform: (token) => token.path[token.path.length - 1],
})

// Deterministic header (no timestamp) so the committed artifact is diff-stable for the freshness gate.
StyleDictionary.registerFileHeader({
  name: 'no-timestamp',
  fileHeader: () => [
    'DO NOT EDIT — generated from tokens/*.tokens.json by build-tokens.mjs (Style Dictionary).',
    'Run `npm run tokens` to regenerate. Edit the .tokens.json sources instead.',
  ],
})

const sd = new StyleDictionary({
  source: ['tokens/**/*.tokens.json'],
  platforms: {
    css: {
      // Name transform ONLY — no value/color transforms, so values pass through verbatim
      // (guarantees zero visual diff vs. the hand-authored :root block).
      transforms: ['name/leaf'],
      buildPath: process.env.TOKENS_OUTDIR || 'assets/',
      files: [
        {
          destination: 'tokens.generated.css',
          format: 'css/variables',
          filter: 'semantic-only',
          options: { outputReferences: false, fileHeader: 'no-timestamp' },
        },
      ],
    },
  },
})

await sd.buildAllPlatforms()
