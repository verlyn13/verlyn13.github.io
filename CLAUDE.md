# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Dr. Jeffrey Johnson's research portfolio website - a static site showcasing research in autonomous systems and AI tool integration. The portfolio features two main projects: MAAT Framework (Mathematical Agent Architecture) and ScopeCam (Intelligent Screen Capture).

## Commands

```bash
npm install      # Install dependencies (only Vite)
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Build for production to dist/
npm run preview  # Preview production build locally
```

## Architecture

### Multi-Page Static Site
- Built with Vite 5.0.0 for fast development and optimized production builds
- Three HTML entry points configured in `vite.config.js`:
  - `/` - Main portfolio page
  - `/maat/` - MAAT project details
  - `/scopecam/` - ScopeCam project details

### Design System
- **Grid**: 8-point spacing system using CSS custom properties
- **Typography**: System fonts - serif (Georgia) for body, sans-serif for headings
- **Colors**: Academic restraint - Lapis blue (#4C70A0) accents, gold (#D4AF37) hover states
- **Layout**: 1200px max-width, 768px mobile breakpoint

### File Structure
```
index.html          # Portfolio home
maat/index.html     # MAAT project page
scopecam/index.html # ScopeCam project page
assets/styles.css   # Shared styles (all CSS in one file)
vite.config.js      # Multi-page build configuration
```

## Development Guidelines

### CSS Organization
- All styles in single `assets/styles.css` file
- CSS custom properties defined in `:root`
- Spacing uses `--space-*` variables (multiples of 8px)
- Colors use semantic naming (`--color-text`, `--color-accent`)

### HTML Structure
- Semantic HTML5 with proper heading hierarchy
- Consistent page structure: header → main → footer
- Project pages include `.back-nav` for portfolio return
- Accessibility: proper ARIA labels on external links

### Performance Principles
- No JavaScript unless absolutely necessary
- System fonts to avoid font loading
- Single CSS file for better caching
- Minimal external requests

## Common Tasks

### Add a New Project Page
1. Create new directory: `mkdir projectname`
2. Create `projectname/index.html` following existing project page structure
3. Update `vite.config.js` to add new entry point:
   ```js
   input: {
     // existing entries...
     projectname: resolve(__dirname, 'projectname/index.html'),
   }
   ```
4. Add project card to main `index.html`

### Deploy to GitHub Pages
The site auto-deploys via GitHub Actions on push to main branch. Manual deployment:
```bash
npm run build
# dist/ folder contains the built site
```

### Update Shared Styles
Edit `assets/styles.css` - changes affect all pages. Follow existing patterns:
- Use CSS custom properties for consistency
- Maintain 8-point grid spacing
- Keep responsive breakpoint at 768px

## Project Context

The portfolio emphasizes:
- **Academic credibility** over commercial appeal
- **Fast loading** and respect for visitor's time
- **Clean presentation** without unnecessary complexity
- **Research focus** - projects presented as explorations, not products

When making changes, maintain this philosophy of simplicity and respect.