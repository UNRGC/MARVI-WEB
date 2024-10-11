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
        eliminarRegistro();
    }
    if (event.data === "mostrarEliminarCliente") {
        eliminarRegistro();
    }
    if (event.data === "salir") {
        salir();
    }
    /* En caso de haber más offcanvas condicionar aquí*/
});

/* ------- Funciones para crear alertas ------- */
function eliminarRegistro() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto.",
        icon: "warning",
        iconColor: "#dd5746",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: "success",
                iconColor: "#4caf50",
                title: "Registro eliminado con éxito.",
            });
        }
    });
}

function salir() {
    Swal.fire({
        title: "¿Quieres cerrar sesión?",
        text: "Estas a punto de salir del sistema.",
        icon: "question",
        iconColor: "#dd5746",
        showCancelButton: true,
        confirmButtonText: "Si, salir",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
                didClose: () => {
                    window.location.href = "login.html";
                },
            });
            Toast.fire({
                icon: "info",
                iconColor: "#4caf50",
                title: "Saliendo del sistema...",
            });
        }
    });
}
