function toggleMenu() {
    const menu = document.getElementById("nav-menu");
    if (menu) 
    {
        menu.classList.toggle("show");
    }
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) 
    {
    el.scrollIntoView({ behavior: "smooth" });
    }
}

function initPropertyCarousels() {
    const carousels = document.querySelectorAll(".property-image[data-images]");

    carousels.forEach((carousel) => {
    const imagesAttr = carousel.getAttribute("data-images");
    if (!imagesAttr) return;

    const images = imagesAttr.split(",").map((s) => s.trim());
    if (images.length === 0) return;

    const imgElement = carousel.querySelector(".carousel-image");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");

    if (!imgElement || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    imgElement.src = images[currentIndex];

    function showImage(index) 
    {
        currentIndex = (index + images.length) % images.length;
        imgElement.src = images[currentIndex];
    }

    prevBtn.addEventListener("click", () => 
    {
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => 
    {
        showImage(currentIndex + 1);
    });
    });
}

function initSectionToggles() {
    const buttons = document.querySelectorAll(".filter-pill");
    const sections = {
    campos: document.getElementById("campos"),
    casas: document.getElementById("casas"),
    hoteles: document.getElementById("hoteles"),
    galpones: document.getElementById("galpones"),
    };

  // Estado inicial: todo oculto y sin botones activos
    Object.values(sections).forEach((sec) => {
    if (sec) {
        sec.style.display = "none";
        sec.classList.remove("active");
    }
    });

    buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        if (!target) return;

        const section = sections[target];
        if (!section) return;

        const isActive = section.classList.contains("active");

        if (isActive) {
        // Si YA estaba activa, la cierro
        section.classList.remove("active");
        section.style.display = "none";
        btn.classList.remove("active");
        } else {
        // Si estaba cerrada, la abro (sin tocar las otras)
        section.classList.add("active");
        section.style.display = "block";
        btn.classList.add("active");

        // Solo scrolleo si no tiene clase no-scroll
        if (!btn.classList.contains("no-scroll")) {
            section.scrollIntoView({ behavior: "smooth" });
        }
        }
    });
    });
}


// MODAL DE DETALLES - Función genérica
function openPropertyDetailsFromCard(card) {
    const modal = document.getElementById("detailsModal");
    const title = card.dataset.title;
    const location = card.dataset.location;
    const price = card.dataset.price;
    const description = card.dataset.description;
    const detailsText = card.dataset.detailsText || "Detalles";
    const images = card.dataset.images.split(",").map(s => s.trim());

    let html = `
    <div class="modal-layout">
        <div class="modal-top">
        <div class="modal-left">
            <h2>${title}</h2>
            <p><strong>Ubicación:</strong> ${location}</p>
            <p><strong>Precio:</strong> ${price}</p>
            <p>${description}</p>
        </div>
        <div class="modal-right">
            <p>${detailsText}</p>
        </div>
        </div>

        <div class="modal-bottom">
        <div class="modal-gallery">
    `;

    images.forEach((img, index) => {
    html += `<img src="${img}" alt="${title}" class="gallery-img" data-index="${index}">`;
    });

    html += `
        </div>
        </div>
    </div>

    <!-- LIGHTBOX -->
    <div id="lightbox" class="lightbox">
        <img id="lightboxImage" src="" alt="">
    </div>
    `;

    document.getElementById("modalBody").innerHTML = html;

  // Event listeners para el lightbox
    const galleryImages = document.querySelectorAll(".gallery-img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");

    galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
        lightboxImage.src = img.src;
        lightbox.style.display = "flex";
    });
    });

    lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
    });

    modal.style.display = "block";
}



// INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("detailsModal");
    const closeBtn = document.querySelector(".close");

    if (closeBtn) {
    closeBtn.onclick = () => {
        modal.style.display = "none";
    };
    }

    window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
    };

  // Abrir modal al hacer clic en "Ver más detalles"
    document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-details")) {
        const card = e.target.closest(".property-card");
        openPropertyDetailsFromCard(card);
    }
    });

    initPropertyCarousels();
    initSectionToggles();
});
