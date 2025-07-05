// Datos estáticos de ejemplo
const clientes = [
    {
        nombre: "Luis",
        apellidoPaterno: "García",
        apellidoMaterno: "Pérez",
        correo: "luis.garcia@example.com",
        direccion: "Av. Reforma 123, CDMX",
        telefono: "5512345678"
    },
    {
        nombre: "Ana",
        apellidoPaterno: "López",
        apellidoMaterno: "Martínez",
        correo: "ana.lopez@example.com",
        direccion: "Calle 5 Sur 45, Puebla",
        telefono: "2229876543"
    },
    {
        nombre: "Pedro",
        apellidoPaterno: "Hernández",
        apellidoMaterno: "Ramírez",
        correo: "pedro.hernandez@example.com",
        direccion: "Blvd. Xicotencatl 67, Tlaxcala",
        telefono: "2461234567"
    }
];

// Renderiza la tabla de clientes
function renderTablaClientes() {
    const tbody = document.getElementById('clientes-tbody');
    if (!tbody) return;

    tbody.innerHTML = clientes.map((c, idx) => `
        <tr>
            <td>${c.nombre}</td>
            <td>${c.apellidoPaterno}</td>
            <td>${c.apellidoMaterno}</td>
            <td>${c.correo}</td>
            <td>${c.telefono}</td>
            <td>
                <button class="btn-detalles" data-idx="${idx}">Ver detalles</button><!-- NUEVA: btn-detalles -->
            </td>
        </tr>
    `).join('');
}

// Muestra el modal con los detalles del cliente
function mostrarModalDetalle(idx: number) {
    const modal = document.getElementById('modal-detalles') as HTMLElement;
    const detallesDiv = document.getElementById('detalles-cliente') as HTMLElement;
    const cliente = clientes[idx];
    detallesDiv.innerHTML = `
        <p><strong>Nombre:</strong> ${cliente.nombre}</p>
        <p><strong>Apellido Paterno:</strong> ${cliente.apellidoPaterno}</p>
        <p><strong>Apellido Materno:</strong> ${cliente.apellidoMaterno}</p>
        <p><strong>Correo:</strong> ${cliente.correo}</p>
        <p><strong>Dirección:</strong> ${cliente.direccion}</p>
        <p><strong>Teléfono:</strong> ${cliente.telefono}</p>
    `;
    modal.style.display = "block";
}

// Cierra el modal
function cerrarModal() {
    const modal = document.getElementById('modal-detalles') as HTMLElement;
    modal.style.display = "none";
}

// Listeners
function agregarListeners() {
    // Botones de detalles
    document.getElementById('clientes-tbody')?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('btn-detalles')) {
            const idx = Number(target.getAttribute('data-idx'));
            mostrarModalDetalle(idx);
        }
    });

    // Botón cerrar modal
    document.getElementById('cerrar-modal')?.addEventListener('click', cerrarModal);

    // Cerrar modal al hacer click fuera del contenido
    document.getElementById('modal-detalles')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            cerrarModal();
        }
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderTablaClientes();
    agregarListeners();
});
