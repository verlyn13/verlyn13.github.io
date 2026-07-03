import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  buildMirror,
  emitRegistry,
  htmlToMarkdown,
  parseRegistry,
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
