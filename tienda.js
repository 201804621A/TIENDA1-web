let carrito = [];

// Cambia de sección
function mostrarSeccion(id) {
    document.querySelectorAll('.seccion').forEach(seccion => {
        seccion.classList.remove('activa');
    });
    document.getElementById(id).classList.add('activa');
}

// Agrega un producto con nombre y precio
function agregarCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}

// Actualiza la tabla de productos en el carrito
function actualizarCarrito() {
    let tablaBody = document.querySelector("#tabla-carrito tbody");
    tablaBody.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;
        let fila = document.createElement('tr');

        // Columna nombre
        let celdaNombre = document.createElement('td');
        celdaNombre.textContent = item.nombre;
        fila.appendChild(celdaNombre);

        // Columna precio
        let celdaPrecio = document.createElement('td');
        celdaPrecio.textContent = `$${item.precio}`;
        fila.appendChild(celdaPrecio);

        // Columna acción (eliminar)
        let celdaAccion = document.createElement('td');
        let btnEliminar = document.createElement('button');
        btnEliminar.textContent = "❌ Quitar";
        btnEliminar.onclick = () => eliminarProducto(index);
        celdaAccion.appendChild(btnEliminar);
        fila.appendChild(celdaAccion);

        tablaBody.appendChild(fila);
    });

    document.getElementById("total-compra").textContent = `Total: $${total}`;
}

// Elimina producto por índice
function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

// Muestra mensaje final y limpia el carrito
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    let detalle = carrito.map(item => `${item.nombre} - $${item.precio}`).join("\n");
    let total = carrito.reduce((sum, item) => sum + item.precio, 0);

    alert(`¡Gracias por tu compra!\n\n${detalle}\n\nTotal: $${total}`);
    carrito = [];
    actualizarCarrito();
}
