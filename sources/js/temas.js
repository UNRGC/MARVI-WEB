const localModoOscuro = localStorage.getItem("modoOscuro");

function modoOscuro(activo) {
    if (activo == "true" || activo === true) {
        document.documentElement.style.setProperty("--fondo", "var(--fondo-oscuro)");
        document.documentElement.style.setProperty("--fondo-contenido", "var(--fondo-contenido-oscuro)");
        document.documentElement.style.setProperty("--borde", "var(--borde-oscuro)");
        document.documentElement.style.setProperty("--hover-borde", "var(--hover-borde-oscuro)");
        document.documentElement.style.setProperty("--texto", "var(--texto-oscuro)");
        document.documentElement.style.setProperty("--placeholder", "var(--placeholder-oscuro)");
        document.documentElement.style.setProperty("--fondo-recovery", "var(--fondo-contenido-oscuro)");
    } else {
        document.documentElement.style.setProperty("--fondo", "var(--fondo-claro)");
        document.documentElement.style.setProperty("--fondo-contenido", "var(--fondo-contenido-claro)");
        document.documentElement.style.setProperty("--borde", "var(--borde-claro)");
        document.documentElement.style.setProperty("--hover-borde", "var(--hover-borde-claro)");
        document.documentElement.style.setProperty("--texto", "var(--texto-claro)");
        document.documentElement.style.setProperty("--placeholder", "var(--placeholder-claro)");
        document.documentElement.style.setProperty("--fondo-recovery", "var(--fondo-img)");
    }
    localStorage.setItem("modoOscuro", activo);
}

// Función para convertir un color hexadecimal a rgba
function hexToRgba(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Agrega un listener para recibir el mensaje y recargar la página
window.addEventListener("message", (event) => {
    if (event.data === "oscuro") {
        modoOscuro(true);
    }
    if (event.data === "claro") {
        modoOscuro(false);
    }
});

// Carga los colores guardados en el localStorage
document.addEventListener("DOMContentLoaded", () => {
    modoOscuro(localModoOscuro);
    document.documentElement.style.display = "block";
    document.querySelector("body").classList.add("visible");
});
