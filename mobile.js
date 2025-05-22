document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.mobile-swiper').forEach(swiper => {
    const folder = swiper.getAttribute('data-folder');
    const count = parseInt(swiper.getAttribute('data-count'));
    for (let i = 1; i <= count; i++) {
      const img = document.createElement('img');
      img.src = `${folder}/photo${i}.webp`;
      img.alt = `Image ${i}`;
      img.loading = 'lazy';
      swiper.appendChild(img);
    }
  });
}); 