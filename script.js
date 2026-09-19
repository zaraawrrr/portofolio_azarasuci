    document.addEventListener('DOMContentLoaded', () => {
    /* =========================================================
        1. SCROLL REVEAL
    ========================================================= */
    const revealItems = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
        }, { threshold: 0.12 });

        revealItems.forEach(item => revealObserver.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add('is-visible'));
    }

    /* =========================================================
        2. DARK MODE
    ========================================================= */
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('zarawr-theme');

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    function updateThemeIcon() {
        if (!themeToggle) return;

        const dark = document.documentElement.getAttribute('data-theme') === 'dark';
        themeToggle.innerHTML = dark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

        themeToggle.setAttribute(
        'aria-label',
        dark ? 'Aktifkan light mode' : 'Aktifkan dark mode'
        );
    }

    updateThemeIcon();

    themeToggle?.addEventListener('click', () => {
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';

        if (dark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('zarawr-theme', 'light');
        } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('zarawr-theme', 'dark');
        }

        updateThemeIcon();
    });

    /* =========================================================
        3. PROJECT FILTER
    ========================================================= */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const projectCount = document.getElementById('projectCount');
    const emptyProjects = document.getElementById('emptyProjects');

    function filterProjects(filter) {
        let visible = 0;

        projectItems.forEach(item => {
        const category = item.dataset.category;
        const show = filter === 'all' || category === filter;

        item.classList.toggle('is-hidden', !show);

        if (show) visible++;
        });

        if (projectCount) {
        projectCount.textContent = String(visible).padStart(2, '0');
        }

        if (emptyProjects) {
        emptyProjects.style.display = visible ? 'none' : 'block';
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });

        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');

        filterProjects(filter);
        });
    });

    /* =========================================================
        4. PROJECT / CERTIFICATE MODAL
    ========================================================= */
    const overlay = document.getElementById('modalOverlay');
    const modalBox = document.getElementById('modalBox');

    const projectData = {
        'death-data': {
        category: 'DATA ANALYST',
        title: 'Analisis Data Penyebab Kematian di Indonesia 2004–2021',
        description:
            'Proyek analisis data yang mengeksplorasi dataset penyebab kematian di Indonesia pada periode 2004–2021. Fokusnya adalah proses pengolahan data, eksplorasi pola, visualisasi, dan penyusunan insight dari data.',
        image: './assets/projects/analisis-kematian-indonesia.jpg',
        tools: 'Google Colab · Kaggle',
        output: 'Dashboard + Analysis',
        type: 'Data Analytics',
        links: [
            ['Colab', 'https://colab.research.google.com/'],
            ['Kaggle', 'https://www.kaggle.com/'],
            ['PDF Presentasi', './assets/projects/analisis-kematian-indonesia.pdf']
        ]
        },

        'influencer-study': {
        category: 'DATA SCIENCE',
        title: 'Debunking a Marketing Myth',
        description:
            'Study case untuk menguji klaim apakah mega-influencers dengan jutaan followers benar-benar memiliki engagement rate yang lebih rendah. Proyek ini menekankan pengolahan data, perbandingan kelompok, dan penyampaian hasil analisis secara terstruktur.',
        image: '',
        tools: 'Data Analysis · Statistics',
        output: 'Study Case',
        type: 'Data Science',
        links: [
            ['Notebook', '#'],
            ['PDF Presentasi', './assets/projects/debunking-marketing-myth.pdf']
        ]
        },

        'uiux-figma': {
        category: 'UI/UX · FIGMA',
        title: 'UI/UX Project — Figma',
        description:
            'Proyek perancangan antarmuka yang dapat menampilkan proses dari ide dan struktur informasi sampai wireframe dan prototype interaktif menggunakan Figma.',
        image: './assets/projects/uiux-figma.jpg',
        tools: 'Figma',
        output: 'Interactive Prototype',
        type: 'UI/UX Design',
        links: [
            ['Figma Prototype', '#'],
            ['PDF Presentasi', './assets/projects/uiux-figma.pdf']
        ]
        },

        'uiux-canva': {
        category: 'UI/UX · CANVA',
        title: 'UI/UX & Visual Design — Canva',
        description:
            'Eksplorasi desain interface dan visual menggunakan Canva dengan fokus pada layout, hierarki informasi, dan konsistensi visual.',
        image: './assets/projects/uiux-canva.jpg',
        tools: 'Canva',
        output: 'Visual Design',
        type: 'UI/UX Design',
        links: [
            ['Canva', '#'],
            ['PDF Presentasi', './assets/projects/uiux-canva.pdf']
        ]
        },

        'siakad': {
        category: 'WEB DEVELOPMENT',
        title: 'SIAKAD',
        description:
            'Aplikasi web akademik yang menjadi latihan pengembangan interface dan alur pengguna untuk kebutuhan sistem informasi akademik.',
        image: './assets/projects/project-siakad.jpg',
        tools: 'HTML · CSS · JavaScript',
        output: 'Web App',
        type: 'Web Development',
        links: [
            ['Live Demo', 'https://siakad-nine.vercel.app/'],
            ['GitHub', '#'],
            ['PDF Presentasi', './assets/projects/siakad.pdf']
        ]
        },

        'kantin': {
        category: 'WEB DEVELOPMENT',
        title: 'Kantin Digital',
        description:
            'Aplikasi pengelolaan transaksi kantin dengan alur pemesanan, perhitungan subtotal dan pajak, serta pengelolaan data. Proyek ini dikembangkan sebagai latihan membangun aplikasi yang memiliki alur input dan proses yang jelas.',
        image: '',
        tools: 'Python · CustomTkinter',
        output: 'Desktop App',
        type: 'Application',
        links: [
            ['Demo', '#'],
            ['GitHub', '#'],
            ['PDF Presentasi', './assets/projects/kantin-digital.pdf']
        ]
        },

        'kalkulator': {
        category: 'WEB DEVELOPMENT',
        title: 'Kalkulator Volume Bangun Ruang',
        description:
            'Aplikasi kalkulator sederhana untuk menghitung volume beberapa bangun ruang dengan interface yang dibuat agar mudah digunakan.',
        image: '',
        tools: 'Python · Flask · HTML/CSS',
        output: 'Web App',
        type: 'Web Development',
        links: [
            ['Demo', '#'],
            ['GitHub', '#'],
            ['PDF Presentasi', './assets/projects/kalkulator.pdf']
        ]
        }
    };

    function buildLink(label, url) {
        const a = document.createElement('a');
        a.href = url || '#';
        a.innerHTML = `${label} <i class="fa-solid fa-arrow-up-right-from-square"></i>`;

        if (!url || url === '#') {
        a.classList.add('disabled-link');
        a.setAttribute('aria-disabled', 'true');
        a.addEventListener('click', event => event.preventDefault());
        } else if (url.startsWith('http')) {
        a.target = '_blank';
        a.rel = 'noopener';
        }

        return a;
    }

    function openProjectModal(projectId) {
        const data = projectData[projectId];
        if (!data || !modalBox || !overlay) return;

        modalBox.innerHTML = '';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.type = 'button';
        closeBtn.setAttribute('aria-label', 'Tutup');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', closeModal);

        modalBox.appendChild(closeBtn);

        if (data.image) {
        const img = document.createElement('img');
        img.className = 'modal-project-image';
        img.src = data.image;
        img.alt = data.title;
        img.onerror = () => img.remove();
        modalBox.appendChild(img);
        }

        const content = document.createElement('div');
        content.className = 'modal-content';

        const category = document.createElement('span');
        category.className = 'modal-category';
        category.textContent = data.category;

        const title = document.createElement('h3');
        title.textContent = data.title;

        const desc = document.createElement('p');
        desc.textContent = data.description;

        const infoGrid = document.createElement('div');
        infoGrid.className = 'modal-info-grid';

        [
        ['TOOLS', data.tools],
        ['OUTPUT', data.output],
        ['TYPE', data.type]
        ].forEach(([label, value]) => {
        const box = document.createElement('div');
        box.className = 'modal-info-box';
        box.innerHTML = `<small>${label}</small><strong>${value}</strong>`;
        infoGrid.appendChild(box);
        });

        const actions = document.createElement('div');
        actions.className = 'modal-actions';

        data.links.forEach(([label, url]) => {
        actions.appendChild(buildLink(label, url));
        });

        content.append(category, title, desc, infoGrid, actions);
        modalBox.appendChild(content);

        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function openCertModal(card) {
        modalBox.innerHTML = '';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.type = 'button';
        closeBtn.setAttribute('aria-label', 'Tutup');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', closeModal);

        const content = document.createElement('div');
        content.className = 'cert-modal-content';

        content.innerHTML = `
        <span class="modal-category">LEARNING JOURNEY</span>
        <h3>${card.dataset.certTitle || 'Certificate'}</h3>
        <p>${card.dataset.certDescription || 'Detail pembelajaran belum ditambahkan.'}</p>
        `;

        modalBox.append(closeBtn, content);
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeModal() {
        overlay?.classList.remove('active');
        overlay?.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.project-item').forEach(card => {
        card.addEventListener('click', event => {
        if (event.target.closest('.proj-links a')) return;
        openProjectModal(card.dataset.project);
        });

        card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openProjectModal(card.dataset.project);
        }
        });

        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
    });

    document.querySelectorAll('.receipt').forEach(card => {
        card.addEventListener('click', event => {
        if (event.target.closest('a')) return;
        openCertModal(card);
        });

        card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openCertModal(card);
        }
        });
    });

    overlay?.addEventListener('click', event => {
        if (event.target === overlay) closeModal();
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeModal();
    });

    /* =========================================================
        5. CERTIFICATION DRAG TO SCROLL
    ========================================================= */
    const certStrip = document.querySelector('.cert-strip');

    if (certStrip) {
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;
        let dragged = false;

        certStrip.addEventListener('mousedown', event => {
        isDown = true;
        dragged = false;
        certStrip.classList.add('cursor-grabbing');
        startX = event.pageX - certStrip.offsetLeft;
        scrollLeft = certStrip.scrollLeft;
        });

        ['mouseleave', 'mouseup'].forEach(evt => {
        certStrip.addEventListener(evt, () => {
            isDown = false;
            certStrip.classList.remove('cursor-grabbing');
        });
        });

        certStrip.addEventListener('mousemove', event => {
        if (!isDown) return;

        event.preventDefault();

        const x = event.pageX - certStrip.offsetLeft;
        const walk = x - startX;

        if (Math.abs(walk) > 5) dragged = true;

        certStrip.scrollLeft = scrollLeft - walk;
        });

        certStrip.addEventListener('click', event => {
        if (dragged) {
            event.stopPropagation();
            event.preventDefault();
        }
        }, true);
    }

    /* =========================================================
        6. DISABLE EMPTY PROJECT LINKS
        ========================================================= */
    document.querySelectorAll('.proj-links a[data-link]').forEach(link => {
        const target = link.dataset.link;

        if (!target || target === '#') {
        link.classList.add('disabled-link');
        link.addEventListener('click', event => event.preventDefault());
        } else {
        link.href = target;

        if (target.startsWith('http')) {
            link.target = '_blank';
            link.rel = 'noopener';
        }
        }
    });

    /* =========================================================
        7. SIMPLE 3D TILT
    ========================================================= */
    const tiltItems = document.querySelectorAll('[data-tilt]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion && window.innerWidth > 800) {
        tiltItems.forEach(item => {
        item.addEventListener('mousemove', event => {
            const rect = item.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateX = ((y / rect.height) - .5) * -4;
            const rotateY = ((x / rect.width) - .5) * 5;

            item.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(0deg)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
        });
        }
        document.querySelectorAll('.proj-card, .receipt').forEach((el) => {
        el.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        openModal(el);
        });

        el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(el);
        }
        });
    });


    /* ---------- Certificate gallery scroll reveal ---------- */
    const certCards = document.querySelectorAll('.cert-image-card');

    if (certCards.length) {
        const certObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        }
        );

        certCards.forEach((card) => {
        certObserver.observe(card);
        });
    }
    /* =========================================================
    ORGANIZATION PHOTO REVEAL
    ========================================================= */

    const orgPhotos = document.querySelectorAll('.org-photo-card');

    if (orgPhotos.length) {

        const orgPhotoObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add('is-visible');

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -60px 0px'
            }
        );


        orgPhotos.forEach((photo) => {
            orgPhotoObserver.observe(photo);
        });
    }
    });

