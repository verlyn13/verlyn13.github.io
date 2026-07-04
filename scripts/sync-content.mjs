import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse, serialize } from 'parse5'

// Structured Markdown mirror — HTML -> Markdown extractor and sync tool.
// Contract: docs/markdown-mirror.md · Rationale: docs/adr/0010-structured-markdown-mirror.md
//
// PR-1 scope is pull-only: `pull` (HTML -> MD), `diff` (dry run), `check` (integrity gate).
// `push` (MD -> HTML) is fail-closed and stays disabled until PR-3 wires markers + the
// constrained renderer. HTML is authoritative; this tree is a committed sidecar mirror.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = path.join(root, 'docs', 'content')
const registryPath = path.join(contentDir, 'registry.yaml')

const NORMALIZER_VERSION = 1
const HEADINGS = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 }
const SKIP_TAGS = new Set(['nav', 'footer', 'script', 'style', 'template', 'svg', 'head'])
const INLINE_TAGS = new Set([
  'a',
  'b',
  'strong',
  'i',
  'em',
  'code',
  'span',
  'sub',
  'sup',
  'abbr',
  'small',
  'mark',
  'u',
  'time',
  'cite',
  'br',
])

// --- hashing --------------------------------------------------------------------
export function sha256(str) {
  return createHash('sha256').update(str, 'utf8').digest('hex')
}

// --- tree helpers ---------------------------------------------------------------
function getAttr(node, name) {
  return node.attrs?.find((a) => a.name === name)?.value
}

function findRegion(node, selector) {
  // v1 supports `main` (first <main>) and `#id` selectors.
  const byId = selector.startsWith('#') ? selector.slice(1) : null
  const stack = [node]
  while (stack.length > 0) {
    const current = stack.shift()
    for (const child of current.childNodes ?? []) {
      if (child.tagName) {
        if (byId ? getAttr(child, 'id') === byId : child.tagName === selector) return child
        stack.push(child)
      }
    }
  }
  return null
}

function collapse(str) {
  return str.replace(/\s+/g, ' ').trim()
}

// --- inline rendering (raw, collapsed once at the boundary) ---------------------
function inlineRaw(node) {
  let out = ''
  for (const child of node.childNodes ?? []) out += inlineNodeRaw(child)
  return out
}

function inlineNodeRaw(node) {
  if (node.nodeName === '#text') return node.value
  if (node.nodeName === '#comment') return ''
  const tag = node.tagName
  if (!tag) return ''
  const inner = inlineRaw(node)
  switch (tag) {
    case 'br':
      return ' '
    case 'strong':
    case 'b':
      return inner.trim() ? `**${inner.trim()}**` : ''
    case 'em':
    case 'i':
      return inner.trim() ? `*${inner.trim()}*` : ''
    case 'code':
      return inner.trim() ? `\`${inner.trim()}\`` : ''
    case 'a': {
      const href = getAttr(node, 'href')
      const text = inner.trim() || href || ''
      return href ? `[${text}](${href})` : text
    }
    default:
      return inner
  }
}

function renderInline(node) {
  return collapse(inlineRaw(node))
}

// --- block rendering ------------------------------------------------------------
function textContent(node) {
  let out = ''
  for (const child of node.childNodes ?? []) {
    if (child.nodeName === '#text') out += child.value
    else if (child.tagName) out += textContent(child)
  }
  return out
}

function renderList(node, ordered, depth) {
  const lines = []
  let index = 1
  for (const li of node.childNodes ?? []) {
    if (li.tagName !== 'li') continue
    const marker = ordered ? `${index}.` : '-'
    let inline = ''
    const nested = []
    for (const child of li.childNodes ?? []) {
      if (child.tagName === 'ul' || child.tagName === 'ol') nested.push(child)
      else inline += inlineNodeRaw(child)
    }
    const indent = '  '.repeat(depth)
    lines.push(`${indent}${marker} ${collapse(inline)}`)
    for (const list of nested) lines.push(renderList(list, list.tagName === 'ol', depth + 1))
    index += 1
  }
  return lines.join('\n')
}

function pushBlocks(node, blocks) {
  if (node.nodeName === '#comment') return
  if (node.nodeName === '#text') {
    const text = collapse(node.value)
    if (text) blocks.push(text)
    return
  }
  const tag = node.tagName
  if (!tag || SKIP_TAGS.has(tag)) return

  if (HEADINGS[tag]) {
    const text = renderInline(node)
    if (text) blocks.push(`${'#'.repeat(HEADINGS[tag])} ${text}`)
    return
  }
  if (tag === 'p') {
    const text = renderInline(node)
    if (text) blocks.push(text)
    return
  }
  if (tag === 'ul' || tag === 'ol') {
    const list = renderList(node, tag === 'ol', 0)
    if (list) blocks.push(list)
    return
  }
  if (tag === 'blockquote') {
    const inner = collectBlocks(node).join('\n\n')
    if (inner)
      blocks.push(
        inner
          .split('\n')
          .map((line) => (line ? `> ${line}` : '>'))
          .join('\n'),
      )
    return
  }
  if (tag === 'pre') {
    const code = textContent(node).replace(/\n+$/, '')
    if (code) blocks.push(`\`\`\`\n${code}\n\`\`\``)
    return
  }
  if (tag === 'hr') {
    blocks.push('---')
    return
  }
  if (tag === 'img') {
    const src = getAttr(node, 'src')
    if (src) blocks.push(`![${getAttr(node, 'alt') ?? ''}](${src})`)
    return
  }
  if (INLINE_TAGS.has(tag)) {
    const text = renderInline(node)
    if (text) blocks.push(text)
    return
  }
  // Structural container (div/section/article/header/main/...): unwrap and recurse.
  for (const child of node.childNodes ?? []) pushBlocks(child, blocks)
}

