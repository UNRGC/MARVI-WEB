/* global alertMessage */
const container = document.querySelector("html");

const login = document.getElementById("loginForm");
const recovery = document.getElementById("recoveryForm");
const user = document.getElementById("user");
const password = document.getElementById("password");
const email = document.getElementById("email");
const email2 = document.getElementById("email2");
const buttons = document.querySelectorAll("button");

function changePage(page) {
    const image = document.getElementById("img");
    const copy = document.querySelector("footer");

    if (page === "login") {
        recovery.reset();
        container.scrollLeft = 0;
        image.style.opacity = 1;
        user.disabled = false;
        password.disabled = false;
        buttons[0].disabled = false;
        buttons[1].disabled = false;
        email.disabled = true;
        email2.disabled = true;
        buttons[2].disabled = true;
        copy.style.color = "var(--color-primario)";
        copy.style.background = "none";
    } else {
        login.reset();
        container.scrollLeft = container.scrollWidth;
        image.style.opacity = 0;
        email.disabled = false;
        email2.disabled = false;
        user.disabled = true;
        password.disabled = true;
        buttons[0].disabled = true;
        buttons[1].disabled = true;
        copy.style.color = "var(--color-secundario)";
        copy.style.background = "rgba(0, 0, 0, 0.2)";
    }
}

function viewPassword() {
    const input = document.getElementById("password");
    if (input.type === "password") {
        input.type = "text";
        buttons[0].innerHTML = "<i class='bi bi-eye-slash'></i>";
    } else {
        input.type = "password";
        buttons[0].innerHTML = "<i class='bi bi-eye'></i>";
    }
}

function validateEmail() {
    if (email.value === email2.value && email.value !== "") {
        buttons[2].disabled = false;
    } else {
        buttons[2].disabled = true;
    }
}

function authUsuario(u) {
    const usuario = async () => {
        const response = await fetch(`https://api-sandbox-f3ei.onrender.com/users/${u}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        sessionStorage.setItem("usuario", JSON.stringify(data));
    };

    usuario();
}

login.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailAuth = user.value;
    const passwordAuth = password.value;

    alertMessage("¡Validando información!", "Validando las credenciales espere un poco...", "info", false, false);

    const response = await fetch("https://api-sandbox-f3ei.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailAuth, password: passwordAuth }),
    });
    const data = await response.json();
    if (data.access_token) {
        authUsuario(emailAuth);
        sessionStorage.setItem("token", data.access_token);
        alertMessage("¡Inicio de sesión exitoso!", "Has iniciado sesión correctamente, abriendo el sistema...", "success", 2000, false).then((res) => {
            if (res) {
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 200);
            }
        });
    } else {
        alertMessage("¡Error al iniciar sesión!", `Descripción: ${data.message}.`, "error", false, true);
    }
});

recovery.addEventListener("submit", (e) => {
    e.preventDefault();
    alertMessage("¡Correo enviado!", "Se ha enviado un correo de recuperación. Vuelve a iniciar sesión cuando hayas recuperado tu contraseña, recuerda revisar tu bandeja de spam.", "success", 3000, true).then((res) => {
        if (res) {
            setTimeout(() => {
                changePage("login");
            }, 200);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("token")) window.location.href = "dashboard.html";
    changePage("login");
});
