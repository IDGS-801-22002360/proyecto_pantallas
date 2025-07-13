import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Definimos la interfaz para el modelo de Cliente
export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

@Component({
  selector: 'app-crudclientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crudclientes.html',
  styleUrls: ['./crudclientes.css']
})
export class Crudclientes implements OnInit {

  // Lista para almacenar todos los clientes
  clientes: Cliente[] = [];

  // Objeto para vincular con los campos del formulario
  clienteActual: any = {};

  // Bandera para cambiar el estado del botón "Guardar" a "Actualizar"
  editando: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Datos de ejemplo para inicializar la tabla
    this.clientes = [
      { id: 1, nombre: 'Ana García', email: 'ana.garcia@email.com', telefono: '555-1234', direccion: 'Calle Falsa 123, Ciudad' },
      { id: 2, nombre: 'Juan Pérez', email: 'juan.perez@email.com', telefono: '555-5678', direccion: 'Avenida Siempre Viva 742, Pueblo' },
      { id: 3, nombre: 'María Rodríguez', email: 'maria.r@email.com', telefono: '555-8765', direccion: 'Plaza Mayor 1, Capital' }
    ];
    this.limpiarFormulario();
  }

  // Método principal para guardar o actualizar
  guardarCliente(): void {
    if (this.editando) {
      // Lógica para ACTUALIZAR (Update)
      const index = this.clientes.findIndex(c => c.id === this.clienteActual.id);
      if (index !== -1) {
        this.clientes[index] = this.clienteActual;
      }
    } else {
      // Lógica para CREAR (Create)
      // En una app real, el ID vendría del backend. Aquí generamos uno simple.
      this.clienteActual.id = this.clientes.length > 0 ? Math.max(...this.clientes.map(c => c.id)) + 1 : 1;
      this.clientes.push(this.clienteActual);
    }
    this.limpiarFormulario();
  }

  // Carga los datos de un cliente en el formulario para editar
  editarCliente(cliente: Cliente): void {
    this.editando = true;
    // Creamos una copia para no modificar la lista directamente
    this.clienteActual = { ...cliente };
  }

  // Lógica para ELIMINAR (Delete)
  eliminarCliente(id: number): void {
    this.clientes = this.clientes.filter(c => c.id !== id);
    if(this.clienteActual.id === id) {
      this.limpiarFormulario();
    }
  }

  // Limpia el formulario y resetea el estado de edición
  limpiarFormulario(): void {
    this.clienteActual = {
      id: 0,
      nombre: '',
      email: '',
      telefono: '',
      direccion: ''
    };
    this.editando = false;
  }
}
