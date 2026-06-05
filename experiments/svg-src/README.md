# SVG Source Files

This folder contains **authoring source files** for SVGs used in the site. These are the design source of truth, edited in Inkscape or other vector tools.

## Workflow

```
┌─────────────────┐      build       ┌─────────────────┐
│  *.src.svg      │ ───────────────► │  ../filename.svg │
│  (Inkscape)     │                  │  (production)    │
└─────────────────┘                  └─────────────────┘
     ▲                                      │
     │ edit                                 │ use in HTML/CSS
     │                                      ▼
   Designer                              Browser
```

## File Naming

| File | Purpose |
|------|---------|
| `braid-timeline.src.svg` | Inkscape master - layers, guides, metadata preserved |
| `../braid-timeline.svg` | Production output - optimized, code-safe |

## Editing Guidelines

### In Inkscape

1. **Set stable IDs** for elements your code will target:
   - Select object → Object Properties (Ctrl+Shift+O)
   - Set ID and Label fields
   - Use kebab-case: `era-alaska`, `strand-analytical`, `crossover-marker-1`

2. **Use layers** for organization:
   - `strands` - the braid paths
   - `hitareas` - interactive regions
   - `labels` - text elements
   - `markers` - year markers, convergence point

3. **Save as Inkscape SVG** (.svg with Inkscape metadata)

### Building Production SVG

Option 1: Manual export
```bash
# In Inkscape: File → Export → Plain SVG
# Or: File → Save a Copy → Plain SVG
```

Option 2: SVGO optimization
```bash
# Install if needed
npm install -g svgo

# Build with ID preservation
svgo braid-timeline.src.svg -o ../braid-timeline.svg \
  --config svgo.config.js
```

## SVGO Configuration

The `svgo.config.js` file preserves IDs and classes needed for interactivity:

```js
// Preserves: IDs matching patterns, classes, data-* attributes
// Removes: Inkscape metadata, empty groups, comments
```

## Current Source Files

- `braid-timeline.src.svg` - The braided path timeline visualization

## Code Integration

The production SVG can be:
1. **Inlined** in HTML for full CSS/JS access
2. **Referenced** via `<img>` or CSS `background-image` (no interactivity)
3. **Loaded** via fetch and injected (maintains interactivity)

For the braid timeline, we inline it directly in `timeline-braid.html` for:
- CSS custom property access (`var(--accent)`)
- JavaScript event handling on paths/groups
- No additional HTTP request
