// Función para oscurecer el color
function colorOscuro(color, cantidad) {
    const r = Math.max(0, parseInt(color.slice(1, 3), 16) - cantidad);
    const g = Math.max(0, parseInt(color.slice(3, 5), 16) - cantidad);
    const b = Math.max(0, parseInt(color.slice(5, 7), 16) - cantidad);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// Función para aclarar el color
function colorClaro(color, cantidad) {
    const r = Math.min(255, parseInt(color.slice(1, 3), 16) + cantidad);
    const g = Math.min(255, parseInt(color.slice(3, 5), 16) + cantidad);
    const b = Math.min(255, parseInt(color.slice(5, 7), 16) + cantidad);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// Función para ajustar el color
function ajustarColor(color) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? colorOscuro(color, 20) : colorClaro(color, 35);
}

// Función para obtener el color de contraste
function colorContraste(color) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#FFFFFF";
}

// Carga los colores guardados en el localStorage
document.addEventListener("DOMContentLoaded", () => {
    const sColorPrimario = localStorage.getItem("colorPrimario");
    const sColorSecundario = localStorage.getItem("colorSecundario");
    const sModoOscuro = localStorage.getItem("modoOscuro");

    if (sColorPrimario) {
        document.documentElement.style.setProperty("--color-primario", sColorPrimario);
        document.documentElement.style.setProperty("--hover-color-p", ajustarColor(sColorPrimario));
        document.documentElement.style.setProperty("--texto-primario", colorContraste(sColorPrimario));
    } else localStorage.setItem("colorPrimario", "#dd5746");

    if (sColorSecundario) {
        document.documentElement.style.setProperty("--color-secundario", sColorSecundario);
        document.documentElement.style.setProperty("--hover-color-s", ajustarColor(sColorSecundario));
        document.documentElement.style.setProperty("--texto-secundario", sColorPrimario);
    } else localStorage.setItem("colorSecundario", "#ffe1c0");

    modoOscuro(sModoOscuro);
    document.documentElement.style.display = "block";
});

// Guarda los colores en el localStorage
function guardarColores(colorPrimario, colorSecundario) {
    localStorage.setItem("colorPrimario", colorPrimario);
    localStorage.setItem("colorSecundario", colorSecundario);

    // Enviar mensaje a la página contenedora
    if (window.parent && window.parent !== window) {
        window.parent.postMessage("recargar", "*");
    }
}

// Aplica los colores en tiempo real
function aplicarColores(colorPrimario, colorSecundario) {
    document.documentElement.style.setProperty("--color-primario", colorPrimario);
    document.documentElement.style.setProperty("--hover-color-p", ajustarColor(colorPrimario));
    document.documentElement.style.setProperty("--texto-primario", colorContraste(colorPrimario));
    document.documentElement.style.setProperty("--color-secundario", colorSecundario);
    document.documentElement.style.setProperty("--hover-color-s", ajustarColor(colorSecundario));
    document.documentElement.style.setProperty("--texto-secundario", colorPrimario);
}
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
    if (event.data === "recargar") {
        location.reload();
    }
    if (event.data === "oscuro") {
        modoOscuro(true);
    }
    if (event.data === "claro") {
        modoOscuro(false);
    }
});
