document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.mobile-swiper').forEach(swiper => {
    const folder = swiper.getAttribute('data-folder');
    const count = parseInt(swiper.getAttribute('data-count'));
    // Animate scroll right and back on load
    setTimeout(() => {
      if (swiper.scrollWidth > swiper.clientWidth) {
        swiper.scrollTo({ left: 60, behavior: 'smooth' });
        setTimeout(() => {
          swiper.scrollTo({ left: 0, behavior: 'smooth' });
        }, 900);
      }
    }, 600);
    for (let i = 1; i <= count; i++) {
      // Thumbnail
      const img = document.createElement('img');
      img.src = `${folder}/photo${i}-thumb.webp`;
      img.alt = `Image ${i}`;
      img.loading = 'lazy';
      img.addEventListener('load', function() {
        if (img.naturalHeight > img.naturalWidth) {
          img.classList.add('portrait-thumb');
        } else {
          img.classList.add('landscape-thumb');
        }
      });
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