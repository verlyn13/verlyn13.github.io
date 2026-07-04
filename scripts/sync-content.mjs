import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse, parseFragment, serialize } from 'parse5'

// Structured Markdown mirror — HTML <-> Markdown sync tool.
// Contract: docs/markdown-mirror.md · Rationale: docs/adr/0010-structured-markdown-mirror.md
//
// Commands: `pull` (HTML -> MD), `diff` (dry run), `check` (integrity gate), and `push`
// (MD -> HTML for opt-in two_way regions). Push is fail-closed: it only rewrites content
// between content-sync markers, only accepts a constrained vocabulary, and refuses on a
// stale html_hash. HTML is authoritative; this tree is a committed sidecar mirror.

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

// --- two-way regions (opt-in prose, fail-closed push) ---------------------------
// A region is delimited in the HTML by paired content-sync comments and mirrored to
// docs/content/regions/<id>.md. Only this constrained vocabulary round-trips: paragraphs,
// h2-h4, ul/ol, blockquote, and inline strong/em/code/a. Push touches only the inner
// content between markers — never the wrapper element or its attributes.
function regionPattern(id) {
  const e = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(
    `([ \\t]*)<!--\\s*content-sync:start ${e}\\s*-->\\n([\\s\\S]*?)\\n[ \\t]*<!--\\s*content-sync:end ${e}\\s*-->`,
  )
}

export function extractRegion(html, id) {
  const match = html.match(regionPattern(id))
  if (!match) return null
  return { indent: match[1], inner: match[2] }
}

export function replaceRegion(html, id, inner) {
  return html.replace(
    regionPattern(id),
    (_full, indent) =>
      `${indent}<!-- content-sync:start ${id} -->\n${inner}\n${indent}<!-- content-sync:end ${id} -->`,
  )
}

function regionHtmlHash(inner) {
  return sha256(
    inner
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\s+/g, ' ')
      .trim(),
  )
}

export function regionToMarkdown(inner) {
  return `${collectBlocks(parseFragment(inner))
    .join('\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()}\n`
}

