# Developer Guide

## Architecture Overview

This is a multi-page static site built with Vite 5.0.0. The architecture deliberately avoids modern framework complexity in favor of maintainable simplicity.

### Build System
- **Vite 5.0.0** - Chosen for fast dev server, ES modules support, and efficient production builds
- **Multi-page configuration** in `vite.config.js` defines three entry points:
  ```js
  input: {
    main: 'index.html',
    maat: 'maat/index.html',
    scopecam: 'scopecam/index.html',
  }
  ```
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
├── index.html          # Portfolio home
├── maat/
│   └── index.html      # MAAT project page
├── scopecam/
│   └── index.html      # ScopeCam project page
├── assets/
│   ├── styles.css      # All CSS in single file
│   └── *.png/svg       # Project icons/favicons
├── vite.config.js      # Build configuration
└── package.json        # Single dependency: vite
```

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

### Adding New Content

#### New Project Page
1. Create directory: `projectname/`
2. Copy existing project HTML structure
3. Add to `vite.config.js` input
4. Add project card to home page

#### Style Updates
Edit `assets/styles.css` - changes cascade to all pages. Follow existing patterns:
- Use existing CSS variables
- Maintain spacing grid
- Keep mobile breakpoint consistent

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