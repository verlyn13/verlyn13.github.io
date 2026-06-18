// Accessibility gate (design-system §7): the .project-status pills must meet WCAG 2.1 AA
// contrast. The pills render at 0.75rem / 600 (≈12px bold) — below the 14pt-bold "large text"
// threshold — so they require >= 4.5:1, not the 3:1 large-text minimum.
//
// This checker is token-aware: it reads the .project-status.<variant> rules from jeffrey.css,
// resolves each rule's color/background var(--token) against the generated token values, and
// computes the contrast ratio. Because it resolves whatever tokens the rules point at, it stays
// correct after the contrast remediation repoints the pills at new ink tokens.
//
// Pure Node built-ins only (no node_modules) so it can run as a pre-commit hook / CI gate.
// Source finding: docs/status-pill-contrast-design-brief-2026-06-17.md (audit backlog #1).
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const COMPONENT_CSS = 'assets/jeffrey.css'
const TOKEN_CSS = 'assets/tokens.generated.css'
const AA_NORMAL = 4.5

// ---- color math (WCAG relative luminance) ----
function hslToRgb(h, s, l) {
  s /= 100
  l /= 100
  const k = (n) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))
  return [f(0), f(8), f(4)].map((x) => x * 255)
}
const linear = (c) => {
  c /= 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}
function luminance([r, g, b]) {
  const [R, G, B] = [r, g, b].map(linear)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}
function contrast(fg, bg) {
  const a = luminance(fg)
  const b = luminance(bg)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}
function parseHsl(value) {
  const m = value.match(/hsla?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)%\s*[, ]\s*([\d.]+)%/i)
  return m ? [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])] : null
}

// ---- token resolution ----
function collectVars(css, map) {
  for (const m of css.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) map.set(m[1], m[2].trim())
}
function resolve(name, map, seen = new Set()) {
  if (seen.has(name)) return null
  seen.add(name)
  const value = map.get(name)
  if (value == null) return null
  const ref = value.match(/^var\(\s*--([\w-]+)\s*(?:,[^)]*)?\)$/)
  return ref ? resolve(ref[1], map, seen) : value
}

const tokenMap = new Map()
collectVars(readFileSync(path.join(root, TOKEN_CSS), 'utf8'), tokenMap)
const componentCss = readFileSync(path.join(root, COMPONENT_CSS), 'utf8')
collectVars(componentCss, tokenMap) // allow component-local custom props to override

// ---- extract .project-status.<variant> color/background pairs ----
const rules = []
for (const match of componentCss.matchAll(/\.project-status\.([\w-]+)\s*\{([^}]*)\}/g)) {
  const [, variant, body] = match
  const fgTok = body.match(/(?:^|[\s;{])color\s*:\s*var\(\s*--([\w-]+)\s*\)/)
  const bgTok = body.match(/background(?:-color)?\s*:\s*var\(\s*--([\w-]+)\s*\)/)
  rules.push({ variant, fgTok: fgTok?.[1], bgTok: bgTok?.[1] })
}

if (rules.length === 0) {
  console.error(`✗ contrast: found no .project-status.<variant> rules in ${COMPONENT_CSS}`)
  process.exit(1)
}

const failures = []
const lines = []
for (const { variant, fgTok, bgTok } of rules) {
  if (!fgTok || !bgTok) {
    failures.push(`.${variant}: missing color/background token (color=${fgTok}, bg=${bgTok})`)
    continue
  }
  const fg = parseHsl(resolve(fgTok, tokenMap) ?? '')
  const bg = parseHsl(resolve(bgTok, tokenMap) ?? '')
  if (!fg || !bg) {
    failures.push(`.${variant}: could not resolve --${fgTok} / --${bgTok} to hsl()`)
    continue
  }
  const ratio = contrast(hslToRgb(...fg), hslToRgb(...bg))
  const pass = ratio >= AA_NORMAL
  if (!pass) failures.push(`.${variant}: --${fgTok} on --${bgTok} = ${ratio.toFixed(2)}:1`)
  lines.push(
    `  ${pass ? '✓' : '✗'} .${variant.padEnd(12)} --${fgTok} on --${bgTok}`.padEnd(48) +
      ` ${ratio.toFixed(2)}:1${pass ? '' : `  (need ${AA_NORMAL})`}`,
  )
}

for (const line of lines) console.log(line)
if (failures.length > 0) {
  console.error(
    `\n✗ contrast: ${failures.length} of ${rules.length} .project-status pills below WCAG AA (${AA_NORMAL}:1 for <14pt bold).`,
  )
  console.error(
    '  Fix per docs/status-pill-contrast-design-brief-2026-06-17.md (new pill ink tokens).',
  )
  process.exitCode = 1
} else {
  console.log(
    `\n✓ contrast: all ${rules.length} .project-status pills meet WCAG AA (>= ${AA_NORMAL}:1)`,
  )
}