// MD -> HTML for push. Fail-closed: throws on any construct outside the vocabulary.
export function parseMarkdownBlocks(md) {
  const blocks = []
  for (const chunk of md.replace(/\n+$/, '').split(/\n{2,}/)) {
    if (!chunk.trim()) continue
    const lines = chunk.split('\n')
    if (lines.every((l) => /^- /.test(l))) {
      blocks.push({ type: 'ul', items: lines.map((l) => l.slice(2)) })
    } else if (lines.every((l) => /^\d+\. /.test(l))) {
      blocks.push({ type: 'ol', items: lines.map((l) => l.replace(/^\d+\.\s/, '')) })
    } else if (lines.every((l) => /^> /.test(l))) {
      blocks.push({ type: 'blockquote', text: lines.map((l) => l.slice(2)).join(' ') })
    } else if (lines.length === 1 && /^#{2,4} /.test(lines[0])) {
      const level = lines[0].match(/^#+/)[0].length
      blocks.push({ type: 'h', level, text: lines[0].replace(/^#+\s/, '') })
    } else {
      for (const l of lines) {
        if (/^\s*(#|>|-\s|\d+\.\s|```|\||!\[)/.test(l) || /<[a-z/!]/i.test(l)) {
          throw new Error(`unsupported construct: ${l.trim()}`)
        }
      }
      blocks.push({ type: 'p', text: collapse(lines.join(' ')) })
    }
  }
  return blocks
}

export function renderInlineHtml(text) {
  let out = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m, t, u) => `<a href="${u.replace(/&/g, '&amp;')}">${t}</a>`,
  )
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>')
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
  return out
}

export function renderRegionHtml(md, indent = '') {
  const lines = []
  for (const block of parseMarkdownBlocks(md)) {
    if (block.type === 'p') {
      lines.push(`${indent}<p>${renderInlineHtml(block.text)}</p>`)
    } else if (block.type === 'h') {
      lines.push(`${indent}<h${block.level}>${renderInlineHtml(block.text)}</h${block.level}>`)
    } else if (block.type === 'ul' || block.type === 'ol') {
      lines.push(`${indent}<${block.type}>`)
      for (const item of block.items) lines.push(`${indent}    <li>${renderInlineHtml(item)}</li>`)
      lines.push(`${indent}</${block.type}>`)
    } else if (block.type === 'blockquote') {
      lines.push(`${indent}<blockquote>`)
      lines.push(`${indent}    <p>${renderInlineHtml(block.text)}</p>`)
      lines.push(`${indent}</blockquote>`)
    }
  }
  return lines.join('\n')
}

function buildRegionFrontmatter(id, entry, contentHash, htmlHash) {
  return [
    '---',
    `id: ${id}`,
    'type: region',
    `source_file: ${entry.source_file}`,
    `marker: ${id}`,
    `page: ${entry.id}`,
    `content_hash: ${contentHash}`,
    `html_hash: ${htmlHash}`,
    `normalizer_version: ${NORMALIZER_VERSION}`,
    'sync_direction: two_way',
    'protected_fields: [id, type, source_file, marker, page, normalizer_version]',
    '---',
    '',
  ].join('\n')
}

export function buildRegion(entry, html, id) {
  const region = extractRegion(html, id)
  if (!region) return null
  const body = regionToMarkdown(region.inner)
  const contentHash = sha256(body)
  const htmlHash = regionHtmlHash(region.inner)
  const text = `${buildRegionFrontmatter(id, entry, contentHash, htmlHash)}\n${body}`
  return { id, file: `regions/${id}.md`, text, body, contentHash, htmlHash, indent: region.indent }
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

function writeIfChanged(file, text) {
  const abs = path.join(contentDir, file)
  const existing = existsSync(abs) ? readFileSync(abs, 'utf8') : null
  if (existing === text) {
    console.log(`  unchanged  ${file}`)
    return 0
  }
  mkdirSync(path.dirname(abs), { recursive: true })
  writeFileSync(abs, text)
  console.log(`  ${existing ? 'updated' : 'created'}    ${file}`)
  return 1
}

function diffFile(file, text) {
  const abs = path.join(contentDir, file)
  const existing = existsSync(abs) ? readFileSync(abs, 'utf8') : null
  if (existing == null) {
    console.log(`  new        ${file} (pull would create)`)
    return 1
  }
  if (existing !== text) {
    console.log(`  drifted    ${file} (pull would update)`)
    return 1
  }
  console.log(`  in sync    ${file}`)
  return 0
}

function forEachRegion(entry, html, fn) {
  for (const id of entry.two_way_regions ?? []) {
    const region = buildRegion(entry, html, id)
    if (!region) {
      console.log(`  MISSING    markers for region ${id} in ${entry.source_file}`)
      fn(null)
      continue
    }
    fn(region)
  }
}

function runPull(registry) {
  let written = 0
  for (const entry of [...registry.pages].sort((a, b) => a.id.localeCompare(b.id))) {
    const html = readSource(entry)
    written += writeIfChanged(entry.file, buildMirror(entry, html).text)
    forEachRegion(entry, html, (region) => {
      if (region) written += writeIfChanged(region.file, region.text)
    })
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
    const html = readSource(entry)
    drift += diffFile(entry.file, buildMirror(entry, html).text)
    forEachRegion(entry, html, (region) => {
      if (region) drift += diffFile(region.file, region.text)
      else drift += 1
    })
  }
  console.log(drift ? `diff: ${drift} file(s) would change on pull` : 'diff: no drift')
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
    // two_way regions: markers must exist, the region file must be present + fresh,
    // and its body must use only the constrained vocabulary.
    for (const id of entry.two_way_regions ?? []) {
      let html
      try {
        html = readSource(entry)
      } catch (err) {
        errors.push(`${id}: ${err.message}`)
        continue
      }
      if (!extractRegion(html, id)) {
        errors.push(`${entry.source_file}: two_way region "${id}" has no content-sync markers`)
        continue
      }
      const regionAbs = path.join(contentDir, 'regions', `${id}.md`)
      if (!existsSync(regionAbs)) {
        errors.push(
          `regions/${id}.md: referenced by two_way_regions but missing (run content:pull)`,
        )
        continue
      }
      const region = splitFrontmatter(readFileSync(regionAbs, 'utf8'))
      if (frontmatterField(region.frontmatter, 'content_hash') !== sha256(region.body)) {
        errors.push(`regions/${id}.md: content_hash does not match body (stale region file)`)
      }
      try {
        parseMarkdownBlocks(region.body)
      } catch (err) {
        errors.push(`regions/${id}.md: illegal vocabulary — ${err.message}`)
      }
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

// Push Markdown back into the marked HTML regions. Fail-closed at every step.
function runPush(registry) {
  const errors = []
  let pushed = 0
  let inSync = 0
  for (const entry of registry.pages) {
    for (const id of entry.two_way_regions ?? []) {
      const regionAbs = path.join(contentDir, 'regions', `${id}.md`)
      if (!existsSync(regionAbs)) {
        errors.push(`${id}: regions/${id}.md missing (run content:pull first)`)
        continue
      }
      const { frontmatter, body } = splitFrontmatter(readFileSync(regionAbs, 'utf8'))
      const srcAbs = path.join(root, entry.source_file)
      const html = readFileSync(srcAbs, 'utf8')
      const region = extractRegion(html, id)
      if (!region) {
        errors.push(`${id}: no content-sync markers in ${entry.source_file} (refused)`)
        continue
      }
      let rendered
      try {
        rendered = renderRegionHtml(body, region.indent)
      } catch (err) {
        errors.push(`${id}: illegal Markdown vocabulary — ${err.message} (refused)`)
        continue
      }
      if (rendered === region.inner) {
        console.log(`  in sync    ${id}`)
        inSync += 1
        continue
      }
      // The rendered HTML differs. Only proceed if the HTML region is unchanged since
      // the last pull; otherwise this would clobber an out-of-band HTML edit.
      const storedHtmlHash = frontmatterField(frontmatter, 'html_hash')
      if (storedHtmlHash && regionHtmlHash(region.inner) !== storedHtmlHash) {
        errors.push(
          `${id}: HTML changed since last pull (html_hash conflict) — run content:pull and reconcile (refused)`,
        )
        continue
      }
      writeFileSync(srcAbs, replaceRegion(html, id, rendered))
      const refreshed = readFileSync(regionAbs, 'utf8').replace(
        /^html_hash:.*$/m,
        `html_hash: ${regionHtmlHash(rendered)}`,
      )
      writeFileSync(regionAbs, refreshed)
      console.log(`  pushed     ${id} -> ${entry.source_file}`)
      pushed += 1
    }
  }
  if (errors.length > 0) {
    console.error('content:push refused:')
    for (const error of errors) console.error(`- ${error}`)
    process.exitCode = 1
    return
  }
  if (pushed > 0) {
    console.log(`push: ${pushed} region(s) written, ${inSync} in sync`)
    console.log('note: run `npm run content:pull` to refresh the page-level projections.')
  } else {
    console.log(
      inSync > 0 ? `push: ${inSync} region(s) already in sync` : 'push: no two_way regions',
    )
  }
}

function main() {
  const cmd = process.argv[2]
  const registry = loadRegistry()
  if (!registry) return undefined
  if (cmd === 'pull') return runPull(registry)
  if (cmd === 'diff') return runDiff(registry)
  if (cmd === 'check') return runCheck(registry)
  if (cmd === 'push') return runPush(registry)
  console.error('usage: node scripts/sync-content.mjs <pull|push|diff|check>')
  process.exitCode = 1
  return undefined
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (invokedDirectly) main()
