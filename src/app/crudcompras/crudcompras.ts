import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaz para una Compra de cliente
export interface Compra {
  id: number;
  clienteNombre: string;
  productoNombre: string;
  cantidad: number;
  precioUnitario: number;
  total: number; // Campo calculado (cantidad * precioUnitario)
  fechaCompra: string;
  estado: 'Procesando' | 'Enviado' | 'Entregado' | 'Cancelado';
}

@Component({
  selector: 'app-crudcompras',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, CurrencyPipe],
  templateUrl: './crudcompras.html',
  styleUrl: './crudcompras.css'
})
export class CrudcomprasComponent {
  // Lista de estados para el dropdown del formulario
  estadosCompra: Compra['estado'][] = ['Procesando', 'Enviado', 'Entregado', 'Cancelado'];

  compras: Compra[] = [
    // Datos de ejemplo para visualizar
    {
      id: 2001,
      clienteNombre: 'Juan Pérez',
      productoNombre: 'Arduino Uno R3 Original',
      cantidad: 2,
      precioUnitario: 24.99,
      total: 49.98,
      fechaCompra: '2024-05-22',
      estado: 'Enviado'
    },
    {
      id: 2002,
      clienteNombre: 'Ana García',
      productoNombre: 'Pack de Sensores (20 Tipos)',
      cantidad: 1,
      precioUnitario: 19.99,
      total: 19.99,
      fechaCompra: '2024-05-23',
      estado: 'Procesando'
    }
  ];

  compraActual: Compra = this.getCompraInicial();
  editando: boolean = false;
  private idCounter: number = 2003;

  getCompraInicial(): Compra {
    return {
      id: 0,
      clienteNombre: '',
      productoNombre: '',
      cantidad: 1,
      precioUnitario: 0,
      total: 0,
      fechaCompra: new Date().toISOString().split('T')[0], // Fecha de hoy
      estado: 'Procesando'
    };
  }

  // Método para calcular el total dinámicamente en el formulario
  calcularTotal() {
    this.compraActual.total = this.compraActual.cantidad * this.compraActual.precioUnitario;
  }

  guardarCompra() {
    // Nos aseguramos de que el total esté calculado antes de guardar
    this.calcularTotal();

    if (this.editando) {
      const index = this.compras.findIndex(c => c.id === this.compraActual.id);
      if (index !== -1) {
        this.compras[index] = { ...this.compraActual };
      }
    } else {
      this.compraActual.id = this.idCounter++;
      this.compras.push({ ...this.compraActual });
    }
    this.limpiarFormulario();
  }

  editarCompra(compra: Compra) {
    this.compraActual = { ...compra };
    this.editando = true;
    window.scrollTo(0, 0);
  }

  eliminarCompra(id: number) {
    this.compras = this.compras.filter(c => c.id !== id);
    if (this.compraActual.id === id) {
      this.limpiarFormulario();
    }
  }

  limpiarFormulario() {
    this.compraActual = this.getCompraInicial();
    this.editando = false;
  }
}
