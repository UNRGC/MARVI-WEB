document.addEventListener("DOMContentLoaded", () => {
    const rowMain = document.querySelector(".row.main");
    const recuperarBtn = document.getElementById("recuperarBtn");
    const cancelarBtn = document.getElementById("cancelarBtn");
    const fondo = document.getElementById("fondo");

    recuperarBtn.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            rowMain.style.transform = "translateX(-100vw)";
        } else {
            rowMain.style.transform = "translateX(-50vw)";
            fondo.style.opacity = "0";
        }
    });

    cancelarBtn.addEventListener("click", () => {
        rowMain.style.transform = "translateX(0)";
        fondo.style.opacity = "1";
    });
});

function mostrarContrasena(id) {
    var input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

function validarCorreo() {
    var correo = document.getElementById("correo").value;
    var correoC = document.getElementById("correoC").value;
    var btn = document.getElementById("enviarBtn");

    if (correo === correoC) {
        btn.classList.remove("disabled");
    } else {
        btn.classList.add("disabled");
    }
}
