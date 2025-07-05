interface Proveedor {
    nombre: string;
    marca: string;
    fechaEntrega: string;
    fechaCaducidad: string;
    precio: number;
    totalCompra: number;
    cantidad: number;
}

let proveedores: Proveedor[] = [
    {
        nombre: "Distribuidora Electrónica",
        marca: "Arduino",
        fechaEntrega: "2025-07-01",
        fechaCaducidad: "2026-07-01",
        precio: 500,
        totalCompra: 2500,
        cantidad: 5
    },
    {
        nombre: "Electro MX",
        marca: "ESP32",
        fechaEntrega: "2025-06-15",
        fechaCaducidad: "2027-01-01",
        precio: 350,
        totalCompra: 3500,
        cantidad: 10
    }
];

let editIndex: number | null = null;

function renderTablaProveedores() {
    const tbody = document.getElementById('proveedores-tbody');
    if (!tbody) return;
    tbody.innerHTML = proveedores.map((p, idx) => `
        <tr>
            <td>${p.nombre}</td>
            <td>${p.marca}</td>
            <td>${p.fechaEntrega}</td>
            <td>${p.fechaCaducidad}</td>
            <td>${p.precio}</td>
            <td>${p.totalCompra}</td>
            <td>${p.cantidad}</td>
            <td>
                <button class="btn-editar" data-idx="${idx}">Editar</button>
                <button class="btn-eliminar" data-idx="${idx}">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

function mostrarModalProveedor(editar = false, idx: number | null = null) {
    const modal = document.getElementById('modal-proveedor') as HTMLElement;
    const titulo = document.getElementById('modal-titulo') as HTMLElement;
    const form = document.getElementById('form-proveedor') as HTMLFormElement;

    if (editar && idx !== null) {
        const p = proveedores[idx];
        (document.getElementById('nombre') as HTMLInputElement).value = p.nombre;
        (document.getElementById('marca') as HTMLInputElement).value = p.marca;
        (document.getElementById('fechaEntrega') as HTMLInputElement).value = p.fechaEntrega;
        (document.getElementById('fechaCaducidad') as HTMLInputElement).value = p.fechaCaducidad;
        (document.getElementById('precio') as HTMLInputElement).value = String(p.precio);
        (document.getElementById('totalCompra') as HTMLInputElement).value = String(p.totalCompra);
        (document.getElementById('cantidad') as HTMLInputElement).value = String(p.cantidad);

        titulo.textContent = "Editar Proveedor";
        editIndex = idx;
    } else {
        form.reset();
        titulo.textContent = "Agregar Proveedor";
        editIndex = null;
    }

    modal.style.display = "block";
}

function cerrarModalProveedor() {
    const modal = document.getElementById('modal-proveedor') as HTMLElement;
    modal.style.display = "none";
}

function agregarListeners() {
    document.getElementById('btn-agregar')?.addEventListener('click', () => mostrarModalProveedor());
    document.getElementById('cerrar-modal')?.addEventListener('click', cerrarModalProveedor);
    document.getElementById('modal-proveedor')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) cerrarModalProveedor();
    });

    // Editar/eliminar
    document.getElementById('proveedores-tbody')?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('btn-editar')) {
            const idx = Number(target.getAttribute('data-idx'));
            mostrarModalProveedor(true, idx);
        } else if (target.classList.contains('btn-eliminar')) {
            const idx = Number(target.getAttribute('data-idx'));
            if (confirm('¿Seguro que deseas eliminar este proveedor?')) {
                proveedores.splice(idx, 1);
                renderTablaProveedores();
            }
        }
    });

    // Guardar proveedor
    document.getElementById('form-proveedor')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoProveedor: Proveedor = {
            nombre: (document.getElementById('nombre') as HTMLInputElement).value,
            marca: (document.getElementById('marca') as HTMLInputElement).value,
            fechaEntrega: (document.getElementById('fechaEntrega') as HTMLInputElement).value,
            fechaCaducidad: (document.getElementById('fechaCaducidad') as HTMLInputElement).value,
            precio: Number((document.getElementById('precio') as HTMLInputElement).value),
            totalCompra: Number((document.getElementById('totalCompra') as HTMLInputElement).value),
            cantidad: Number((document.getElementById('cantidad') as HTMLInputElement).value)
        };

        if (editIndex !== null) {
            proveedores[editIndex] = nuevoProveedor;
        } else {
            proveedores.push(nuevoProveedor);
        }
        cerrarModalProveedor();
        renderTablaProveedores();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderTablaProveedores();
    agregarListeners();
});
