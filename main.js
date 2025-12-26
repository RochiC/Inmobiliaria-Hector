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
    galpones: document.getElementById("galpones")
    };

    let activeSection = null;

    function showAllSections() 
    {
    Object.values(sections).forEach((sec) => 
    {
        if (sec) 
        {
        sec.style.display = "none";
        sec.classList.remove("active");
        }
    });
    }

    function showOnly(sectionId) {
    Object.entries(sections).forEach(([id, sec]) => {
        if (!sec) return;
        if (id === sectionId) {
        sec.style.display = "";
        sec.classList.add("active");
        } 
        else 
        {
        sec.style.display = "none";
        sec.classList.remove("active");
        }
    });
    }

    buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        if (!target) return;

        if (activeSection === target) {
        activeSection = null;
        buttons.forEach((b) => b.classList.remove("active"));
        showAllSections();
        return;
        }

        activeSection = target;
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        showOnly(target);

        if (!btn.classList.contains("no-scroll")) {
        const sec = sections[target];
        if (sec) {
            sec.scrollIntoView({ behavior: "smooth" });
        }
        }
    });
    });

    showAllSections();
}

// MODAL DE DETALLES - Función genérica
function openPropertyDetailsFromCard(card) {
    const modal = document.getElementById("detailsModal");
    
    const title = card.dataset.title;
    const location = card.dataset.location;
    const price = card.dataset.price;
    const description = card.dataset.description;
    const images = card.dataset.images.split(",").map(s => s.trim());
    const details = JSON.parse(card.dataset.details);

    let html = `
    <h2>${title}</h2>
    <p><strong>Ubicación:</strong> ${location}</p>
    <p><strong>Precio:</strong> ${price}</p>
    <p>${description}</p>
    
    <h3>Galería de imágenes</h3>
    <div class="modal-gallery">
    `;

    images.forEach((img) => {
    html += `<img src="${img}" alt="${title}" style="width: 100%; margin: 10px 0; border-radius: 4px;">`;
    });

    html += `</div><h3>Detalles</h3><ul>`;

    Object.entries(details).forEach(([key, value]) => {
    html += `<li><strong>${key}:</strong> ${value}</li>`;
    });

    html += `</ul>`;

    document.getElementById("modalBody").innerHTML = html;
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
