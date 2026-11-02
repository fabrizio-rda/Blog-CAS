const toggle = document.querySelector('.menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.querySelector('.overlay');


function closeMenu() {
    if (!sidebar) return;
    sidebar.classList.remove('is-open');
    overlay?.classList.remove('is-visible');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-open');
}

if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
        const open = sidebar.classList.toggle('is-open');
        overlay?.classList.toggle('is-visible', open);
        toggle.setAttribute('aria-expanded', open);
        toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        document.body.classList.toggle('menu-open', open);
        if (open) { sidebar.inert = false; sidebar.querySelector('a, summary')?.focus(); }
    });
}

overlay?.addEventListener('click', closeMenu);

const currentFile = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');
if (currentFile === 'index.html') document.body.classList.add('page-home');
if (currentFile === 'experiencias.html') document.body.classList.add('page-experiences-index');
if (currentFile === 'proyectos.html') document.body.classList.add('page-projects-index');

// Mantiene la sección de Experiencias idéntica en todas las páginas.
(function syncExperiencesSidebar() {
    const nav = document.querySelector('.sidebar-nav');
    if (!nav) return;

    const experienceDetails = [...nav.querySelectorAll('details.nav-group')].find((details) => {
        const summary = details.querySelector(':scope > summary');
        return summary?.textContent.trim() === 'Experiencias';
    });

    if (!experienceDetails) return;

    const submenu = experienceDetails.querySelector(':scope > ul.sub-menu');
    if (!submenu) return;

    const months = [
        { name: 'Marzo', items: [
            ['psicologia.html', 'Proyecto de psicología'],
            ['rifa.html', 'Compra de rifa'],
            ['planeta.html', 'Hora del planeta']
        ]},
        { name: 'Abril', items: [
            ['aprendiendo.html', 'Aprendiendo diferente'],
            ['reciclaje.html', 'Reciclaje'],
            ['brigadista.html', 'Recolección de reciclaje como brigadista'],
            ['bicicleta.html', 'Bicicleta']
        ]},
        { name: 'Mayo', items: [
            ['mayo1.html', 'Sensibilización sobre una mascota un amigo'],
            ['mayo2.html', 'Ecolegio'],
            ['mayo3.html', 'Organización y transporte de leña'],
            ['mayo4.html', 'Donaciones al albergue Las patitas']
        ]},
        { name: 'Junio', items: [
            ['junio1.html', 'Participación en el kiosco CAS'],
            ['junio2.html', 'Concientización: Casual Day y partido'],
            ['junio3.html', 'Donación para la rifa Ponle Corazón'],
            ['junio4.html', 'Salida a la USIL']
        ]},
        { name: 'Julio', items: [
            ['julio1.html', 'Partido de exhibición'],
            ['julio2.html', 'Rifa solidaria CAS'],
            ['julio3.html', 'Donación de gift cards']
        ]},
        { name: 'Agosto', items: [
            ['agosto1.html', 'Manos Solidarias'],
            ['agosto2.html', 'Donación al albergue'],
            ['agosto3.html', 'Elaboración de una bufanda']
        ]}
    ];

    const allItem = document.createElement('li');
    const allLink = document.createElement('a');
    allLink.href = 'experiencias.html?v=20260903-7';
    allLink.textContent = 'Ver todas';
    if (currentFile === 'experiencias.html') allLink.classList.add('is-current');
    allItem.appendChild(allLink);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(allItem);

    months.forEach(month => {
        const li = document.createElement('li');
        const details = document.createElement('details');
        details.className = 'nav-group';

        const monthIsCurrent = month.items.some(([href]) => href === currentFile);
        if (monthIsCurrent) details.open = true;

        const summary = document.createElement('summary');
        summary.textContent = month.name;
        details.appendChild(summary);

        const ul = document.createElement('ul');
        ul.className = 'sub-menu';

        month.items.forEach(([href, label]) => {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.href = href;
            link.textContent = label;
            if (href === currentFile) link.classList.add('is-current');
            item.appendChild(link);
            ul.appendChild(item);
        });

        details.appendChild(ul);
        li.appendChild(details);
        fragment.appendChild(li);
    });

    submenu.replaceChildren(fragment);
})();

