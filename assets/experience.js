const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

function scrollBehavior() {
  return reducedMotion.matches ? 'auto' : 'smooth'
}

function scrollToEra(era) {
  const target = document.getElementById(era)
  if (!target) return

  target.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
  history.pushState(null, '', `#${era}`)
}

for (const link of document.querySelectorAll('.era-link')) {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    scrollToEra(link.dataset.era)
  })
}

const backToTop = document.getElementById('back-to-top')
const hero = document.querySelector('.experience-hero')

if (backToTop && hero) {
  const heroObserver = new IntersectionObserver(
    ([entry]) => backToTop.classList.toggle('visible', !entry.isIntersecting),
    { threshold: 0, rootMargin: '-100px 0px 0px 0px' },
  )

  heroObserver.observe(hero)
  backToTop.addEventListener('click', () => {
    hero.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
    history.pushState(null, '', window.location.pathname)
  })
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue

      document.querySelectorAll('.era-link, .era-label').forEach((element) => {
        element.classList.remove('active')
      })

      const era = entry.target.dataset.era
      document.querySelector(`.era-link[data-era="${era}"]`)?.classList.add('active')
      document.getElementById(`label-${era}`)?.classList.add('active')
    }
  },
  { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' },
)

document.querySelectorAll('.era-section').forEach((section) => {
  sectionObserver.observe(section)
})

const initialEra = window.location.hash.slice(1)
if (initialEra && document.getElementById(initialEra)) {
  requestAnimationFrame(() => {
    document
      .getElementById(initialEra)
      ?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
  })
}
