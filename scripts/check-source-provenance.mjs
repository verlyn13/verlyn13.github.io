import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Generalized, multi-producer source/feed provenance + leak-pattern checker.
// Producers are configured in scripts/provenance-producers.json. Two kinds:
//   - "sibling-markdown": the content pipeline (../new-direction-2026/ markdown).
//   - "feed": the meta-inventory project-intelligence feed (data/projects.json).
// Authored in meta-inventory/docs/delivery/provenance-checker-generalization.md;
// delivered into this repo by the operator-approved feed PR. Backward-compatible:
// with only the markdown producer configured, behavior matches the prior script.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const errors = []

// Dispatch runs in main() at the BOTTOM of the file so every module-level const
// (e.g. FEED_COMMENT_PATTERN) is initialized before any producer handler runs
// (avoids a temporal-dead-zone ReferenceError when a const is used in a function
// that the producer loop calls during evaluation).

// --- sibling-markdown producer (the existing content-pipeline contract) ---------
function checkSiblingMarkdown(producer) {
  const siblingRepo = process.env[producer.siblingEnv ?? 'SIBLING_REPO']
  const sourcePrefix = producer.sourcePrefix
  const sources = producer.sources ?? {}

  // expected: logical source names -> resolved paths, per the config map.
  const expected = new Map(
    Object.entries(producer.expected ?? {}).map(([file, names]) => [
      file,
      names.map((n) => sources[n]),
    ]),
  )
  // Auto-extend for every projects/*.html with the configured projects source.
  if (producer.expectProjectsGlob && producer.projectsSource) {
    const dir = path.join(root, producer.expectProjectsGlob)
    if (existsSync(dir)) {
      for (const fileName of readdirSync(dir).sort()) {
        if (fileName.endsWith('.html')) {
          expected.set(`${producer.expectProjectsGlob}/${fileName}`, [
            sources[producer.projectsSource],
          ])
        }
      }
    }
  }

  const prefixForRegex = sourcePrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const sourceCommentPattern = /<!--\s*source:[\s\S]*?-->/g
  const provenancePattern = new RegExp(
    `<!--\\s*source:\\s*(${prefixForRegex}[^\\s@]+)\\s*@\\s*([0-9a-f]{7,40});\\s*refreshed:\\s*(\\d{4}-\\d{2}-\\d{2})\\s*-->`,
    'g',
  )

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
      const record = references.get(key) ?? { sourcePath, sha, refreshed, destinations: [] }
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
    console.log(`${record.sourcePath} @ ${record.sha} -> ${record.destinations.join(', ')}`)
  }

  if (siblingRepo) {
    console.log(`SIBLING_REPO=${siblingRepo}`)
    for (const record of references.values()) {
      validateSiblingRef(record, siblingRepo)
    }
  } else {
    console.log('SIBLING_REPO not set; skipping sibling git validation')
  }
}

function validateSiblingRef({ sourcePath, sha }, siblingRepo) {
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
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
  ).trim()
  if (latest && latest !== sha) {
    console.warn(`${sourcePath}: sibling HEAD latest is ${latest}; embedded SHA is ${sha}`)
  }
}

// --- feed producer (the meta-inventory project-intelligence feed) ---------------
const FEED_COMMENT_PATTERN =
  /<!--\s*feed:\s*([^\s@]+)\s*@\s*([0-9a-f]{7,40});\s*asOf:\s*(\d{4}-\d{2}-\d{2}|unknown);\s*dirty:\s*(true|false);\s*id:\s*([a-z0-9-]+)\s*-->/g

