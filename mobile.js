document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.mobile-swiper').forEach(swiper => {
    const folder = swiper.getAttribute('data-folder');
    const count = parseInt(swiper.getAttribute('data-count'));
    // Add scroll indicator
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5l8 7-8 7"/></svg>';
    swiper.appendChild(indicator);
    // Hide indicator when scrolled to end
    function updateIndicator() {
      if (swiper.scrollWidth - swiper.scrollLeft - swiper.clientWidth < 8) {
        indicator.classList.add('hide');
      } else {
        indicator.classList.remove('hide');
      }
    }
    swiper.addEventListener('scroll', updateIndicator);
    window.addEventListener('resize', updateIndicator);
    setTimeout(updateIndicator, 100); // Initial state
    for (let i = 1; i <= count; i++) {
      // Thumbnail
      const img = document.createElement('img');
      img.src = `${folder}/photo${i}-thumb.webp`;
      img.alt = `Image ${i}`;
      img.loading = 'lazy';
      img.addEventListener('click', function() {
        openMobileModal(folder, i, img.alt, img.src);
      });
      img.onerror = function() {
        img.remove();
      };
      swiper.appendChild(img);
    }
  });

  // Modal logic
  const modal = document.getElementById('mobileImageModal');
  const modalImg = document.getElementById('mobileModalImg');
  const modalClose = document.querySelector('.mobile-modal-close');
  const modalImgWrapper = document.createElement('div');
  modalImgWrapper.className = 'modal-img-wrapper';
  modalImg.parentNode.insertBefore(modalImgWrapper, modalImg);
  modalImgWrapper.appendChild(modalImg);
  let modalSpinner, modalBlur;
  function openMobileModal(folder, i, alt, blurSrc) {
    // Remove previous spinner/blur
    if (modalSpinner) modalSpinner.remove();
    if (modalBlur) modalBlur.remove();
    // Add spinner
    modalSpinner = document.createElement('div');
    modalSpinner.className = 'img-spinner';
    modalImgWrapper.appendChild(modalSpinner);
    // Add blurred placeholder
    modalBlur = document.createElement('img');
    modalBlur.className = 'img-blur-placeholder';
    modalBlur.src = blurSrc;
    modalImgWrapper.appendChild(modalBlur);
    // Load full image
    modalImg.style.opacity = '0';
    modalImg.src = `${folder}/photo${i}.webp`;
    modalImg.alt = alt;
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    modalImg.onload = function() {
      if (modalSpinner) modalSpinner.remove();
      if (modalBlur) modalBlur.remove();
      modalImg.style.opacity = '1';
    };
  }
  function closeMobileModal() {
    modal.classList.remove('show');
    modalImg.src = '';
    document.body.classList.remove('modal-open');
    if (modalSpinner) modalSpinner.remove();
    if (modalBlur) modalBlur.remove();
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