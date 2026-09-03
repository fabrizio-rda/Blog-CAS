const toggle = document.querySelector('.menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.querySelector('.overlay');

// Carga la capa visual más reciente en todas las páginas, incluso las antiguas.
(function loadVisualRefresh() {
    const currentRefresh = [...document.querySelectorAll('link[rel="stylesheet"]')]
        .find(link => link.href.includes('css/updates.css?v=20260903-3'));
    if (currentRefresh) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/updates.css?v=20260903-3';
    document.head.appendChild(link);
})();

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

const currentFile = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');

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
        {
            name: 'Marzo',
            items: [
                ['psicologia.html', 'Proyecto de psicología'],
                ['rifa.html', 'Compra de rifa'],
                ['planeta.html', 'Hora del planeta']
            ]
        },
        {
            name: 'Abril',
            items: [
                ['aprendiendo.html', 'Aprendiendo diferente'],
                ['reciclaje.html', 'Reciclaje'],
                ['brigadista.html', 'Recolección de reciclaje como brigadista'],
                ['bicicleta.html', 'Bicicleta']
            ]
        },
        {
            name: 'Mayo',
            items: [
                ['mayo1.html', 'Sensibilización sobre una mascota un amigo'],
                ['mayo2.html', 'Ecolegio'],
                ['mayo3.html', 'Organización y transporte de leña'],
                ['mayo4.html', 'Donaciones al albergue Las patitas']
            ]
        },
        {
            name: 'Junio',
            items: [
                ['junio1.html', 'Experiencia 1'],
                ['junio2.html', 'Experiencia 2'],
                ['junio3.html', 'Experiencia 3'],
                ['junio4.html', 'Experiencia 4']
            ]
        },
        {
            name: 'Julio',
            items: [
                ['julio1.html', 'Partido de exhibición'],
                ['julio2.html', 'Rifa solidaria CAS'],
                ['julio3.html', 'Donación de gift cards']
            ]
        },
        {
            name: 'Agosto',
            items: [
                ['agosto1.html', 'Manos Solidarias'],
                ['agosto2.html', 'Donación al albergue'],
                ['agosto3.html', 'Elaboración de una bufanda']
            ]
        }
    ];

    const allExperienceFiles = months.flatMap(month => month.items.map(item => item[0]));
    const isExperiencePage = currentFile === 'experiencias.html' || allExperienceFiles.includes(currentFile);

    const allItem = document.createElement('li');
    const allLink = document.createElement('a');
    allLink.href = 'experiencias.html?v=20260903-3';
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

    if (isExperiencePage) experienceDetails.open = true;
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
        'ponle_corazon.html': ['Imagenes/ponle corazon.png', 'Proyecto Ponle Corazón'],
        'una_mascota.html': ['Imagenes/perros.png', 'Proyecto Una mascota, un amigo']
    };

    if (currentFile === 'perfil.html') document.body.classList.add('page-profile');
    if (currentFile === 'cas_ib.html') document.body.classList.add('page-cas');

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