function checkFeed(producer) {
  const feedAbs = path.join(root, producer.feedPath)
  if (!existsSync(feedAbs)) {
    if (producer.requireFeedFile) {
      errors.push(`feed producer "${producer.name}": feed file missing at ${producer.feedPath}`)
    }
    return
  }

  let feed
  try {
    feed = JSON.parse(readFileSync(feedAbs, 'utf8'))
  } catch (err) {
    errors.push(
      `feed producer "${producer.name}": ${producer.feedPath} is not valid JSON (${err.message})`,
    )
    return
  }

  const byId = new Map((feed.projects ?? []).map((p) => [p.id, p]))
  const feedDirty = Boolean(feed?.provenance?.kbDirty)
  const leak = producer.leakChecks ?? {}
  const forbidStrings = leak.forbidStrings ?? []

  // Discover feed surfaces: files under surfaceGlobs that carry a feed comment.
  const surfaces = discoverFeedSurfaces(producer.surfaceGlobs ?? ['.'])

  for (const relativePath of surfaces) {
    const html = readFileSync(path.join(root, relativePath), 'utf8')
    const matches = [...html.matchAll(FEED_COMMENT_PATTERN)]

    // forbidStrings is a hard leak gate on every feed surface (rendered text).
    for (const needle of forbidStrings) {
      if (needle && html.includes(needle)) {
        errors.push(
          `${relativePath}: forbidden string "${needle}" present in a feed surface (leak)`,
        )
      }
    }

    for (const match of matches) {
      const [, feedRef, sha, asOf, dirty, id] = match

      if (path.normalize(feedRef) !== path.normalize(producer.feedPath)) {
        errors.push(
          `${relativePath}: feed comment path "${feedRef}" != configured "${producer.feedPath}"`,
        )
      }
      if (
        feed?.provenance?.kbSha &&
        sha !== feed.provenance.kbSha &&
        sha !== feed.provenance.kbSha.slice(0, sha.length)
      ) {
        errors.push(
          `${relativePath}: feed comment kbSha ${sha} does not match feed provenance.kbSha ${feed.provenance.kbSha}`,
        )
      }
      if (leak.failIfDirtyTrue && dirty === 'true') {
        errors.push(
          `${relativePath}: feed comment dirty:true (a dirty feed must not deploy) for id "${id}"`,
        )
      }
      if ((dirty === 'true') !== feedDirty) {
        errors.push(
          `${relativePath}: feed comment dirty=${dirty} disagrees with feed provenance.kbDirty=${feedDirty} for id "${id}"`,
        )
      }

      const project = byId.get(id)
      if (!project) {
        errors.push(`${relativePath}: feed comment id "${id}" not present in ${producer.feedPath}`)
        continue
      }

      if (leak.requireAsOfMatchesFeed) {
        const feedAsOf = project.asOf
        if (feedAsOf === 'unknown' || feedAsOf == null) {
          if (asOf !== 'unknown') {
            errors.push(
              `${relativePath}: id "${id}" feed asOf is unknown; surface must use "asOf: unknown" (found "${asOf}")`,
            )
          }
        } else {
          const feedDate = String(feedAsOf).slice(0, 10)
          if (asOf !== feedDate) {
            errors.push(
              `${relativePath}: id "${id}" asOf "${asOf}" != feed asOf date "${feedDate}"`,
            )
          }
        }
      }

      console.log(`feed:${producer.feedPath}#${id} @ ${sha} (asOf ${asOf}) -> ${relativePath}`)
    }
  }
}

function discoverFeedSurfaces(globs) {
  const found = new Set()
  for (const glob of globs) {
    const dir = path.join(root, glob)
    if (!existsSync(dir)) continue
    let entries = []
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      continue
    }
    for (const ent of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (!ent.isFile() || !ent.name.endsWith('.html')) continue
      const rel = glob === '.' ? ent.name : `${glob}/${ent.name}`
      const html = readFileSync(path.join(root, rel), 'utf8')
      if (/<!--\s*feed:/.test(html)) found.add(rel)
    }
  }
  return [...found].sort()
}

// --- entrypoint (runs after all module-level declarations are initialized) -------
function main() {
  const producersPath = path.join(root, 'scripts', 'provenance-producers.json')
  if (!existsSync(producersPath)) {
    console.error(`provenance-producers.json not found at ${producersPath}`)
    process.exit(1)
  }
  const producers = JSON.parse(readFileSync(producersPath, 'utf8'))

  for (const producer of producers) {
    if (producer.kind === 'sibling-markdown') {
      checkSiblingMarkdown(producer)
    } else if (producer.kind === 'feed') {
      checkFeed(producer)
    } else {
      errors.push(`producer "${producer.name}": unknown kind "${producer.kind}"`)
    }
  }

  if (errors.length > 0) {
    console.error('\nProvenance check failed:')
    for (const error of errors) {
      console.error(`- ${error}`)
    }
    process.exitCode = 1
  }
}

main()
