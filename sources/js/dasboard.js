const iframe = document.querySelector("iframe");
var paginaActiva = "inicio";

function cargarPagina(pagina) {
    if (paginaActiva != pagina) {
        iframe.src = "../html/" + pagina + ".html";
        document.getElementById(paginaActiva).classList.remove("activo");
        document.getElementById(pagina).classList.add("activo");
        paginaActiva = pagina;
    }
}

/* ------- Funciones para mostrar el offcanvas ------- */
function mostrarOffcanvas() {
    var offcanvasElement = document.getElementById("offcanvasClientes");
    var offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    offcanvas.show();
}

/* ------- Función para escuchar el mensaje ------- */
window.addEventListener("message", function (event) {
    if (event.data === "mostrarOffcanvas") {
        mostrarOffcanvas();
    }
    /* En caso de haber más offcanvas condicionar aquí*/
});
