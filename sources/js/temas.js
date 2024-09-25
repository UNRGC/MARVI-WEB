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
document.addEventListener("DOMContentLoaded", function () {
    const sColorPrimario = localStorage.getItem("colorPrimario");
    const sColorSecundario = localStorage.getItem("colorSecundario");

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

    document.documentElement.style.display = "block";
});

// Guarda los colores en el localStorage
function guardarColores(colorPrimario, colorSecundario) {
    localStorage.setItem("colorPrimario", colorPrimario);
    localStorage.setItem("colorSecundario", colorSecundario);
    document.documentElement.style.setProperty("--color-primario", colorPrimario);
    document.documentElement.style.setProperty("--hover-color-p", ajustarColor(colorPrimario));
    document.documentElement.style.setProperty("--texto-primario", colorContraste(colorPrimario));
    document.documentElement.style.setProperty("--color-secundario", colorSecundario);
    document.documentElement.style.setProperty("--hover-color-s", ajustarColor(colorSecundario));
    document.documentElement.style.setProperty("--texto-secundario", colorPrimario);

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

// Agrega un listener para recibir el mensaje y recargar la página
window.addEventListener("message", function (event) {
    if (event.data === "recargar") {
        location.reload();
    }
});
