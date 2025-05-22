document.addEventListener("DOMContentLoaded", function () {
    // Navbar Scroll Effect
    window.addEventListener("scroll", function () {
        document.querySelector(".navbar").classList.toggle("scrolled", window.scrollY > 50);
    });

    // Portfolio Image Click Event - Opens Gallery
    document.querySelectorAll(".portfolio-item").forEach(item => {
        item.addEventListener("click", function () {
            const folderPath = this.getAttribute("data-folder");
            openGallery(folderPath);
        });
    });

    function openGallery(folderPath) {
        const modal = document.getElementById("imageModal");
        const gallery = document.getElementById("modal-gallery");
        if (!modal || !gallery) {
            console.error("Modal or gallery element not found!");
            return;
        }
        gallery.innerHTML = ""; // Clear previous images
        modal.style.display = "flex";
        setTimeout(() => {
            modal.classList.add("show");
        }, 10);
        document.body.classList.add("modal-open");

        // Get the count from the clicked portfolio item
        const item = document.querySelector(`.portfolio-item[data-folder="${folderPath}"]`);
        const count = item ? parseInt(item.getAttribute("data-count")) : 1;

        let loadedImages = [];
        let loaded = 0;

        for (let i = 1; i <= count; i++) {
            let img = document.createElement("img");
            img.src = `${folderPath}/photo${i}.webp`;
            img.alt = `Image ${i}`;
            img.classList.add("modal-img");
            img.loading = "lazy";
            img.onload = function () {
                if (img.naturalHeight > img.naturalWidth) {
                    img.classList.add("portrait");
                } else {
                    img.classList.add("landscape");
                }
                loadedImages[i - 1] = img;
                loaded++;
                if (loaded === count) {
                    // All images loaded, reorder and append
                    const landscape = loadedImages.filter(img => img && img.classList.contains('landscape'));
                    const portrait = loadedImages.filter(img => img && img.classList.contains('portrait'));
                    gallery.innerHTML = '';
                    landscape.forEach(img => gallery.appendChild(img));
                    portrait.forEach(img => gallery.appendChild(img));
                }
            };
            img.onerror = function () {
                loaded++;
                if (loaded === count) {
                    // All images attempted, append what loaded
                    const landscape = loadedImages.filter(img => img && img.classList.contains('landscape'));
                    const portrait = loadedImages.filter(img => img && img.classList.contains('portrait'));
                    gallery.innerHTML = '';
                    landscape.forEach(img => gallery.appendChild(img));
                    portrait.forEach(img => gallery.appendChild(img));
                }
            };
        }
    }

    function closeModal() {
        const modal = document.getElementById("imageModal");
        if (modal) {
            modal.classList.remove("show"); // Trigger fade-out animation
            setTimeout(() => {
                modal.style.display = "none"; // Hide modal after animation ends
                document.body.classList.remove("modal-open");
            }, 400); // Match CSS transition duration
        }
    }

    // Close Modal on Button Click
    document.querySelector(".close").addEventListener("click", closeModal);

    // Close Modal if Clicked Outside of Images
    document.getElementById("imageModal").addEventListener("click", function (event) {
        if (event.target === this) {
            closeModal();
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                const navbarHeight = document.querySelector(".navbar").offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            } else {
                console.warn(`Target section not found for: ${this.getAttribute("href")}`);
            }
        });
    });

    // Advanced JS-based justified layout for modal gallery
    // This code assumes #modal-gallery uses display: grid with grid-template-columns: repeat(2, 1fr)
    (function() {
        const modalGallery = document.getElementById('modal-gallery');
        if (modalGallery) {
            modalGallery.style.display = 'grid';
            modalGallery.style.gridTemplateColumns = 'repeat(2, 1fr)';
            modalGallery.style.gap = '16px';
            // Listen for new images being added
            const observer = new MutationObserver(() => {
                Array.from(modalGallery.children).forEach(img => {
                    if (img.classList.contains('landscape')) {
                        img.style.gridColumn = 'span 2';
                    } else {
                        img.style.gridColumn = 'span 1';
                    }
                });
            });
            observer.observe(modalGallery, { childList: true });
        }
    })();
});

// ✅ Service Worker Registration - Fixed Syntax
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
    });
}
