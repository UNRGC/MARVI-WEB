    const estados = document.getElementsByName("estado");
let ordenActual = "asc";
let filtroActual = "pd";

function orden() {
    let button = document.getElementById("orden");

    if (ordenActual === "asc") {
        button.innerHTML = "<i class='bi bi-sort-up'></i> Descendente";
        ordenActual = "desc";
    } else {
        button.innerHTML = "<i class='bi bi-sort-down-alt'></i> Ascendente";
        ordenActual = "asc";
    }
    ordenarTabla(filtroActual, ordenActual);
}

function filtro(f) {
    let button = document.getElementById("filtro");

    switch (f) {
        case "pd":
            button.innerHTML = "<i class='bi bi-filter'></i> Pedido";
            break;
        case "fh":
            button.innerHTML = "<i class='bi bi-filter'></i> Fecha";
            break;
        case "cl":
            button.innerHTML = "<i class='bi bi-filter'></i> Cliente";
            break;
        case "ps":
            button.innerHTML = "<i class='bi bi-filter'></i> Peso";
            break;
        case "cs":
            button.innerHTML = "<i class='bi bi-filter'></i> Costo";
            break;
        default:
            return;
    }
    filtroActual = f;
    ordenarTabla(filtroActual, ordenActual); // Ordenar por cliente de forma ascendente
}

function ordenarTabla(filtro, orden) {
    const tabla = document.querySelector("table tbody");
    const filas = Array.from(tabla.rows);

    function comparar(a, b) {
        let valorA, valorB;

        switch (filtro) {
            case "pd":
                valorA = parseInt(a.querySelector(".pedido").textContent.trim());
                valorB = parseInt(b.querySelector(".pedido").textContent.trim());
                break;
            case "cl":
                valorA = a.querySelector(".cliente").textContent.trim();
                valorB = b.querySelector(".cliente").textContent.trim();
                break;
            case "fh":
                valorA = convertirFecha(a.querySelector(".fecha").textContent.trim());
                valorB = convertirFecha(b.querySelector(".fecha").textContent.trim());
                break;
            case "ps":
                valorA = parseFloat(a.querySelector(".peso").textContent.trim());
                valorB = parseFloat(b.querySelector(".peso").textContent.trim());
                break;
            case "cs":
                valorA = parseFloat(a.querySelector(".costo").textContent.trim());
                valorB = parseFloat(b.querySelector(".costo").textContent.trim());
                break;
            default:
                return 0;
        }

        if (valorA < valorB) {
            return orden === "asc" ? -1 : 1;
        }
        if (valorA > valorB) {
            return orden === "asc" ? 1 : -1;
        }
        return 0;
    }

    function convertirFecha(fecha) {
        const [dia, mes, año] = fecha.split("/").map(Number);
        return new Date(año, mes - 1, dia);
    }

    filas.sort(comparar);

    // Reinsertar las filas ordenadas en el cuerpo de la tabla
    filas.forEach((fila) => tabla.appendChild(fila));
}

estados.forEach((estado) => {
    switch (estado.textContent) {
        case "En Proceso":
            estado.classList.add("en-proceso");
            break;
        case "Pagado":
            estado.classList.add("pagado");
            break;
        case "Entregado":
            estado.classList.add("entregado");
            break;
        case "Cancelado":
            estado.classList.add("cancelado");
            break;
        default:
            estado.classList.add("pagado");
            break;
    }
});

function mostrar(row) {
    const button = document.getElementById("eliminar");
    const checkboxes = document.querySelectorAll(".select-checkbox");
    const filas = document.getElementById("filasSelectNum");
    const filasTotales = document.getElementById("filasTotalesNum");

    if (Array.from(checkboxes).some((checkbox) => checkbox.checked)) {
        button.classList.remove("visually-hidden");
    } else {
        button.classList.add("visually-hidden");
    }

    filasTotales.textContent = checkboxes.length;
    filas.textContent = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;

    row.parentElement.parentElement.classList.toggle("table-active");
}
