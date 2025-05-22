document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.mobile-swiper').forEach(swiper => {
    const folder = swiper.getAttribute('data-folder');
    const count = parseInt(swiper.getAttribute('data-count'));
    for (let i = 1; i <= count; i++) {
      const img = document.createElement('img');
      img.src = `${folder}/photo${i}.webp`;
      img.alt = `Image ${i}`;
      img.loading = 'lazy';
      img.addEventListener('click', function() {
        openMobileModal(img.src, img.alt);
      });
      img.onload = function() {
        swiper.appendChild(img);
      };
    }
  });

  // Modal logic
  const modal = document.getElementById('mobileImageModal');
  const modalImg = document.getElementById('mobileModalImg');
  const modalClose = document.querySelector('.mobile-modal-close');
  function openMobileModal(src, alt) {
    modalImg.src = src;
    modalImg.alt = alt;
    modal.classList.add('show');
    document.body.classList.add('modal-open');
  }
  function closeMobileModal() {
    modal.classList.remove('show');
    modalImg.src = '';
    document.body.classList.remove('modal-open');
  }
  modalClose.addEventListener('click', closeMobileModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeMobileModal();
  });

  // Scroll to top button logic
  const scrollBtn = document.getElementById('scrollToTopBtn');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}); 