const searchBar = document.getElementById("searchBar");
const searchBarInput = document.getElementById("searchBarInput");
const iframe = document.getElementById("iframe");
let paginaActiva = "inicio";

document.addEventListener("DOMContentLoaded", () => {
    const sFoto = localStorage.getItem("foto");
    if (sFoto) {
        document.getElementById("img-perfil").src = sFoto;
    }
});

function cargarPagina(pagina) {
    switch (pagina) {
        case "pedidos":
            searchBar.classList.remove("visually-hidden");
            searchBarInput.placeholder = "Buscar en pedidos";
            break;
        case "clientes":
            searchBar.classList.remove("visually-hidden");
            searchBarInput.placeholder = "Buscar en clientes";
            break;
        case "servicios":
            searchBar.classList.remove("visually-hidden");
            searchBarInput.placeholder = "Buscar en servicios";
            break;
        case "compras":
            searchBar.classList.remove("visually-hidden");
            searchBarInput.placeholder = "Buscar en compras";
            break;
        case "usuarios":
            searchBar.classList.remove("visually-hidden");
            searchBarInput.placeholder = "Buscar en usuarios";
            break;
        default:
            searchBar.classList.add("visually-hidden");
            searchBarInput.placeholder = "";
            break;
    }

    if (paginaActiva !== pagina) {
        iframe.src = `../html/${pagina}.html`;
        document.getElementById(paginaActiva).classList.remove("activo");
        document.getElementById(pagina).classList.add("activo");
        paginaActiva = pagina;
    }
}

/* ------- Formulario de pedidos ------- */
const editButton = document.getElementById("editPedido");
const clienteInput = document.getElementById("cliente");
const clienteButton = document.getElementById("searchCliente");
const nuevoClienteButton = document.getElementById("nuevoCliente");
const servicioInput = document.getElementById("servicio");
const servicioButton = document.getElementById("searchServicio");
const serviciosContainer = document.getElementById("masServicios");
const pesajeInput = document.getElementById("pesaje");
const costoInput = document.getElementById("costo");
const servicioButtonAdd = document.getElementById("addServicio");
const detallesInput = document.getElementById("detalles");
const estadoInput = document.getElementById("estado");
const fechaInput = document.getElementById("fecha");
const serviciosNum = document.getElementById("serviciosNum");
const totalNum = document.getElementById("total");

function desactivarPedidos() {
    editButton.disabled = true;
    clienteInput.disabled = true;
    clienteButton.disabled = true;
    nuevoClienteButton.disabled = true;
    servicioInput.disabled = true;
    servicioButton.disabled = true;
    pesajeInput.disabled = true;
    costoInput.disabled = true;
    servicioButtonAdd.disabled = true;
    detallesInput.disabled = true;
    estadoInput.disabled = true;
    fechaInput.disabled = true;
}

function activarPedidos() {
    editButton.disabled = false;
    clienteInput.disabled = false;
    clienteButton.disabled = false;
    nuevoClienteButton.disabled = false;
    servicioInput.disabled = false;
    servicioButton.disabled = false;
    pesajeInput.disabled = false;
    costoInput.disabled = false;
    servicioButtonAdd.disabled = false;
    detallesInput.disabled = false;
    estadoInput.disabled = false;
    fechaInput.disabled = false;
}

function limpiarPedidos() {
    clienteInput.value = "";
    servicioInput.value = "";
    serviciosContainer.innerHTML = "";
    pesajeInput.value = "";
    costoInput.value = "";
    detallesInput.value = "";
    estadoInput.value = 1;
    calcularFecha();
    serviciosNum.innerText = 0;
    totalNum.innerText = 0;
}

function llenarPedidos(cliente, servicio, serviciosHTML, pesaje, costo, detalles, estado, fecha) {
    clienteInput.value = cliente;
    servicioInput.value = servicio;
    serviciosContainer.innerHTML = serviciosHTML;
    pesajeInput.value = pesaje;
    costoInput.value = costo;
    detallesInput.value = detalles;
    estadoInput.value = estado;
    fechaInput.value = fecha;
}

