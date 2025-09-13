// File: main.js (Versi Lengkap dan Final)

document.addEventListener("DOMContentLoaded", function() {
     
    // Fungsi untuk memuat komponen (header/footer)
    const loadComponent = (url, placeholderId) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(placeholderId).innerHTML = data;
                
                if (placeholderId === 'header-placeholder') {
                    setActiveNavLink();
                    initializeStickyHeader();
                    initializeMobileMenu();
                }
            })
            .catch(error => console.error('Error loading component:', error));
    };

    // Fungsi untuk menandai link navigasi yang aktif
    const setActiveNavLink = () => {
        const currentPage = window.location.pathname.split("/").pop();
        const navLinks = document.querySelectorAll('#main-header .nav-links a');

        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    };

    // =================================================================
    // KUMPULAN SEMUA FUNGSI INISIALISASI
    // =================================================================

    // --- Fungsi untuk STICKY HEADER ---
    const initializeStickyHeader = () => {
        const header = document.getElementById('main-header');
        const logoImg = document.getElementById('logo-img');
        if (!header || !logoImg) return;

        const logoPutih = '/assets/images/logo/Logo-putih kolahbanyu.png';
        const logoHijau = '/assets/images/logo/logo warna kolah banyu.png';

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
                logoImg.src = logoHijau;
            } else {
                header.classList.remove('scrolled');
                logoImg.src = logoPutih;
            }
        });
    };
    

    // --- Fungsi untuk MENU HAMBURGER ---
    const initializeMobileMenu = () => {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMenuBtn = document.getElementById('close-menu-btn');
        if (hamburgerBtn && mobileMenu && closeMenuBtn) {
            hamburgerBtn.addEventListener('click', () => mobileMenu.classList.add('menu-open'));
            closeMenuBtn.addEventListener('click', () => mobileMenu.classList.remove('menu-open'));
        }
    };

    // --- Fungsi untuk TAB di Halaman PROFIL ---
    const initializeTabs = () => {
        const tabsContainer = document.querySelector('.tabs');
        if (!tabsContainer) return;

        const tabLinks = document.querySelectorAll('.tab-link');
        const tabContents = document.querySelectorAll('.tab-content');
        tabLinks.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-tab');
                const targetContent = document.getElementById(targetId);
                tabLinks.forEach(link => link.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                tab.classList.add('active');
                if (targetContent) targetContent.classList.add('active');
            });
        });
    };

    // --- Fungsi untuk KONTROL AGENDA ---
    const initializeAgendaControls = () => {
        const agendaContainer = document.querySelector('.agenda-container');
        if (!agendaContainer) return;

        const prevMonthBtn = document.getElementById('prev-month-btn');
        const nextMonthBtn = document.getElementById('next-month-btn');
        const todayBtn = document.getElementById('today-btn');
        const monthDisplayText = document.getElementById('month-display-text');
        const viewBtns = document.querySelectorAll('.view-btn');

        let currentDate = new Date();
        const renderCalendar = () => {
            const options = { year: 'numeric', month: 'long' };
            monthDisplayText.textContent = currentDate.toLocaleDateString('id-ID', options);
        };

        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
        todayBtn.addEventListener('click', () => {
            currentDate = new Date();
            renderCalendar();
        });
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        renderCalendar();
    };

    // --- Fungsi untuk POP-UP VIDEO di Halaman PROFIL ---
    const initializeProfileVideos = () => {
        const videoCards = document.querySelectorAll('.video-card');
        const lightboxOverlay = document.getElementById('lightbox-overlay');
        if (!videoCards.length || !lightboxOverlay) return;

        const lightboxClose = document.getElementById('lightbox-close');
        const videoContainer = document.getElementById('lightbox-video-container');

        videoCards.forEach(card => {
            card.addEventListener('click', () => {
                const youtubeId = card.dataset.youtubeId;
                if (!youtubeId) return;

                videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
                lightboxOverlay.classList.add('active');
            });
        });

        const closeLightbox = () => {
            lightboxOverlay.classList.remove('active');
            videoContainer.innerHTML = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) closeLightbox();
        });
    };

    // =================================================================
    // EKSEKUSI SEMUA FUNGSI
    // =================================================================
    
    // Muat komponen utama
    loadComponent('/template/header.html', 'header-placeholder');
    loadComponent('/template/footer.html', 'footer-placeholder');

    // Aktifkan fungsi-fungsi yang berjalan di semua halaman
    const animatedElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(element => observer.observe(element));

    // Aktifkan fungsi-fungsi yang hanya berjalan di halaman tertentu
    initializeTabs();
    initializeAgendaControls();
    initializeProfileVideos();
});