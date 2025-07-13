import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Importamos DatePipe para formatear fechas
import { FormsModule } from '@angular/forms';

// Definimos la interfaz para un Pedido
export interface Pedido {
  id: number;
  productoNombre: string;
  proveedor: string;
  cantidad: number;
  fechaPedido: string; // Usaremos un string en formato YYYY-MM-DD para el input date
  estado: 'Pendiente' | 'Recibido' | 'Cancelado'; // Un tipo definido para el estado
}

@Component({
  selector: 'app-crudpedidos',
  standalone: true, // Lo hacemos standalone para ser consistentes
  imports: [CommonModule, FormsModule, DatePipe], // Añadimos los módulos necesarios
  templateUrl: './crudpedidos.html',
  styleUrl: './crudpedidos.css'
})
export class CrudpedidosComponent {
  // Lista de estados para usar en el formulario (dropdown)
  estadosPedido: Pedido['estado'][] = ['Pendiente', 'Recibido', 'Cancelado'];

  pedidos: Pedido[] = [
    // Datos de ejemplo para que la tabla no esté vacía
    {
      id: 101,
      productoNombre: 'Arduino Uno R3 Original',
      proveedor: 'Componentes Express',
      cantidad: 50,
      fechaPedido: '2024-05-10',
      estado: 'Recibido'
    },
    {
      id: 102,
      productoNombre: 'ESP32 Development Board',
      proveedor: 'Tech Distributors',
      cantidad: 100,
      fechaPedido: '2024-05-20',
      estado: 'Pendiente'
    }
  ];

  pedidoActual: Pedido = this.getPedidoInicial();
  editando: boolean = false;
  private idCounter: number = 103; // Continuamos desde el último ID de ejemplo

  getPedidoInicial(): Pedido {
    return {
      id: 0,
      productoNombre: '',
      proveedor: '',
      cantidad: 1,
      fechaPedido: new Date().toISOString().split('T')[0], // Fecha actual por defecto
      estado: 'Pendiente'
    };
  }

  guardarPedido() {
    if (this.editando) {
      const index = this.pedidos.findIndex(p => p.id === this.pedidoActual.id);
      if (index !== -1) {
        this.pedidos[index] = { ...this.pedidoActual };
      }
    } else {
      this.pedidoActual.id = this.idCounter++;
      this.pedidos.push({ ...this.pedidoActual });
    }
    this.limpiarFormulario();
  }

  editarPedido(pedido: Pedido) {
    this.pedidoActual = { ...pedido };
    this.editando = true;
    window.scrollTo(0, 0);
  }

  eliminarPedido(id: number) {
    this.pedidos = this.pedidos.filter(p => p.id !== id);
    if (this.pedidoActual.id === id) {
      this.limpiarFormulario();
    }
  }

  limpiarFormulario() {
    this.pedidoActual = this.getPedidoInicial();
    this.editando = false;
  }
}
