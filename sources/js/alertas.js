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

function camposIncompletos() {
    Swal.fire({
        title: "¡Error!",
        text: "Debes llenar todos los campos.",
        icon: "error",
        iconColor: "#dd5746",
        confirmButtonText: "Aceptar",
    });
}
/* ------- Funciones para crear alertas ------- */
