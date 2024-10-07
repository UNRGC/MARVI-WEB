setTimeout(() => {
    muestras();
}, 1);

function muestras() {
    //obtiene el color primario y secundario del local storage
    const colorPrimario = localStorage.getItem("colorPrimario");
    const colorSecundario = localStorage.getItem("colorSecundario");

    // Gráfico de Área
    const areaCtx = document.getElementById("areaChart").getContext("2d");
    // Crear el degradado
    const degradado = areaCtx.createLinearGradient(0, 0, 0, 400);
    degradado.addColorStop(0, hexToRgba(colorSecundario, 0.8));
    degradado.addColorStop(1, hexToRgba(colorSecundario, 0));
    const areaData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
        datasets: [
            {
                label: "Pedidos por día",
                data: [12, 19, 3, 5, 2, 3, 7], // Datos para cada día
                backgroundColor: degradado,
                borderColor: colorPrimario,
                borderWidth: 2,
                fill: true, // Rellenar el área bajo la línea
                tension: 0.4, // Curvatura de la línea
            },
        ],
    };
    const areaConfig = {
        type: "line",
        data: areaData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            animation: {
                easing: "easeInQuad", // Tipo de animación
            },
        },
    };
    const areaChart = new Chart(areaCtx, areaConfig);

    // Gráfico de Barras
    const barCtx = document.getElementById("barChart").getContext("2d");
    const barData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
        datasets: [
            {
                label: "Ingresos por día",
                data: [1000, 589, 307, 1430, 2000, 1300, 2005], // Datos para cada día
                backgroundColor: degradado,
                borderColor: colorPrimario,
                borderWidth: 2,
                borderRadius: 15, // Radio para redondear las esquinas de las barras
            },
        ],
    };
    const barConfig = {
        type: "bar",
        data: barData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            animation: {
                easing: "easeInQuad",
            },
        },
    };
    const barChart = new Chart(barCtx, barConfig);
}
