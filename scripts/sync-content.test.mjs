import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  buildMirror,
  emitRegistry,
  extractRegion,
  htmlToMarkdown,
  parseMarkdownBlocks,
  parseRegistry,
  regionToMarkdown,
  renderInlineHtml,
  renderRegionHtml,
  replaceRegion,
  sha256,
  splitFrontmatter,
} from './sync-content.mjs'

const FIXTURE = `<!DOCTYPE html><html lang="en"><body>
  <nav class="site-nav"><a href="/">nav-link</a></nav>
  <main>
    <!-- source: x.md @ abc1234; refreshed: 2026-01-01 -->
    <section class="s">
      <h2>Overview</h2>
      <p>Hello <strong>world</strong> and <a href="/x">link</a>.</p>
      <ul><li>one</li><li>two</li></ul>
    </section>
  </main>
  <footer class="site-footer"><p>footer text</p></footer>
</body></html>`

const EXPECTED_BODY = `## Overview

Hello **world** and [link](/x).

- one
- two
`

const ENTRY = {
  id: 'page_fixture',
  file: 'pages/fixture.md',
  source_file: 'fixture.html',
  source_selector: 'main',
  route: '/fixture',
}

test('known fixture converts to the expected Markdown body', () => {
  const { body } = htmlToMarkdown(FIXTURE)
  assert.equal(body, EXPECTED_BODY)
})

test('nav and footer are excluded from the mirrored body', () => {
  const { body } = htmlToMarkdown(FIXTURE)
  assert.ok(!body.includes('nav-link'))
  assert.ok(!body.includes('footer text'))
})

test('provenance comments are ignored in body and hash', () => {
  const withComment = FIXTURE
  const withoutComment = FIXTURE.replace(/<!--[\s\S]*?-->/, '')
  assert.equal(htmlToMarkdown(withComment).body, htmlToMarkdown(withoutComment).body)
  assert.equal(htmlToMarkdown(withComment).htmlHash, htmlToMarkdown(withoutComment).htmlHash)
})

test('conversion is deterministic (same input -> same output)', () => {
  const a = htmlToMarkdown(FIXTURE)
  const b = htmlToMarkdown(FIXTURE)
  assert.equal(a.body, b.body)
  assert.equal(a.htmlHash, b.htmlHash)
})

test('stored content_hash matches the written body', () => {
  const mirror = buildMirror(ENTRY, FIXTURE)
  const { frontmatter, body } = splitFrontmatter(mirror.text)
  assert.equal(body, mirror.body)
  assert.match(frontmatter, new RegExp(`content_hash: ${mirror.contentHash}`))
  assert.equal(sha256(body), mirror.contentHash)
})

test('rebuilding an unchanged source yields identical file text (no rewrite)', () => {
  assert.equal(buildMirror(ENTRY, FIXTURE).text, buildMirror(ENTRY, FIXTURE).text)
})

test('id persists through a title/heading change when the registry maps it', () => {
  const renamed = FIXTURE.replace('<h2>Overview</h2>', '<h2>Summary</h2>')
  const mirror = buildMirror(ENTRY, renamed)
  const { frontmatter } = splitFrontmatter(mirror.text)
  assert.match(frontmatter, /id: page_fixture/)
  assert.ok(mirror.body.includes('## Summary'))
})

test('registry emit is sorted by id and round-trips through parse', () => {
  const unsorted = {
    pages: [
      {
        id: 'page_z',
        file: 'pages/z.md',
        source_file: 'z.html',
        source_selector: 'main',
        route: '/z',
        mode: 'pull_only',
        two_way_regions: [],
      },
      {
        id: 'page_a',
        file: 'pages/a.md',
        source_file: 'a.html',
        source_selector: 'main',
        route: '/a',
        mode: 'pull_only',
        two_way_regions: ['a.intro'],
      },
    ],
  }
  const emitted = emitRegistry(unsorted)
  assert.ok(emitted.indexOf('page_a') < emitted.indexOf('page_z'))
  const parsed = parseRegistry(emitted)
  assert.equal(parsed.pages.length, 2)
  assert.equal(parsed.pages[0].id, 'page_a')
  assert.deepEqual(parsed.pages[0].two_way_regions, ['a.intro'])
  assert.equal(parsed.pages[1].mode, 'pull_only')
  assert.equal(emitRegistry(parsed), emitted) // idempotent
})

