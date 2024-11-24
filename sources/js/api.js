async function actualizarUsuario(data) {
    const id = JSON.parse(sessionStorage.getItem("usuario"))._id;
    const response = await fetch(`https://api-sandbox-f3ei.onrender.com/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
}

async function crearUsuario(data) {
    const response = await fetch("https://api-sandbox-f3ei.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
}
