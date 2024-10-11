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
function mostrarClientes() {
    var offcanvasElement = document.getElementById("offcanvasClientes");
    var offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    offcanvas.show();
}

function mostrarPedidos() {
    var offcanvasElement = document.getElementById("offcanvasRight");
    var offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    offcanvas.show();
}


function mostrarRegistrarCliente() {
    var offcanvasElement = document.getElementById("offcanvasRegistrarCliente");
    var offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    offcanvas.show();
}

function mostrarEliminarPedido() {
    var offcanvasElement = document.getElementById("offcanvasEliminarPedido");
    var offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    offcanvas.show();
}

function mostrarEliminarCliente() {
    var offcanvasElement = document.getElementById("offcanvasEliminarCliente");
    var offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    offcanvas.show();
}
/* ------- Función para escuchar el mensaje ------- */
window.addEventListener("message", function (event) {
    if (event.data === "mostrarClientes") {
        mostrarClientes();
    }
    if (event.data === "mostrarPedidos") {
        mostrarPedidos();
    }
    if (event.data === "mostrarRegistrarCliente") {
        mostrarRegistrarCliente();
    }
    if (event.data === "mostrarEliminarPedido") {
        mostrarEliminarPedido();
    }
    if (event.data === "mostrarEliminarCliente") {
        mostrarEliminarCliente();
    }
    /* En caso de haber más offcanvas condicionar aquí*/
});
