/**
 * Copy-as-Markdown — landing-page credential buttons.
 * Preloads each Markdown payload so the clipboard write happens synchronously
 * inside the click gesture (robust across browsers). Falls back to fetch-on-click,
 * then to opening the file, if the Clipboard API is unavailable.
 */
;(() => {
  document.addEventListener('DOMContentLoaded', init)

  /** @type {Map<string, string>} src -> markdown text */
  const cache = new Map()

  function init() {
    const buttons = document.querySelectorAll('[data-copy-src]')
    if (!buttons.length) return

    // Warm the cache so the click handler can write synchronously.
    for (const src of new Set([...buttons].map((b) => b.dataset.copySrc))) {
      fetch(src)
        .then((r) => (r.ok ? r.text() : Promise.reject(new Error(r.status))))
        .then((text) => cache.set(src, text))
        .catch(() => {})
    }

    for (const button of buttons) {
      button.addEventListener('click', () => copy(button))
    }
  }

  async function copy(button) {
    const src = button.dataset.copySrc
    let text = cache.get(src)

    if (text === undefined) {
      try {
        const res = await fetch(src)
        text = await res.text()
        cache.set(src, text)
      } catch {
        window.open(src, '_blank', 'noopener')
        return
      }
    }

    try {
      await navigator.clipboard.writeText(text)
      flash(button, 'Copied ✓')
    } catch {
      window.open(src, '_blank', 'noopener')
    }
  }

  /**
   * Briefly swap the button label to confirm the copy, then restore it.
   */
  function flash(button, message) {
    const label = button.querySelector('.cred-copy__label') || button
    if (button.dataset.busy === '1') return

    const original = label.textContent
    button.dataset.busy = '1'
    button.classList.add('is-copied')
    label.textContent = message

    setTimeout(() => {
      label.textContent = original
      button.classList.remove('is-copied')
      button.dataset.busy = '0'
    }, 2000)
  }
})()
