# September 12 career content refresh

## Scope and plan

Publish the reconciled career sources through the existing site design and
GitHub Pages deployment. The operator requested the website update and
redeployment on September 12, 2026.

1. Update `index.html`, `cv.html`, `experience/index.html`, and
   `research/index.html` from the reviewed career facts and current narrative.
2. Refresh `public/content/resume.md`, `resume-ai-scanner.md`,
   `research-statement.md`, and `summary.md` for the same claims and dates.
3. Retain the six corrected case-study links to `/#work` and the relevant
   README correction. Regenerate `docs/content/` from authored HTML and update
   `public/sitemap.xml` only for changed public resources.
4. Review the release diff, run `mise run ci` and `content:diff`, check the
   rendered site at desktop and mobile widths, and verify print and downloads.
5. Publish through a signed PR, required checks, and the existing Pages
   workflow; verify the deployed content and record the result in the career
   source's status report.

The release is prepared in an isolated checkout to preserve existing local
work. Feed rendering changes, producer data, and local agent configuration
are outside this content release. Existing public URLs and the design system
are preserved. Scout status is based on the operator's September 12 report;
no new upstream review or CI result is implied.

## Print-layout follow-up

The first browser-generated print proof was eight Letter pages, with excessive
web spacing, a stranded introductory heading, and education split across pages.
Add print-only layout rules in `assets/jeffrey.css`: compact existing spacing
and type tokens, use ordinary block pagination, and keep headings with their
first content. Preserve screen styling, design tokens, and all resume content.
Regenerate and visually inspect the PDF before release.

## Validation

Completed before publication:

- `mise run ci`: provenance, Biome lint/format, design-system checks, token
  freshness, content integrity, all 50 tests, and the Vite production build pass.
- `pre-commit run --all-files`: applicable hygiene and workflow checks pass.
- `npm run content:diff`: no drift in any authored-page or region mirror.
- All 356 internal page links, fragments, and assets resolve across 17 built
  HTML pages; each page has one top-level heading.
- Browser review at measured 1200-pixel desktop and 390-pixel mobile widths:
  home, resume, research, and experience layouts reviewed; changed case-study
  pages have no horizontal overflow. Mobile navigation opens and reaches the
  resume. A case-study return link reaches the homepage's `#work` section.
- The resume copy control reports success. All four served Markdown resources
  match their source bytes. Clipboard read-back is unavailable through the
  browser tool and is not counted as independently verified clipboard content.
- Actual Chromium print output: six Letter pages, down from eight. Every page
  was rendered and visually reviewed; no clipping, blank pages, orphan headings,
  or lost content. Normalized text matches the original proof exactly.
- Independent factual review confirms the corrected appointments, degrees,
  teaching/coordination evidence, study factors, and contribution status.
- No dependency, build configuration, deployment workflow, or project-feed
  changes are included. Existing dependency updates remain a separate task.

## Publication

This revision uses the existing protected-main PR workflow and required checks.
The operator authorized merge and redeployment on September 12. The associated
GitHub Actions run and live site establish publication; local validation alone
is not a deployment receipt.
