/* global modoOscuro */
/* global localModoOscuro */
const switchTema = document.getElementById("switchTema");
const usuarioActual = sessionStorage.getItem("usuario");

const usuario = document.getElementById("usuario");
const nombre = document.getElementById("nombre");
const apellidoP = document.getElementById("apellidoPaterno");
const apellidoM = document.getElementById("apellidoMaterno");
const correo = document.getElementById("correo");
const tel = document.getElementById("tel");
const rol = document.getElementById("rol");
const password = document.getElementById("password");
const eye = document.getElementById("eye");

const perfilBtn = document.getElementById("perfil");
const cancelarBtn = document.getElementById("cancelar");
const modificarBtn = document.getElementById("modificar");
const guardarBtn = document.getElementById("guardar");

const fotoPerfil = document.getElementById("fotoPerfil");

if (localModoOscuro === "true") {
    document.getElementById("switchTema").checked = true;
    modoOscuroEvent(true);
} else modoOscuroEvent(false);

function modoOscuroEvent(checked) {
    modoOscuro(checked);

    if (checked === true) {
        window.parent.postMessage("oscuro", "*");
        switchTema.parentElement.children[1].innerHTML = "<i class='bi bi-cloud-moon-fill'></i> Modo Oscuro";
    } else {
        window.parent.postMessage("claro", "*");
        switchTema.parentElement.children[1].innerHTML = "<i class='bi bi-cloud-sun-fill'></i> Modo Oscuro";
    }
}

function fade() {
    document.querySelector(".container-fluid").style.transition = "none";
    document.querySelector(".container-fluid").style.opacity = 0;
    setTimeout(() => {
        document.querySelector(".container-fluid").style.transition = "opacity 0.5s";
        document.querySelector(".container-fluid").style.opacity = 1;
    }, 50);
}

function viewPassword() {
    if (password.type === "password") {
        password.type = "text";
        eye.innerHTML = "<i class='bi bi-eye-slash'></i>";
    } else {
        password.type = "password";
        eye.innerHTML = "<i class='bi bi-eye'></i>";
    }
}

function llenarUsuario(u) {
    usuario.value = u.email;
    nombre.value = u.firstName;
    apellidoP.value = u.lastName;
    apellidoM.value = u.motherLastName;
    correo.value = u.email;
    tel.value = u.phone;
    rol.value = u.role;
    password.value = u.password;
}

llenarUsuario(JSON.parse(usuarioActual));

function modificarPerfil(b) {
    if (b === true) {
        perfilBtn.disabled = false;
        usuario.disabled = false;
        nombre.disabled = false;
        apellidoP.disabled = false;
        apellidoM.disabled = false;
        correo.disabled = false;
        tel.disabled = false;
        rol.disabled = false;
        password.disabled = false;
        password.value = "";
        eye.disabled = false;
        guardarBtn.disabled = false;
        modificarBtn.classList.add("d-none");
        cancelarBtn.classList.remove("d-none");
    } else {
        llenarUsuario(JSON.parse(usuarioActual));
        perfilBtn.disabled = true;
        usuario.disabled = true;
        nombre.disabled = true;
        apellidoP.disabled = true;
        apellidoM.disabled = true;
        correo.disabled = true;
        tel.disabled = true;
        rol.disabled = true;
        password.disabled = true;
        eye.disabled = true;
        guardarBtn.disabled = true;
        modificarBtn.classList.remove("d-none");
        cancelarBtn.classList.add("d-none");
        fotoPerfil.src = localStorage.getItem("foto");
    }
}

const formUsuario = document.getElementById("formUsuario").addEventListener("submit", (e) => {
    e.preventDefault();
    window.parent.postMessage(
        JSON.stringify({
            firstName: nombre.value,
            lastName: apellidoP.value,
            motherLastName: apellidoM.value,
            email: correo.value,
            password: password.value,
            phone: tel.value,
            role: rol.value,
        }),
        "*"
    );
});

function cambiarFoto(src) {
    const modal = bootstrap.Modal.getInstance(document.getElementById("fotosPerfil"));
    fotoPerfil.src = src;
    modal.hide();
}
