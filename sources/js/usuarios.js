/* global filasTotalesNum */
/* global filasNum */
/* global tabla */

async function cargarUsuarios() {
    const response = await fetch("https://api-sandbox-f3ei.onrender.com/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        const user = data[i];
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <th scope="row" class="text-center">
                <input type="checkbox" class="select-checkbox" onclick="_mostrar(this)" />
            </th>
            <td class="identificador">${user._id}</td>
            <td class="usuario">${user.email}</td>
            <td class="nombre">${user.firstName} ${user.lastName} ${user.motherLastName}</td>
            <td class="telefono">${user.phone}</td>
            <td class="rol">${user.role}</td>
            <td class="text-center">
                <button class="options" type="button" data-bs-toggle="dropdown">
                    <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu">
                    <li>
                        <button class="dropdown-item" onclick="mostrarUsuario(this)"><i class="bi bi-pencil-square"></i> Ver Detalles</button>
                    </li>
                    <li>
                        <button class="dropdown-item" onclick="eliminarUsuario(this)"><i class="bi bi-trash3"></i> Eliminar usuario</button>
                    </li>
                </ul>
            </td>
        `;
        document.getElementById("tbody").appendChild(tr);
    }

    filasNum.textContent = "0";
    filasTotalesNum.textContent = tabla.rows.length;
}

mostrarUsuario = (row) => {
    const id = row.parentElement.parentElement.parentElement.parentElement.children[1].textContent;

    const usuario = async () => {
        const response = await fetch(`https://api-sandbox-f3ei.onrender.com/users/id/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        window.parent.postMessage(data, "*");
    };

    usuario();
};

eliminarUsuario = (row) => {
    const id = row.parentElement.parentElement.parentElement.parentElement.children[1].textContent;

    window.parent.postMessage(JSON.stringify({ eliminarUsuario: id }), "*");
};

eliminarUsuarios = () => {
    const checkboxes = document.getElementsByClassName("select-checkbox");
    const ids = [];

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            ids.push(checkboxes[i].parentElement.parentElement.children[1].textContent);
        }
    }

    window.parent.postMessage(JSON.stringify({ eliminarUsuarios: ids }), "*");
};

window.addEventListener("message", (event) => {
    if (event.data === "verificar") {
        document.getElementById("tbody").innerHTML = "";
        cargarUsuarios();
    }
});

cargarUsuarios();
