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

// Mantiene la sección de Experiencias idéntica en todas las páginas.
// Así una página antigua no puede mostrar un menú desactualizado.
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

    const currentFile = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');

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
    allLink.href = 'experiencias.html?v=20260903-2';
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
