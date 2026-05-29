const toggle = document.querySelector('.menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.querySelector('.overlay');

function closeMenu() {
    if (!sidebar) return;
    sidebar.classList.remove('is-open');
    overlay?.classList.remove('is-visible');
    toggle?.setAttribute('aria-expanded', 'false');
}

if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
        const open = sidebar.classList.toggle('is-open');
        overlay?.classList.toggle('is-visible', open);
        toggle.setAttribute('aria-expanded', open);
    });
}

overlay?.addEventListener('click', closeMenu);
