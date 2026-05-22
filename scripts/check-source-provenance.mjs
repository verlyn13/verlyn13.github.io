import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const siblingRepo = process.env.SIBLING_REPO
const sourcePrefix = '../new-direction-2026/'

const sources = {
  cv: 'career-transition-ready/cv-materials/CV-COMPREHENSIVE-EXTRACT.md',
  portfolio: 'career-transition-ready/website-content/PORTFOLIO-QUICK.md',
  projects: 'career-transition-ready/technical-projects/ACTIVE-PROJECTS-PORTFOLIO.md',
  research: 'career-transition-ready/research-publications/RESEARCH-PUBLICATIONS.md',
  timeline: 'career-transition-ready/website-content/timeline-component-spec.md',
  teaching: 'career-transition-ready/teaching-portfolio/TEACHING-INVENTORY.md',
}

const expected = new Map([
  ['index.html', [sources.portfolio]],
  ['contact.html', [sources.portfolio]],
  ['cv.html', [sources.cv, sources.teaching]],
  ['experience/index.html', [sources.timeline]],
  ['research/index.html', [sources.research]],
])

for (const fileName of readdirSync(path.join(root, 'projects')).sort()) {
  if (fileName.endsWith('.html')) {
    expected.set(`projects/${fileName}`, [sources.projects])
  }
}

const sourceCommentPattern = /<!--\s*source:[\s\S]*?-->/g
const provenancePattern =
  /<!--\s*source:\s*(\.\.\/new-direction-2026\/[^\s@]+)\s*@\s*([0-9a-f]{7,40});\s*refreshed:\s*(\d{4}-\d{2}-\d{2})\s*-->/g

const errors = []
const references = new Map()

for (const [relativePath, expectedSources] of expected) {
  const absolutePath = path.join(root, relativePath)

  if (!existsSync(absolutePath)) {
    errors.push(`${relativePath}: file is missing`)
    continue
  }

  const html = readFileSync(absolutePath, 'utf8')
  const sourceComments = html.match(sourceCommentPattern) ?? []
  const parsed = [...html.matchAll(provenancePattern)]

  if (sourceComments.length === 0) {
    errors.push(`${relativePath}: missing source provenance comment`)
    continue
  }

  if (sourceComments.length !== parsed.length) {
    errors.push(`${relativePath}: malformed source provenance comment`)
    continue
  }

  const actualSources = new Set()

  for (const match of parsed) {
    const [, sourceRef, sha, refreshed] = match
    const sourcePath = sourceRef.slice(sourcePrefix.length)
    actualSources.add(sourcePath)

    const key = `${sourcePath}@${sha}`
    const record = references.get(key) ?? {
      sourcePath,
      sha,
      refreshed,
      destinations: [],
    }

    record.destinations.push(relativePath)
    references.set(key, record)
  }

  for (const sourcePath of expectedSources) {
    if (!actualSources.has(sourcePath)) {
      errors.push(`${relativePath}: missing expected source ${sourcePath}`)
    }
  }
}

for (const record of references.values()) {
  const destinations = record.destinations.join(', ')
  console.log(`${record.sourcePath} @ ${record.sha} -> ${destinations}`)
}

if (siblingRepo) {
  console.log(`SIBLING_REPO=${siblingRepo}`)

  for (const record of references.values()) {
    validateSiblingRef(record)
  }
} else {
  console.log('SIBLING_REPO not set; skipping sibling git validation')
}

if (errors.length > 0) {
  console.error('\nSource provenance check failed:')
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exitCode = 1
}

function validateSiblingRef({ sourcePath, sha }) {
  try {
    execFileSync('git', ['-C', siblingRepo, 'rev-parse', '--verify', `${sha}^{commit}`], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
  } catch {
    errors.push(`${sourcePath}: embedded SHA ${sha} does not exist in sibling history`)
    return
  }

  const latest = execFileSync(
    'git',
    ['-C', siblingRepo, 'log', '-n', '1', '--abbrev=7', '--format=%h', '--', sourcePath],
    {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  ).trim()

  if (latest && latest !== sha) {
    console.warn(`${sourcePath}: sibling HEAD latest is ${latest}; embedded SHA is ${sha}`)
  }
}
