// Script sederhana untuk smooth scroll
document.addEventListener('DOMContentLoaded', function() {
    // Cari tombol dengan ID 'view-packages-btn'
    const viewPackagesBtn = document.getElementById('view-packages-btn');

    // Jika tombolnya ada
    if (viewPackagesBtn) {
        // Tambahkan event listener untuk klik
        viewPackagesBtn.addEventListener('click', function(e) {
            // Mencegah perilaku default dari link (lompat langsung)
            e.preventDefault();

            // Cari section paket dengan ID 'packages'
            const packagesSection = document.getElementById('packages');
            
            // Jika sectionnya ada, scroll ke sana dengan animasi halus
            if (packagesSection) {
                packagesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});