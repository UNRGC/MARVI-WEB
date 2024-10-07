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
