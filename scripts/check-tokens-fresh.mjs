// Conformance gate: the committed assets/tokens.generated.css must match a fresh build of the
// DTCG token sources. Rebuilds to a temp dir (non-mutating) and compares. Requires the
// style-dictionary devDependency, so this runs in `mise run ci` + the deploy "quality" job
// (which run `npm ci`), NOT in the Python-only pre-commit/hygiene runner.
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const committedPath = path.join(root, 'assets/tokens.generated.css')
const outDir = mkdtempSync(path.join(tmpdir(), 'tokens-'))

execFileSync('node', ['build-tokens.mjs'], {
  cwd: root,
  env: { ...process.env, TOKENS_OUTDIR: `${outDir}/` },
  stdio: ['ignore', 'ignore', 'inherit'],
})

const fresh = readFileSync(path.join(outDir, 'tokens.generated.css'), 'utf8')
const committed = readFileSync(committedPath, 'utf8')

if (fresh !== committed) {
  console.error(
    '✗ tokens-fresh: assets/tokens.generated.css is STALE. Run `npm run tokens` and commit.',
  )
  process.exitCode = 1
} else {
  console.log('✓ tokens-fresh: assets/tokens.generated.css matches the token sources')
}