// Añade imágenes a las páginas individuales sin tocar la página "Ver todas".
(function enhancePageVisuals() {
    const experienceImages = {
        'psicologia.html': ['Imagenes/psicologia.png', 'Proyecto de psicología'],
        'rifa.html': ['Imagenes/sorteo.png', 'Rifa solidaria'],
        'planeta.html': ['Imagenes/hora del planeta.png', 'La Hora del Planeta'],
        'aprendiendo.html': ['Imagenes/aprendiendo}.jpg', 'Aprendiendo diferente'],
        'reciclaje.html': ['Imagenes/Reciclaje.png', 'Actividad de reciclaje'],
        'brigadista.html': ['Imagenes/brigadista.png', 'Recolección de reciclaje como brigadista'],
        'bicicleta.html': ['Imagenes/bicilceta.png', 'Actividad en bicicleta'],
        'mayo1.html': ['Imagenes/Mayo1.png', 'Sensibilización de Una mascota, un amigo'],
        'mayo2.html': ['Imagenes/Mayo2.png', 'Ecolegio'],
        'mayo3.html': ['Imagenes/Mayo3.jpeg', 'Organización y transporte de leña'],
        'mayo4.html': ['Imagenes/Mayo4.png', 'Donaciones al albergue']
    };

    const pendingExperiences = new Set([
        'junio1.html', 'junio2.html', 'junio3.html', 'junio4.html',
        'julio1.html', 'julio2.html', 'julio3.html',
        'agosto1.html', 'agosto2.html', 'agosto3.html'
    ]);

    const projectImages = {
        'una_mascota.html': ['Imagenes/perros.png', 'Proyecto Una mascota, un amigo']
    };

    if (currentFile === 'perfil.html') document.body.classList.add('page-profile');
    if (currentFile === 'cas_ib.html') document.body.classList.add('page-cas');
    if (currentFile === 'ponle_corazon.html') document.body.classList.add('page-project');

    const detailContent = document.querySelector('.detail-content');

    if (experienceImages[currentFile] && detailContent && !detailContent.querySelector('.detail-visual')) {
        document.body.classList.add('page-experience-detail');
        const [src, alt] = experienceImages[currentFile];
        const figure = document.createElement('figure');
        figure.className = 'detail-visual';
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.loading = 'eager';
        figure.appendChild(img);
        detailContent.prepend(figure);
    }

    if (pendingExperiences.has(currentFile) && detailContent) {
        document.body.classList.add('page-experience-detail');
        let placeholder = detailContent.querySelector(':scope > .showcase-placeholder');
        if (!placeholder) {
            placeholder = document.createElement('div');
            detailContent.prepend(placeholder);
        }
        placeholder.classList.add('detail-image-placeholder');
        placeholder.textContent = 'Fotografía de la experiencia · por añadir';
    }

    if (projectImages[currentFile] && detailContent && !detailContent.querySelector('.detail-visual')) {
        document.body.classList.add('page-project');
        const [src, alt] = projectImages[currentFile];
        const figure = document.createElement('figure');
        figure.className = 'detail-visual detail-visual--contain';
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.loading = 'eager';
        figure.appendChild(img);
        detailContent.prepend(figure);
    }
})();

// Mark the current route and reveal its parent groups in the scrolling rail.
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    const isCurrent = new URL(link.href).pathname.split('/').pop() === currentFile;
    link.classList.toggle('is-current', isCurrent);
    if (!isCurrent) return;
    link.setAttribute('aria-current', 'page');
    let parent = link.parentElement;
    while (parent && parent !== sidebar) {
        if (parent.tagName === 'DETAILS') parent.open = true;
        parent = parent.parentElement;
    }
});

const mobileMenu = window.matchMedia('(max-width: 760px)');
function syncMenuAccess() {
    const open = sidebar?.classList.contains('is-open');
    if (sidebar) sidebar.inert = mobileMenu.matches && !open;
    document.querySelector('.main-content')?.toggleAttribute('inert', mobileMenu.matches && open);
}
toggle?.addEventListener('click', syncMenuAccess);
overlay?.addEventListener('click', () => { syncMenuAccess(); toggle?.focus(); });
mobileMenu.addEventListener('change', () => { closeMenu(); syncMenuAccess(); });
syncMenuAccess();
document.addEventListener('keydown', event => {
    if (!mobileMenu.matches || !sidebar?.classList.contains('is-open')) return;
    if (event.key === 'Escape') {
        closeMenu(); syncMenuAccess(); toggle?.focus();
    }
    if (event.key !== 'Tab') return;
    const focusable = [toggle, ...sidebar.querySelectorAll('a, summary')]
        .filter(element => element && element.getClientRects().length);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
