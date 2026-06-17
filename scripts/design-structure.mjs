// Renders the per-project "Design structure" panel (S3) from a feed-model entry:
// scope strip + key decisions + activity rail + a provenance line. Absent-tolerant —
// returns '' until the feed carries scope/decisions/activity (relay 2026-06-17 §5), so it
// is wired in now and lights up unchanged when those v1 fields emit. A Vite transformIndexHtml
// plugin (vite.config.js) splices the result at a `<!-- @design-structure: <id> -->` marker —
// build-time, no client JS, no source mutation. Spec: docs/project-intelligence-design-spec-2026-06-16.md §4.

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ESC[c])

const spanText = (span) =>
  typeof span === 'string'
    ? span
    : span?.first || span?.last
      ? `${String(span.first ?? '?').slice(0, 7)} – ${String(span.last ?? '?').slice(0, 7)}`
      : ''

function card(label, value, note) {
  const noteHtml = note ? `<p class="evidence-card__note">${esc(note)}</p>` : ''
  return `        <li class="evidence-card"><p class="evidence-card__label">${esc(label)}</p><p class="evidence-card__value">${esc(value)}</p>${noteHtml}</li>`
}

// Scope strip reuses the colophon .evidence-grid/.evidence-card; only cards with data render.
function scopeStrip(scope) {
  if (!scope) return ''
  const cards = []
  if (scope.languages?.length) {
    cards.push(card('Languages', scope.languages.map((l) => l.name ?? l).join(', ')))
  }
  const span = spanText(scope.activeSpan)
  if (span) cards.push(card('Active span', span))
  if (scope.releases?.length) {
    const latest = scope.releases.at(-1)
    cards.push(
      card('Releases', String(scope.releases.length), latest?.tag ? `latest ${latest.tag}` : ''),
    )
  }
  if (scope.hasTests != null || scope.hasCI != null) {
    const value = [scope.hasTests ? 'tests' : null, scope.hasCI ? 'CI' : null]
      .filter(Boolean)
      .join(' · ')
    cards.push(card('Tests & CI', value || '—'))
  }
  return cards.length
    ? `      <h3>Scope</h3>\n      <ul class="evidence-grid">\n${cards.join('\n')}\n      </ul>`
    : ''
}

function decisionsList(decisions) {
  if (!decisions?.length) return ''
  const items = decisions.map((d) => {
    const summary = d.summary ? `<p class="decision__summary">${esc(d.summary)}</p>` : ''
    const source = d.sourceLabel
      ? `<span class="decision__source">${esc(d.sourceLabel)}</span>`
      : ''
    return `        <li class="decision"><p class="decision__title">${esc(d.title)}</p>${summary}${source}</li>`
  })
  return `      <h3>Key decisions</h3>\n      <ul class="decision-list">\n${items.join('\n')}\n      </ul>`
}

// Build-time, zero-JS column plot: magnitude bucketed into 5 height classes (no inline styles).
function activityRail(activity) {
  if (!activity?.length) return ''
  const max = Math.max(...activity.map((a) => a.magnitude ?? 1), 1)
  const bars = activity.map((a) => {
    const level = Math.max(1, Math.ceil(((a.magnitude ?? 1) / max) * 5))
    const release = a.type === 'release' ? ' activity-bar--release' : ''
    const label = a.type === 'release' ? `release ${a.label ?? a.date}` : a.date
    return `        <span class="activity-bar activity-bar--l${level}${release}" title="${esc(label)}"></span>`
  })
  const first = String(activity[0]?.date ?? '').slice(0, 7)
  const last = String(activity.at(-1)?.date ?? '').slice(0, 7)
  return `      <h3>Activity</h3>
      <figure class="activity-rail" role="img" aria-label="Monthly activity from ${esc(first)} to ${esc(last)}; release months marked.">
        <div class="activity-rail__plot" aria-hidden="true">
${bars.join('\n')}
        </div>
        <div class="activity-rail__axis"><span>${esc(first)}</span><span>${esc(last)}</span></div>
        <p class="activity-rail__legend"><span><span class="activity-rail__swatch activity-rail__swatch--commit"></span> commits</span><span><span class="activity-rail__swatch activity-rail__swatch--release"></span> release</span></p>
      </figure>`
}

export function renderDesignStructure(entry) {
  if (!entry) return ''
  const parts = [
    scopeStrip(entry.scope),
    decisionsList(entry.decisions),
    activityRail(entry.activity),
  ]
  if (!parts.some(Boolean)) return '' // absent-tolerant: nothing to show until v1 fields land
  return `<section class="project-design-structure">
      <h2>Design structure</h2>
${parts.filter(Boolean).join('\n')}
      <p class="project-provenance">Scope and activity are feed-derived from a controlled inventory. <a href="/colophon.html">How this portfolio is published →</a></p>
    </section>`
}
