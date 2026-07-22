/**
 * Site Navigation - Mobile Menu & Active State
 * 2026 standard: fast, accessible, minimal
 */
;(() => {
  document.addEventListener('DOMContentLoaded', init)

  function init() {
    setupMobileMenu()
    setActiveNavLink()
  }

  /**
   * Mobile menu toggle
   * Transforms nav-links into slide-down menu on mobile
   */
  function setupMobileMenu() {
    const nav = document.querySelector('.site-nav')
    if (!nav) return

    const container = nav.querySelector('.container')
    const navLinks = nav.querySelector('.nav-links')
    if (!container || !navLinks) return

    // Create toggle button
    const toggle = document.createElement('button')
    toggle.className = 'nav-toggle'
    toggle.setAttribute('aria-label', 'Toggle navigation menu')
    toggle.setAttribute('aria-expanded', 'false')
    if (!navLinks.id) navLinks.id = 'site-navigation'
    toggle.setAttribute('aria-controls', navLinks.id)
    toggle.innerHTML = `
      <span class="nav-toggle__bar"></span>
      <span class="nav-toggle__bar"></span>
      <span class="nav-toggle__bar"></span>
    `
    container.appendChild(toggle)

    // Toggle menu
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav-links--open')
      toggle.classList.toggle('nav-toggle--active', isOpen)
      toggle.setAttribute('aria-expanded', isOpen)
    })

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('nav-links--open')
        toggle.classList.remove('nav-toggle--active')
        toggle.setAttribute('aria-expanded', 'false')
      }
    })

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navLinks.classList.remove('nav-links--open')
        toggle.classList.remove('nav-toggle--active')
        toggle.setAttribute('aria-expanded', 'false')
      }
    })
  }

  /**
   * Set active state based on current path
   */
  function setActiveNavLink() {
    const path = window.location.pathname
    const links = document.querySelectorAll('.nav-links a')

    links.forEach((link) => {
      link.classList.remove('active')
      link.removeAttribute('aria-current')
      const href = link.getAttribute('href')

      // Exact match or starts with (for sections)
      if (href === path || (href !== '/' && path.startsWith(href.replace(/\/$/, '')))) {
        link.classList.add('active')
        link.setAttribute('aria-current', 'page')
      }

      // Special case: Evidence anchor on homepage
      if (href === '/#evidence' && path === '/' && window.location.hash === '#evidence') {
        link.classList.add('active')
        link.setAttribute('aria-current', 'page')
      }
    })
  }
})()
