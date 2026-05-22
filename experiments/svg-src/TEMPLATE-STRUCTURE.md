# Braid Timeline SVG Structure

Reference for required IDs and structure when editing in Inkscape.

## Layer Organization

```
Document
├── defs (filters, gradients)
│   └── #shadow (drop shadow filter)
│
├── Layer: hitareas
│   └── Group #era-hitareas
│       ├── rect #hitarea-wisconsin   data-era="wisconsin"
│       ├── rect #hitarea-duluth      data-era="duluth"
│       ├── rect #hitarea-california  data-era="california"
│       ├── rect #hitarea-peacecorps  data-era="peacecorps"
│       ├── rect #hitarea-montana     data-era="montana"
│       ├── rect #hitarea-cairo       data-era="cairo"
│       └── rect #hitarea-alaska      data-era="alaska"
│
├── Layer: strands
│   ├── Group #strand-analytical
│   │   └── path segments (class="strand strand-analytical")
│   ├── Group #strand-technical
│   │   └── path segments (class="strand strand-technical")
│   └── Group #strand-experiential
│       └── path segments (class="strand strand-experiential")
│
├── Layer: labels
│   └── Group #era-labels
│       ├── text #label-wisconsin     data-era="wisconsin"
│       └── ... (one per era)
│
├── Layer: markers
│   └── Group #year-markers
│       └── text elements for years
│
└── Layer: indicators
    └── circle #convergence-point
```

## Required Classes

### Strand Paths
```css
.strand                  /* Base styling */
.strand-analytical       /* Blue strand */
.strand-technical        /* Teal strand */
.strand-experiential     /* Orange strand */
.strand-under            /* Segment goes under at crossing */
```

### Interactive Elements
```css
.era-hitarea            /* Invisible click targets */
.era-hitarea.active     /* Currently selected era */
.era-label              /* Text labels */
.era-label.active       /* Currently selected */
```

## Required data-* Attributes

```html
data-era="wisconsin"    <!-- Links hitarea/label to JS data -->
```

Valid era values:
- `wisconsin`
- `duluth`
- `california`
- `peacecorps`
- `montana`
- `cairo`
- `alaska`

## Coordinate System

```
viewBox="0 0 1000 200"

Y positions for strands:
  top = 50
  mid = 80
  bot = 110

Era X boundaries (approximate):
  wisconsin:   20 - 155
  duluth:     155 - 270
  california: 270 - 400
  peacecorps: 400 - 490
  montana:    490 - 695
  cairo:      695 - 750
  alaska:     750 - 980
```

## CSS Custom Properties Used

The SVG expects these CSS variables to be defined:

```css
--accent      /* Analytical strand (blue) */
--accent-2    /* Technical strand (teal) */
--warn        /* Experiential strand (orange) */
--ink         /* Text, convergence indicator */
--muted       /* Year markers */
```

## Inkscape Tips

1. **Set IDs via Object Properties** (Ctrl+Shift+O)
2. **Use XML Editor** (Ctrl+Shift+X) to verify attributes
3. **Lock layers** you're not editing to prevent accidental changes
4. **Save as Inkscape SVG** to preserve layers and metadata
5. **Export as Plain SVG** or run `./build.sh` for production
