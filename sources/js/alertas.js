/* global Swal */

/* Mensaje sencillo con aceptación y temporizador opcional */
function alertMessage(titulo, mensaje, icono, tiempo, btn) {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: icono,
            timer: tiempo,
            showConfirmButton: btn,
            timerProgressBar: true,
            confirmButtonText: "Aceptar",
        })
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/* Mensaje de confirmación con aceptación y cancelación */
function alertConfirm(titulo, mensaje, icono) {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: icono,
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        })
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/* Toast de notificación con temporizador */
function alertToast(titulo, mensaje, icono, tiempo) {
    return new Promise((resolve) => {
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: tiempo,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });
        Toast.fire({
            title: titulo,
            text: mensaje,
            icon: icono,
        }).then(() => {
            resolve(true);
        });
    });
}
