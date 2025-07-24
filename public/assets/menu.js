// Minimal mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu structure
    const header = document.querySelector('.site-header, .site-header-home');
    if (!header) return;
    
    const container = header.querySelector('.container');
    if (!container) return;
    
    // Add menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    container.appendChild(menuToggle);
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <nav>
            <a href="/">Home</a>
            <a href="/maat/">MAAT</a>
            <a href="/scopecam/">ScopeCam</a>
        </nav>
    `;
    document.body.appendChild(mobileMenu);
    
    // Toggle menu
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!header.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });
});