function toggleMenu() {
    const menu = document.getElementById("nav-menu");
    if (menu) {
    menu.classList.toggle("show");
    }
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    }
}

// ----- CARRUSEL GENÉRICO PARA TODAS LAS PROPIEDADES -----

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

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;
        imgElement.src = images[currentIndex];
    }

    prevBtn.addEventListener("click", () => {
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
        showImage(currentIndex + 1);
    });
    });
}

// ----- MOSTRAR / OCULTAR SECCIONES POR BOTÓN -----

function initSectionToggles() {
    const buttons = document.querySelectorAll(".filter-pill");
    const sections = {
    casas: document.getElementById("casas"),
    lotes: document.getElementById("lotes"),
    x1: document.getElementById("x1"),
    x2: document.getElementById("x2")
    };

  let activeSection = null; // id de la sección actualmente filtrada

    function showAllSections() {
    Object.values(sections).forEach((sec) => {
        if (sec) sec.style.display = "";
    });
    }

    function showOnly(sectionId) {
    Object.entries(sections).forEach(([id, sec]) => {
        if (!sec) return;
        sec.style.display = id === sectionId ? "" : "none";
    });
    }

    buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        if (!target) return;

      // Si clickeo el mismo botón activo -> muestro todas las secciones
        if (activeSection === target) {
        activeSection = null;
        buttons.forEach((b) => b.classList.remove("active"));
        showAllSections();
        return;
    }

      // Activar una nueva sección
        activeSection = target;
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        showOnly(target);

    const sec = sections[target];
    if (sec) {
        sec.scrollIntoView({ behavior: "smooth" });
    }
    });
    });

  // Al inicio: todas visibles
    showAllSections();
}

// Ejecutar al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    initPropertyCarousels();
    initSectionToggles();
});
