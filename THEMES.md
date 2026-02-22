# Theme System

This site supports multiple visual themes. Switch between them by changing the stylesheet reference in HTML files.

## Available Themes

### jeffrey.css (Current Default)
**Personality:** Rigorous, practical, systems-minded, warm-but-not-squishy

**Colors:**
- Warm paper background with subtle gradient
- High contrast ink for readability
- Clear blue accent for important elements
- Secondary green "ship it" accent

**Features:**
- Friendly border radius (14px cards, 10px elements)
- Soft shadows for depth
- Pill-shaped buttons and badges
- Generous breathing room (deliberate pacing)
- 72ch measure for optimal reading

**Philosophy:** "Clear constraints beat clever hacks"

### styles-academic.css
**Personality:** Academic restraint, professional, clean

**Colors:**
- Pure white background
- Lapis blue accent (#4C70A0)
- Gold hover states (#D4AF37)
- Minimal border colors

**Features:**
- 8-point grid system
- System fonts for universal rendering
- Strict accessibility (44px touch targets)
- Mobile-first responsive design
- Print-optimized styles

**Philosophy:** Simple HTML + CSS, no JavaScript unless necessary

## Switching Themes

### Quick Switch (All Pages)
```bash
# Switch to jeffrey.css
find . -name "*.html" -not -path "./node_modules/*" -not -path "./dist/*" -exec sed -i '' 's/styles-academic\.css/jeffrey.css/g' {} \;

# Switch to academic theme
find . -name "*.html" -not -path "./node_modules/*" -not -path "./dist/*" -exec sed -i '' 's/jeffrey\.css/styles-academic.css/g' {} \;
```

### Manual Switch (Single Page)
In the HTML `<head>`, change:
```html
<!-- From -->
<link rel="stylesheet" href="/assets/jeffrey.css">

<!-- To -->
<link rel="stylesheet" href="/assets/styles-academic.css">
```

### After Switching
Always rebuild:
```bash
mise run build
# or
npm run build
```

## Creating a New Theme

1. Create new CSS file in `assets/`:
   ```bash
   cp assets/jeffrey.css assets/mytheme.css
   ```

2. Customize CSS variables in `:root`:
   ```css
   :root {
     --ink: your-text-color;
     --paper: your-background-color;
     --accent: your-accent-color;
     /* etc */
   }
   ```

3. Update HTML files to reference new theme:
   ```html
   <link rel="stylesheet" href="/assets/mytheme.css">
   ```

4. Test locally:
   ```bash
   mise run dev
   ```

## Theme Guidelines

**Keep it Simple:**
- Use semantic color names (--ink, --paper, --accent)
- Maintain accessibility (contrast ratios, touch targets)
- Mobile-first responsive approach
- Print styles for CV generation

**Maintain Consistency:**
- All themes should support the same HTML structure
- Use CSS variables for easy customization
- Keep class names semantic (.project-card, not .blue-box)

**Test Everything:**
- Homepage
- Project detail pages (/projects/dicee.html, etc.)
- Experience page
- Research page
- Mobile viewport (< 768px)
- Print layout

## Current Theme: jeffrey.css

The site currently uses **jeffrey.css** for its warm, practical aesthetic that balances academic rigor with approachable design.

To see the academic theme, run:
```bash
find . -name "*.html" -not -path "./node_modules/*" -not -path "./dist/*" -exec sed -i '' 's/jeffrey\.css/styles-academic.css/g' {} \; && mise run build
```
