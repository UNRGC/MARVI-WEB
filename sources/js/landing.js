AOS.init();
const inicio = document.querySelector(".inicio");
const carrousel = document.getElementById("valores");

let position = 0;
let isDragging = false; // Nueva variable para detectar si se está arrastrando

window.addEventListener("scroll", () => {
    if (window.scrollY > 120) {
        inicio.style.opacity = 1;
    } else {
        inicio.style.opacity = 0;
    }
});

carrousel.addEventListener("mousedown", (event) => {
    position = event.clientX;
    isDragging = true;
    carrousel.style.cursor = "grabbing";
    event.preventDefault(); // Evita la selección de texto
});

carrousel.addEventListener("mousemove", (event) => {
    if (isDragging) {
        // Se verifica si se está arrastrando
        carrousel.scrollLeft -= event.clientX - position;
        position = event.clientX;
    }
});

carrousel.addEventListener("mouseup", () => {
    isDragging = false; // Se deja de arrastrar
    carrousel.style.cursor = "grab";
});

carrousel.addEventListener("mouseleave", () => {
    isDragging = false; // Se deja de arrastrar al salir del carrusel
    carrousel.style.cursor = "grab";
});