function editPedido() {
    detallesInput.disabled = false;
    estadoInput.disabled = false;
    fechaInput.disabled = false;
    editButton.disabled = true;
}

function cancelarPedido() {
    limpiarPedidos();
    activarPedidos();
    editButton.disabled = true;
}

function calcularFecha() {
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + 2);
    const dia = String(fechaActual.getDate()).padStart(2, "0");
    const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
    const anio = fechaActual.getFullYear();
    fechaInput.value = `${anio}-${mes}-${dia}`;
}

function agregarServicio() {
    let contador = serviciosNum.innerText;
    let total = 0;
    contador++;

    if (servicioInput.value === "" || pesajeInput.value === "" || costoInput.value === "") {
        camposIncompletos();
        return;
    }

    serviciosContainer.innerHTML += `
        <tr>
            <td>${contador}</td>
            <td>${servicioInput.value}</td>
            <td>${pesajeInput.value} Kg</td>
            <td name="total">$ ${costoInput.value}</td>
            <td class="text-center">
                <button type="button" class="btn search del" onclick="eliminarServicio(this)"><i class="bi bi-trash"></i></button>
            </td>
        </tr>
    `;
    servicioInput.value = "";
    pesajeInput.value = "";
    costoInput.value = "";

    serviciosNum.innerText = contador;

    let totales = document.getElementsByName("total");
    for (let i = 0; i < totales.length; i++) {
        total += parseFloat(totales[i].innerText.replace("$", ""));
    }
    totalNum.innerText = total;
}

function eliminarServicio(btn) {
    let contador = serviciosNum.innerText;
    let total = 0;

    swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto.",
        icon: "warning",
        iconColor: "#dd5746",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            btn.parentElement.parentElement.remove();

            contador--;
            serviciosNum.innerText = contador;

            const totales = document.getElementsByName("total");
            for (let i = 0; i < totales.length; i++) {
                total += parseFloat(totales[i].innerText.replace("$", ""));
            }
            totalNum.innerText = total;
        }
    });
}

function calcularCosto() {
    costoInput.value = (18 * pesajeInput.value).toFixed(2);
}
/* ------- Formulario de pedidos ------- */

/* ------- Función para mostrar el offcanvas ------- */
function mostrarOffcanvas(id) {
    const offcanvasElement = document.getElementById(id);
    const offcanvas = new bootstrap.Offcanvas(offcanvasElement);

    switch (id) {
        case "offcanvasPedidos":
            desactivarPedidos();
            editButton.disabled = false;
            break;
        case "offcanvasClientes":
            break;
        case "offcanvasServicios":
            break;
        case "offcanvasCompras":
            break;
        case "offcanvasUsuarios":
            break;
        default:
            break;
    }

    offcanvas.show();
}
/* ------- Función para mostrar el offcanvas ------- */

/* ------- Función para escuchar el mensaje ------- */
window.addEventListener("message", (event) => {
    switch (event.data) {
        case "mostrarPedidos":
            mostrarOffcanvas("offcanvasPedidos");
            break;
        case "mostrarClientes":
            mostrarOffcanvas("offcanvasClientes");
            break;
        case "mostrarServicios":
            mostrarOffcanvas("offcanvasServicios");
            break;
        case "mostrarCompras":
            mostrarOffcanvas("offcanvasCompras");
            break;
        case "mostrarUsuarios":
            mostrarOffcanvas("offcanvasUsuarios");
            break;
        case "mostrarEliminarPedido":
        case "mostrarEliminarCliente":
            eliminarRegistro();
            break;
        case "cancelarPedido":
            cancelarRegistro();
            break;
        case "salir":
            salir();
            break;
        case "guardarRegistro":
            guardarRegistro();
            break;
        case "salirDelSistema":
            salirDelSistema();
            break;
        case "recargar":
            location.reload();
            break;
        default:
            break;
    }
});

function limpiarNotify(id) {
    const mensaje = document.getElementById("msjN");
    const aviso = document.getElementById("aviso");

    id.style.display = "none";

    mensaje.classList.remove("visually-hidden");
    aviso.remove();
}