test('the committed registry parses and references unique ids and files', () => {
  const registryPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    'docs/content/registry.yaml',
  )
  const { pages } = parseRegistry(readFileSync(registryPath, 'utf8'))
  assert.ok(pages.length >= 1)
  assert.equal(new Set(pages.map((p) => p.id)).size, pages.length)
  assert.equal(new Set(pages.map((p) => p.file)).size, pages.length)
  for (const page of pages) {
    assert.match(page.id, /^page_[a-z0-9-]+$/)
    assert.ok(page.file.startsWith('pages/'))
    assert.equal(page.mode, 'pull_only')
  }
})

// --- two-way regions (PR-3) -----------------------------------------------------

const REGION_MD = `Hello **world** and [link](/x).

- one
- two

## Sub

> a quote
`

const MARKED_HTML = `<section>
    <!-- content-sync:start demo.region -->
    <p>alpha</p>
    <p>beta</p>
    <!-- content-sync:end demo.region -->
</section>`

test('region round-trip: md -> html -> md is byte-stable', () => {
  const html = renderRegionHtml(REGION_MD, '  ')
  assert.equal(regionToMarkdown(html), REGION_MD)
  assert.equal(renderRegionHtml(regionToMarkdown(html), '  '), html)
})

test('dicee.overview round-trips byte-identically at its 20-space indent', () => {
  const indent = ' '.repeat(20)
  const inner = [
    `${indent}<p>Family-friendly multiplayer dice game demonstrating serverless real-time coordination at scale. Built to explore Cloudflare's edge computing model and WebAssembly optimization.</p>`,
    `${indent}<p>Solo development from architecture through deployment. Live users, real monitoring, production infrastructure.</p>`,
  ].join('\n')
  assert.equal(renderRegionHtml(regionToMarkdown(inner), indent), inner)
})

test('extractRegion reads the marker indent and inner content', () => {
  const region = extractRegion(MARKED_HTML, 'demo.region')
  assert.equal(region.indent, '    ')
  assert.ok(region.inner.includes('<p>alpha</p>'))
})

test('extractRegion + replaceRegion is an identity when inner is unchanged', () => {
  const region = extractRegion(MARKED_HTML, 'demo.region')
  assert.equal(replaceRegion(MARKED_HTML, 'demo.region', region.inner), MARKED_HTML)
})

test('extractRegion returns null when markers are absent', () => {
  assert.equal(extractRegion('<p>no markers here</p>', 'demo.region'), null)
})

test('push refuses illegal vocabulary (parseMarkdownBlocks throws)', () => {
  for (const bad of [
    '![img](/a.png)',
    '| a | b |',
    '```\ncode\n```',
    '##### h5',
    '<div>raw</div>',
  ]) {
    assert.throws(() => parseMarkdownBlocks(bad), `should reject: ${bad}`)
  }
})

test('parseMarkdownBlocks accepts the allowed vocabulary', () => {
  const types = parseMarkdownBlocks('## H\n\npara\n\n- a\n- b\n\n> q').map((b) => b.type)
  assert.deepEqual(types, ['h', 'p', 'ul', 'blockquote'])
})

test('renderInlineHtml escapes structural chars and preserves apostrophes', () => {
  assert.equal(renderInlineHtml('a & b < c'), 'a &amp; b &lt; c')
  assert.equal(renderInlineHtml('**x** and `y`'), '<strong>x</strong> and <code>y</code>')
  assert.equal(renderInlineHtml("Cloudflare's edge"), "Cloudflare's edge")
})
