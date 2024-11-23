/* global alertConfirm */
/* global alertToast */
/* global alertMessage */

const searchBar = document.getElementById("searchBar");
const searchBarInput = document.getElementById("searchBarInput");
const iframe = document.getElementById("iframe");
let paginaActiva = "inicio";

document.addEventListener("DOMContentLoaded", () => {
    if (!sessionStorage.getItem("token")) {
        window.location.href = "login.html";
    } else {
        const user = sessionStorage.getItem("usuario");
        try {
            document.getElementById("fotoPerfilAct").src = localStorage.getItem("foto");
        } catch (error) {
            console.log(error);
        }
        document.getElementById("nombreUsuarioAct").textContent = JSON.parse(user).firstName;
        document.getElementById("apellidosUsuario").textContent = `${JSON.parse(user).lastName} ${JSON.parse(user).motherLastName}`;
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

    const totales = document.getElementsByName("total");
    for (let i = 0; i < totales.length; i++) {
        total += parseFloat(totales[i].innerText.replace("$", ""));
    }
    totalNum.innerText = total;
}

function eliminarServicio(btn) {
    let contador = serviciosNum.innerText;
    let total = 0;

    alertConfirm("¿Estás seguro?", "¿Deseas eliminar el servicio?", "warning").then((result) => {
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

/* ------- Formulario de usuarios ------- */
const formUsuarios = document.getElementById("formUsuarios");
const editUsuario = document.getElementById("editUsuarios");
const usuarioInput = document.getElementById("usuario");
const nombreInput = document.getElementById("nombreUsuario");
const apellidoInput = document.getElementById("apellidoPaternoU");
const apellidoMInput = document.getElementById("apellidoMaternoU");
const correoInput = document.getElementById("correoUsuario");
const telInput = document.getElementById("telUsuario");
const rolInput = document.getElementById("rolUsuario");
const guardarUsuarioBtn = document.getElementById("guardarUsuario");

function desactivarUsuarios() {
    editUsuario.disabled = true;
    usuarioInput.disabled = true;
    nombreInput.disabled = true;
    apellidoInput.disabled = true;
    apellidoMInput.disabled = true;
    correoInput.disabled = true;
    telInput.disabled = true;
    rolInput.disabled = true;
    guardarUsuarioBtn.disabled = true;
}

function activarUsuarios() {
    editUsuario.disabled = false;
    usuarioInput.disabled = false;
    nombreInput.disabled = false;
    apellidoInput.disabled = false;
    apellidoMInput.disabled = false;
    correoInput.disabled = false;
    telInput.disabled = false;
    rolInput.disabled = false;
}

function limpiarUsuarios() {
    usuarioInput.value = "";
    nombreInput.value = "";
    apellidoInput.value = "";
    apellidoMInput.value = "";
    correoInput.value = "";
    telInput.value = "";
    rolInput.value = "admin";
}

function llenarUsuarios(usuario, nombre, apellido, apellidoM, correo, tel, rol) {
    usuarioInput.value = usuario;
    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    apellidoMInput.value = apellidoM;
    correoInput.value = correo;
    telInput.value = tel;
    rolInput.value = rol;
}

function editUsuarios() {
    nombreInput.disabled = false;
    apellidoInput.disabled = false;
    apellidoMInput.disabled = false;
    correoInput.disabled = false;
    telInput.disabled = false;
    rolInput.disabled = false;
    editUsuario.disabled = true;
}

function cancelarUsuarios() {
    limpiarUsuarios();
    activarUsuarios();
    editUsuario.disabled = true;
}

formUsuarios.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
        firstName: nombreInput.value,
        lastName: apellidoInput.value,
        motherLastName: apellidoMInput.value,
        email: correoInput.value,
        password: "123456",
        phone: telInput.value,
        role: rolInput.value,
    };

    alertConfirm("¿Estás seguro?", "¿Deseas guardar los cambios?", "warning").then(async (result) => {
        if (result.isConfirmed) {
            const res = await crearUsuario(data);
            if (res._id) {
                const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasUsuarios"));
                offcanvas.hide();
                limpiarUsuarios();
                alertToast("El usuario fue creado correctamente", false, "success", 2000).then(() => {
                    window.parent.postMessage("verificar", "*");
                });
            } else alertToast("No se pudo crear el usuario", res.error, "error", 2000);
        }
    });
});

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
    try {
        const data = JSON.parse(event.data);
        if (data._id) {
            document.getElementById("nombreUsuario").textContent = data.user.firstName;
            document.getElementById("apellidosUsuario").textContent = `${data.user.lastName} ${data.user.motherLastName}`;
        } else if (data.eliminarUsuario) {
            const usuario = async () => {
                const response = await fetch(`https://api-sandbox-f3ei.onrender.com/users/${data.eliminarUsuario}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                });
                const res = response.status;
                if (res === 200) {
                    alertToast("El usuario ha sido eliminado", false, "success", 2000).then(() => {
                        iframe.contentWindow.postMessage("verificar", "*");
                    });
                } else alertToast("No se pudo eliminar el usuario", false, "error", 2000);
            };

            alertConfirm("¿Estás seguro?", "No podrás revertir esto.", "warning").then((result) => {
                if (result.isConfirmed) {
                    if (data.eliminarUsuario === JSON.parse(sessionStorage.getItem("usuario"))._id) {
                        alertToast("No puedes eliminar un usuario activo", false, "error", 2000);
                    } else usuario();
                }
            });
        } else if (data.eliminarUsuarios) {
            const usuarios = async (id) => {
                const response = await fetch(`https://api-sandbox-f3ei.onrender.com/users/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data.eliminarUsuarios),
                });
                const res = response.status;
                if (res === 200) {
                    alertToast("Los usuarios han sido eliminados", false, "success", 2000).then(() => {
                        iframe.contentWindow.postMessage("verificar", "*");
                    });
                } else alertToast("No se pudieron eliminar los usuarios", false, "error", 2000);
            };

            alertConfirm("¿Estás seguro?", "No podrás revertir esto.", "warning").then((result) => {
                if (result.isConfirmed) {
                    data.eliminarUsuarios.forEach((id) => {
                        if (id === JSON.parse(sessionStorage.getItem("usuario"))._id) {
                            alertToast("No puedes eliminar un usuario activo", false, "error", 2000);
                        } else usuarios(id);
                    });
                }
            });
        } else if (data.firstName) {
            alertConfirm("¿Estás seguro?", "¿Deseas guardar los cambios?", "warning").then(async (result) => {
                if (result.isConfirmed) {
                    const res = await actualizarUsuario(data);
                    if (res._id) {
                        alertToast("Los cambios han sido guardados", false, "success", 2000).then(() => {
                            location.reload();
                        });
                        sessionStorage.setItem("usuario", JSON.stringify(res));
                    } else alertToast("No se pudieron guardar los cambios", false, "error", 2000);
                }
            });
        }
    } catch (error) {
        console.log(error);
    }

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
            alertConfirm("¿Estás seguro?", "No podrás revertir esto.", "warning").then((result) => {
                if (result.isConfirmed) {
                    alertToast("El registro ha sido eliminado", false, "success", 2000).then(() => {
                        location.reload();
                    });
                }
            });
            break;
        case "cancelarPedido":
            alertConfirm("¿Estás seguro?", "¿Deseas cancelar el pedido?", "warning").then((result) => {
                if (result.isConfirmed) {
                    alertToast("El pedido ha sido cancelado", false, "success", 2000).then(() => {
                        location.reload();
                    });
                }
            });
            break;
        case "salir":
            alertConfirm("¿Estás seguro?", "¿Deseas cerrar sesión?", "warning").then((result) => {
                if (result.isConfirmed) {
                    alertToast("Finalizando sesión", false, "success", 2000).then(() => {
                        setTimeout(() => {
                            sessionStorage.clear();
                            window.location.href = "login.html";
                        }, 200);
                    });
                }
            });
            break;
        case "guardarRegistro":
            alertConfirm("¿Estás seguro?", "¿Deseas guardar los cambios?", "warning").then((result) => {
                if (result.isConfirmed) {
                    alertToast("Los cambios han sido guardados", false, "success", 2000).then(() => {
                        location.reload();
                    });
                }
            });
            break;
        case "recargar":
            location.reload();
            break;
        default:
            if (event.data._id) {
                llenarUsuarios(event.data.email, event.data.firstName, event.data.lastName, event.data.motherLastName, event.data.email, event.data.phone, event.data.role);
                desactivarUsuarios();
                mostrarOffcanvas("offcanvasUsuarios");
            }
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

function buscarValor(v) {
    iframe.contentWindow.postMessage(JSON.stringify({ buscar: v }), "*");
}
