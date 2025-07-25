# Developer Guide

## Architecture Overview

This is a multi-page static portfolio built with Vite 5.0.0. The architecture deliberately avoids modern framework complexity in favor of maintainable simplicity.

### Build System
- **Vite 5.0.0** - Fast dev server, ES modules support, efficient production builds
- **Multi-page configuration** in `vite.config.js` with all entry points
- **No JavaScript runtime** - Pure static HTML/CSS output
- **GitHub Actions** auto-deploys to GitHub Pages on main branch commits

### Design System

#### Grid & Spacing
- 8-point grid system using CSS custom properties
- Spacing variables: `--space-xs` (4px) through `--space-2xl` (64px)
- Consistent use throughout for predictable layouts

#### Typography
- System font stack for zero-latency rendering:
  - Serif (Georgia) for body text - academic gravitas
  - Sans-serif system stack for headings - clean hierarchy
- Font sizes follow modular scale: 14px base, 1.25 ratio

#### Color Palette
- Minimal, academic restraint:
  - Lapis blue (#4C70A0) - primary accent
  - Gold (#D4AF37) - hover states
  - Dark gray (#333) - primary text
  - Pure white background

#### Layout
- 1200px max-width container
- Single breakpoint at 768px for mobile
- Flexbox for component layout, CSS Grid for project cards

### File Organization
```
/
├── index.html              # Professional hub
├── cv.html                 # Academic CV
├── contact.html            # Contact information
├── research/
│   ├── index.html          # Research overview
│   ├── maat.html           # MAAT project
│   └── scopecam.html       # ScopeCam project
├── academic/
│   ├── index.html          # Academic overview
│   └── publications.html   # Publications list
├── assets/
│   ├── styles.css          # All CSS in single file
│   └── icons/              # Project icons/favicons
├── maat/                   # Legacy (redirects to /research/maat.html)
├── scopecam/               # Legacy (redirects to /research/scopecam.html)
├── vite.config.js          # Multi-page build configuration
└── package.json            # Single dependency: vite
```

### CSS Architecture

The single `assets/styles.css` file is organized by section:
1. **Reset & Base** - Minimal reset, box-sizing
2. **Custom Properties** - All variables defined in :root
3. **Layout Components** - Container, navigation, footer
4. **Page-Specific Styles** - Home, Research, Academic, CV, Contact
5. **Utility Classes** - Project cards, buttons, links
6. **Responsive Overrides** - Single breakpoint at 768px

### Design Decisions

1. **No CSS framework** - Full control, minimal overhead, no unused styles
2. **Single CSS file** - Better caching, easier maintenance, follows cascade
3. **Semantic HTML5** - Proper document structure, built-in accessibility
4. **No JavaScript** - Static content doesn't need it, respects visitor's CPU
5. **System fonts** - No FOUT/FOIT, instant rendering, smaller payload
6. **CSS custom properties** - Consistent theming without preprocessor complexity

### Development Workflow

```bash
npm install         # Install vite
npm run dev         # Start dev server at localhost:5173
npm run build       # Build to dist/
npm run preview     # Test production build
```

### Navigation Structure

All pages include consistent navigation header:
```html
<nav class="site-nav">
    <a href="/">Jeffrey Johnson</a>
    <ul class="nav-links">
        <li><a href="/research/">Research</a></li>
        <li><a href="/academic/">Academic</a></li>
        <li><a href="/cv.html">CV</a></li>
        <li><a href="/contact.html">Contact</a></li>
    </ul>
</nav>
```

### Adding New Content

#### New Research Project
1. Create `research/projectname.html`
2. Add to `vite.config.js` input configuration
3. Add project card to `/research/index.html`
4. Use existing project pages as template

#### New Academic Section
1. Create `academic/section.html`
2. Add to `vite.config.js` input configuration
3. Add card to `/academic/index.html`
4. Follow publications.html structure

#### Style Updates
Edit `assets/styles.css` - changes affect all pages. Key patterns:
- Use CSS custom properties for spacing/colors
- Mobile breakpoint at 768px
- Grid layouts collapse to single column on mobile

### Performance Considerations
- HTML minification via Vite
- CSS minification in production
- No external fonts or CDN dependencies
- Images optimized manually before commit
- GitHub Pages gzip compression

### Deployment
Push to main branch triggers GitHub Actions:
1. Installs dependencies
2. Runs `npm run build`
3. Deploys `dist/` to GitHub Pages
4. Available at verlyn13.github.io

The entire philosophy: academic credibility through simplicity, not complexity.