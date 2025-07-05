import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css']
})
export class Clientes {
  clientes: any[] = [];
  clienteActual = {
    id: 0,
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  };
  editando: boolean = false;
  private idCounter: number = 1;

  guardarCliente() {
    if (this.editando) {
      const index = this.clientes.findIndex(c => c.id === this.clienteActual.id);
      if (index !== -1) {
        this.clientes[index] = { ...this.clienteActual };
      }
    } else {
      this.clienteActual.id = this.idCounter++;
      this.clientes.push({ ...this.clienteActual });
    }
    this.limpiarFormulario();
  }

  editarCliente(cliente: any) {
    this.clienteActual = { ...cliente };
    this.editando = true;
  }

  eliminarCliente(id: number) {
    this.clientes = this.clientes.filter(c => c.id !== id);
    if (this.clienteActual.id === id) {
      this.limpiarFormulario();
    }
  }

  limpiarFormulario() {
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
