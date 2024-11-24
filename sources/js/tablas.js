const ordenBtn = document.getElementById("orden");
const filtroBtn = document.getElementById("filtro");

const tabla = document.getElementById("tbody");

const eliminarBtn = document.getElementById("eliminar");
const filasNum = document.getElementById("filasSelectNum");
const filasTotalesNum = document.getElementById("filasTotalesNum");
filasTotalesNum.textContent = tabla.rows.length;

let ordenActual = "asc";
let filtroActual = "identificador";

function _orden() {
    if (ordenActual === "asc") {
        ordenBtn.innerHTML = "<i class='bi bi-sort-up'></i> Descendente";
        ordenActual = "desc";
    } else {
        ordenBtn.innerHTML = "<i class='bi bi-sort-down-alt'></i> Ascendente";
        ordenActual = "asc";
    }
    _filtro(filtroActual);
}

function _filtro(f) {
    filtroBtn.innerHTML = `<i class='bi bi-filter'></i> ${f.charAt(0).toUpperCase() + f.slice(1)}`;
    ordenarTabla(f, ordenActual);

    filtroActual = f;
}

function ordenarTabla(f, o) {
    const filas = Array.from(tabla.rows);

    function comparar(a, b) {
        let valorA = a.querySelector(`.${f}`).textContent.trim();
        let valorB = b.querySelector(`.${f}`).textContent.trim();

        if (f === "fecha") {
            valorA = convertirFecha(valorA);
            valorB = convertirFecha(valorB);
        } else if (!isNaN(valorA) && !isNaN(valorB)) {
            valorA = parseInt(valorA);
            valorB = parseInt(valorB);
        }

        if (valorA < valorB) {
            return o === "asc" ? -1 : 1;
        }
        if (valorA > valorB) {
            return o === "asc" ? 1 : -1;
        }
        return 0;
    }

    function convertirFecha(fecha) {
        const [dia, mes, año] = fecha.split("/").map(Number);
        return new Date(año, mes - 1, dia);
    }

    filas.sort(comparar);

    filas.forEach((fila) => tabla.appendChild(fila));
}

function buscarTabla(buscar) {
    const filas = Array.from(tabla.rows);

    function normalizarTexto(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/gu, "");
    }

    const buscarNormalizado = normalizarTexto(buscar);

    filas.forEach((fila) => {
        const texto = normalizarTexto(fila.textContent);
        const esVisible = texto.includes(buscarNormalizado);
        fila.style.display = esVisible ? "" : "none";
    });

    ordenarTabla(filtroActual, ordenActual);
}

window.addEventListener("message", (event) => {
    try {
        const data = JSON.parse(event.data);
        buscarTabla(data.buscar);
    } catch (error) {
        console.log(error);
    }
});

function _mostrar(row) {
    const checkboxes = document.querySelectorAll(".select-checkbox");

    if (Array.from(checkboxes).some((checkbox) => checkbox.checked)) {
        eliminarBtn.classList.remove("visually-hidden");
    } else {
        eliminarBtn.classList.add("visually-hidden");
    }

    filasNum.textContent = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;

    row.parentElement.parentElement.classList.toggle("table-active");
}

const estados = document.getElementsByName("estado");
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
