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
});
