const iframe = document.getElementById("iframe");
var paginaActiva = "inicio";

document.addEventListener("DOMContentLoaded", function () {
    const sFoto = localStorage.getItem("foto");
    if (sFoto) {
        document.getElementById("img-perfil").src = sFoto;
    }
});

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

function mostrarCompra() {
    var offcanvasElement = document.getElementById("offcanvasCompra");
    var offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    offcanvas.show();
}

function mostrarServicios() {
    var offcanvasElement = document.getElementById("offcanvasServicios");
    var offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    offcanvas.show();
}

function mostrarRegistrarUsuario() {
    var offcanvasElement = document.getElementById("offcanvasRegistrarUsuarios");
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
    if (event.data === "cancelarPedido") {
        cancelarRegistro();
    }
    if (event.data === "salir") {
        salir();
    }
    if (event.data === "guardarRegistro") {
        guardarRegistro();
    }
    if (event.data === "salirDelSistema") {
        salirDelSistema();
    }
    if (event.data === "mostrarCompra") {
        mostrarCompra();
    }
    if (event.data === "mostrarServicios") {
        mostrarServicios();
    }
    if (event.data === "mostrarRegistrarUsuario") {
        mostrarRegistrarUsuario();
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

function cancelarRegistro() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto.",
        icon: "warning",
        iconColor: "#dd5746",
        showCancelButton: true,
        confirmButtonText: "Sí, cancelar",
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
                title: "Registro actualizado con éxito.",
            });
        }
    });
}

function guardarRegistro() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto.",
        icon: "warning",
        iconColor: "#dd5746",
        showCancelButton: true,
        confirmButtonText: "Sí, Guardar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            iframe.contentWindow.postMessage("cambiosAceptados", "*");
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
                title: "Registro guardado con éxito.",
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
            salirDelSistema();
        }
    });
}

function salirDelSistema() {
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

function limpiarNotify(id) {
    const mensaje = document.getElementById("msjN");
    const aviso = document.getElementById("aviso");

    id.style.display = "none";

    mensaje.classList.remove("visually-hidden");
    aviso.remove();
}

function cancelarPedido() {
    const contenedor = document.getElementById("masServicios");
    const serviciosNum = document.getElementById("serviciosNum");

    document.getElementById("cliente").value = "";
    document.getElementById("servicio").value = "";
    document.getElementById("pesaje").value = "";
    document.getElementById("detalles").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("estado").value = 1;

    contenedor.innerHTML = ``;
    serviciosNum.innerText = 1;
}

function cancelarCliente() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellidoP").value = "";
    document.getElementById("apellidoM").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("telefono").value = "";
}

function agregarServicio() {
    const serviciosNum = document.getElementById("serviciosNum");
    const contenedor = document.getElementById("masServicios");
    var contador = serviciosNum.innerText;

    contenedor.innerHTML += `
        <div class="row align-items-end">
            <div class="col-3">
                <label for="servicioSl" class="form-label">Servicio adicional*</label>
                <button type="button" class="btn bell">Selección</button>
            </div>
            <div class="col text-center">
                <label for="servicio${contador}" class="form-label visually-hidden">Servicio</label>
                <button class="btn btn-link" type="button" onclick="eliminarServicio(this)"><i class="bi bi-dash-lg"></i> Eliminar servicio</button>
                <input type="text" class="form-control focus-ring" id="servicio${contador}" placeholder="Nombre o código del servicio" required />
            </div>
            <div class="col-3">
                <label for="pesaje${contador}" class="form-label">Pesaje</label>
                <div class="input-group flex-nowrap">
                    <input type="number" class="form-control focus-ring" id="pesaje${contador}" min="0" placeholder="0" required />
                    <span class="input-group-text" id="addon-wrapping">Kg</span>
                </div>
            </div>
        </div>
    `;

    contador++;
    serviciosNum.innerText = contador;
}

function eliminarServicio(btn) {
    const serviciosNum = document.getElementById("serviciosNum");
    var contador = serviciosNum.innerText;

    btn.parentElement.parentElement.remove();

    contador--;
    serviciosNum.innerText = contador;
}
