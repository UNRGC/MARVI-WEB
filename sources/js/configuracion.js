function modoOscuroEvent(checked) {
    modoOscuro(checked);
    if (checked === true) window.parent.postMessage("oscuro", "*");
    else window.parent.postMessage("claro", "*");
}

document.addEventListener("DOMContentLoaded", function () {
    const sModoOscuro = localStorage.getItem("modoOscuro");

    if (sModoOscuro === "true") {
        document.getElementById("mOscuro").checked = true;
    }

    modoOscuro(sModoOscuro);

    const sFoto = localStorage.getItem("foto");
    if (sFoto) {
        document.getElementById("img-perfil").src = sFoto;
    }
});

function mostrarContrasena(id) {
    var input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

function editar(activo) {
    const foto = document.getElementById("foto");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const contrasena = document.getElementById("contrasena");
    const eye = document.getElementById("eye");
    const cancelar = document.getElementById("cancelar");
    const guardar = document.getElementById("guardar");
    const modificar = document.getElementById("modificar");

    if (activo) {
        foto.disabled = false;
        nombre.disabled = false;
        correo.disabled = false;
        contrasena.disabled = false;
        eye.disabled = false;
        cancelar.classList.remove("d-none");
        guardar.classList.remove("d-none");
        modificar.classList.add("d-none");
    } else {
        foto.disabled = true;
        nombre.disabled = true;
        correo.disabled = true;
        contrasena.disabled = true;
        contrasena.type = "password";
        eye.disabled = true;
        cancelar.classList.add("d-none");
        guardar.classList.add("d-none");
        document.getElementById("modificar").classList.remove("d-none");
        document.getElementById("img-perfil").src = localStorage.getItem("foto");
    }
}

function cambiarFoto(ruta) {
    const foto = document.getElementById("img");
    const rutaCompleta = `../img/perfil/${ruta}.jpg`;
    foto.value = rutaCompleta;
    document.getElementById("img-perfil").src = rutaCompleta;
}

window.addEventListener("message", function (event) {
    if (event.data === "cambiosAceptados") {
        editar(false);
        this.localStorage.setItem("foto", document.getElementById("img").value);
        window.parent.postMessage("salirDelSistema", "*");
    }
});
