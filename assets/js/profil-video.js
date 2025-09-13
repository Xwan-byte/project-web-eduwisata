document.addEventListener('DOMContentLoaded', () => {

    /**
     * FUNGSI 4: VIDEO LIGHTBOX (POP-UP)
     */
    const videoCards = document.querySelectorAll('.video-card');
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxClose = document.getElementById('lightbox-close');
    const videoContainer = document.getElementById('lightbox-video-container');

    if (videoCards.length > 0 && lightboxOverlay) {
        videoCards.forEach(card => {
            card.addEventListener('click', () => {
                const youtubeId = card.dataset.youtubeId;
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', 'true');
                
                videoContainer.innerHTML = '';
                videoContainer.appendChild(iframe);
                lightboxOverlay.classList.add('active');
            });
        });

        const closeLightbox = () => {
            lightboxOverlay.classList.remove('active');
            videoContainer.innerHTML = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                closeLightbox();
            }
        });
    }
});