function collectBlocks(node) {
  const blocks = []
  for (const child of node.childNodes ?? []) pushBlocks(child, blocks)
  return blocks
}

function normalizeRegionHtml(region) {
  // Fingerprint of the source region: inner HTML with comments and insignificant
  // whitespace removed. Used to detect HTML change since the last pull.
  return serialize(region)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function htmlToMarkdown(html, selector = 'main') {
  const region = findRegion(parse(html), selector)
  if (!region) throw new Error(`selector "${selector}" not found`)
  const body = `${collectBlocks(region)
    .join('\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()}\n`
  return { body, htmlHash: sha256(normalizeRegionHtml(region)) }
}

// --- frontmatter ----------------------------------------------------------------
function buildFrontmatter(entry, contentHash, htmlHash) {
  return [
    '---',
    `id: ${entry.id}`,
    'type: page',
    `source_file: ${entry.source_file}`,
    `source_selector: ${entry.source_selector}`,
    `route: ${entry.route}`,
    `content_hash: ${contentHash}`,
    `html_hash: ${htmlHash}`,
    `normalizer_version: ${NORMALIZER_VERSION}`,
    'sync_direction: html_to_markdown',
    'protected_fields: [id, type, source_file, source_selector, normalizer_version]',
    '---',
    '',
  ].join('\n')
}

export function splitFrontmatter(text) {
  if (!text.startsWith('---\n')) return { frontmatter: '', body: text }
  const end = text.indexOf('\n---\n', 4)
  if (end === -1) return { frontmatter: '', body: text }
  const frontmatter = text.slice(4, end)
  const body = text.slice(end + 5).replace(/^\n/, '')
  return { frontmatter, body }
}

export function frontmatterField(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'))
  return match ? match[1].trim() : null
}

// --- mirror build ---------------------------------------------------------------
export function buildMirror(entry, html) {
  const { body, htmlHash } = htmlToMarkdown(html, entry.source_selector)
  const contentHash = sha256(body)
  const text = `${buildFrontmatter(entry, contentHash, htmlHash)}\n${body}`
  return { file: entry.file, text, body, contentHash, htmlHash }
}

// --- registry (constrained YAML subset) -----------------------------------------
function parseScalar(raw) {
  const value = raw.trim()
  if (value === '' || value === '[]') return value === '' ? '' : []
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean)
  }
  if (value === 'true') return true
  if (value === 'false') return false
  return value.replace(/^["']|["']$/g, '')
}

export function parseRegistry(text) {
  const pages = []
  let current = null
  for (const raw of text.split('\n')) {
    const line = raw.replace(/\s+$/, '')
    if (!line || line.trimStart().startsWith('#') || line === 'pages:') continue
    const item = line.match(/^\s*-\s+(\w+):\s*(.*)$/)
    if (item) {
      if (current) pages.push(current)
      current = { [item[1]]: parseScalar(item[2]) }
      continue
    }
    const kv = line.match(/^\s+(\w+):\s*(.*)$/)
    if (kv && current) current[kv[1]] = parseScalar(kv[2])
  }
  if (current) pages.push(current)
  return { pages }
}

export function emitRegistry(registry) {
  const lines = [
    '# docs/content/registry.yaml — sync map for the Markdown mirror.',
    '# See docs/markdown-mirror.md. Maintained by scripts/sync-content.mjs;',
    '# hand-edit only `mode` and `two_way_regions`.',
    'pages:',
  ]
  const pages = [...registry.pages].sort((a, b) => a.id.localeCompare(b.id))
  for (const page of pages) {
    const regions = page.two_way_regions?.length ? `[${page.two_way_regions.join(', ')}]` : '[]'
    lines.push(`  - id: ${page.id}`)
    lines.push(`    file: ${page.file}`)
    lines.push(`    source_file: ${page.source_file}`)
    lines.push(`    source_selector: ${page.source_selector}`)
    lines.push(`    route: ${page.route}`)
    lines.push(`    mode: ${page.mode}`)
    lines.push(`    two_way_regions: ${regions}`)
  }
  return `${lines.join('\n')}\n`
}

// --- commands -------------------------------------------------------------------
function loadRegistry() {
  if (!existsSync(registryPath)) {
    console.error(`registry not found at ${path.relative(root, registryPath)}`)
    process.exitCode = 1
    return null
  }
  return parseRegistry(readFileSync(registryPath, 'utf8'))
}

function readSource(entry) {
  const abs = path.join(root, entry.source_file)
  if (!existsSync(abs)) throw new Error(`source_file missing: ${entry.source_file}`)
  return readFileSync(abs, 'utf8')
}

function runPull(registry) {
  let written = 0
  for (const entry of [...registry.pages].sort((a, b) => a.id.localeCompare(b.id))) {
    const mirror = buildMirror(entry, readSource(entry))
    const abs = path.join(contentDir, mirror.file)
    const existing = existsSync(abs) ? readFileSync(abs, 'utf8') : null
    if (existing === mirror.text) {
      console.log(`  unchanged  ${mirror.file}`)
      continue
    }
    mkdirSync(path.dirname(abs), { recursive: true })
    writeFileSync(abs, mirror.text)
    console.log(`  ${existing ? 'updated' : 'created'}    ${mirror.file}`)
    written += 1
  }
  const normalized = emitRegistry(registry)
  if (readFileSync(registryPath, 'utf8') !== normalized) {
    writeFileSync(registryPath, normalized)
    console.log('  normalized registry.yaml')
    written += 1
  }
  console.log(written ? `pull: ${written} file(s) written` : 'pull: already in sync')
}

function runDiff(registry) {
  let drift = 0
  for (const entry of [...registry.pages].sort((a, b) => a.id.localeCompare(b.id))) {
    const mirror = buildMirror(entry, readSource(entry))
    const abs = path.join(contentDir, mirror.file)
    const existing = existsSync(abs) ? readFileSync(abs, 'utf8') : null
    if (existing == null) {
      console.log(`  new        ${mirror.file} (pull would create)`)
      drift += 1
    } else if (existing !== mirror.text) {
      console.log(`  drifted    ${mirror.file} (pull would update)`)
      drift += 1
    } else {
      console.log(`  in sync    ${mirror.file}`)
    }
  }
  console.log(drift ? `diff: ${drift} region(s) would change on pull` : 'diff: no drift')
}

function runCheck(registry) {
  const errors = []
  const ids = new Set()
  const referenced = new Set()
  for (const entry of registry.pages) {
    for (const field of ['id', 'file', 'source_file', 'source_selector', 'route', 'mode']) {
      if (!entry[field]) errors.push(`registry entry missing "${field}": ${JSON.stringify(entry)}`)
    }
    if (entry.id) {
      if (ids.has(entry.id)) errors.push(`duplicate id: ${entry.id}`)
      ids.add(entry.id)
    }
    if (!entry.file) continue
    referenced.add(entry.file)
    const abs = path.join(contentDir, entry.file)
    if (!existsSync(abs)) {
      errors.push(`${entry.file}: referenced by registry but missing (run content:pull)`)
      continue
    }
    const { frontmatter, body } = splitFrontmatter(readFileSync(abs, 'utf8'))
    const stored = frontmatterField(frontmatter, 'content_hash')
    if (!stored) errors.push(`${entry.file}: missing content_hash in frontmatter`)
    else if (stored !== sha256(body)) {
      errors.push(`${entry.file}: content_hash does not match body (stale mirror file)`)
    }
    if (frontmatterField(frontmatter, 'id') !== entry.id) {
      errors.push(`${entry.file}: frontmatter id disagrees with registry id "${entry.id}"`)
    }
    // two_way regions require markers in the HTML; none exist until PR-3.
    if (entry.two_way_regions?.length) {
      errors.push(`${entry.file}: two_way_regions set but push is not enabled until PR-3`)
    }
  }
  if (registry.pages.length !== referenced.size && ids.size === registry.pages.length) {
    // duplicate file paths across entries
    errors.push('registry references the same file from multiple entries')
  }

  if (errors.length > 0) {
    console.error('content:check failed:')
    for (const error of errors) console.error(`- ${error}`)
    process.exitCode = 1
    return
  }
  console.log(`content:check ok (${registry.pages.length} page(s))`)
}

function runPush() {
  console.error(
    'content:push is disabled until PR-3. Push is fail-closed: it requires content-sync\n' +
      'markers in the HTML and the constrained renderer (see docs/markdown-mirror.md).',
  )
  process.exitCode = 1
}

function main() {
  const cmd = process.argv[2]
  if (cmd === 'push') return runPush()
  const registry = loadRegistry()
  if (!registry) return undefined
  if (cmd === 'pull') return runPull(registry)
  if (cmd === 'diff') return runDiff(registry)
  if (cmd === 'check') return runCheck(registry)
  console.error('usage: node scripts/sync-content.mjs <pull|push|diff|check>')
  process.exitCode = 1
  return undefined
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (invokedDirectly) main()
