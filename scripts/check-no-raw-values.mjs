// Conformance gate (design-system §7.1): component-layer stylesheets must reference design
// tokens, never raw color literals. The token layer (tokens/*.tokens.json) and the generated
// artifact (assets/tokens.generated.css) are the source of values and are exempt.
// Pure Node built-ins only (no node_modules) so it can run as a pre-commit hook.
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const targets = ['assets/jeffrey.css']
const htmlTargets = [
  ...readdirSync(root)
    .filter((name) => name.endsWith('.html'))
    .map((name) => name),
  ...['experience', 'projects', 'research'].flatMap((directory) =>
    readdirSync(path.join(root, directory))
      .filter((name) => name.endsWith('.html'))
      .map((name) => path.join(directory, name)),
  ),
]

// Raw color literals: functional hsl()/hsla()/rgb()/rgba() and 3/4/6/8-digit hex colors.
const fnColor = /\b(?:hsla?|rgba?)\s*\(/
const hexColor = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/

const errors = []
for (const rel of targets) {
  const raw = readFileSync(path.join(root, rel), 'utf8')
  const original = raw.split('\n')
  // Blank out /* ... */ comments (keep newlines) so values inside comments aren't flagged.
  const scanned = raw.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' ')).split('\n')
  scanned.forEach((line, i) => {
    const hit = line.match(fnColor) || line.match(hexColor)
    if (hit) errors.push(`${rel}:${i + 1}: raw color "${hit[0]}" — ${original[i].trim()}`)
  })
}

for (const rel of htmlTargets) {
  const lines = readFileSync(path.join(root, rel), 'utf8').split('\n')
  lines.forEach((line, index) => {
    if (/<style\b/i.test(line)) errors.push(`${rel}:${index + 1}: page-local <style> block`)
    if (/\sstyle\s*=/i.test(line)) errors.push(`${rel}:${index + 1}: inline style attribute`)
  })
}

if (errors.length > 0) {
  console.error(
    '✗ no-raw-values: use a semantic token (tokens/semantic.tokens.json), not a literal:',
  )
  for (const e of errors) console.error(`  ${e}`)
  process.exitCode = 1
} else {
  console.log(
    `✓ no-raw-values: ${targets.join(', ')} use design tokens; authored HTML has no local styles`,
  )
}
