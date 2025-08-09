import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesService, Cliente } from './clientes';

@Component({
  selector: 'app-crudclientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crudclientes.html',
  styleUrls: ['./crudclientes.css']
})
export class Crudclientes implements OnInit {
  clientes: Cliente[] = [];
  clienteActual: Cliente = this.getClienteInicial();
  editando: boolean = false;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  getClienteInicial(): Cliente {
    return {
      id: 0,
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      estatus: 'activo'
    };
  }

  cargarClientes(): void {
    this.clientesService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  guardarCliente(): void {
    if (this.editando) {
      this.clientesService.updateCliente(this.clienteActual.id, this.clienteActual).subscribe(() => {
        this.cargarClientes();
        this.limpiarFormulario();
      });
    } else {
      this.clientesService.addCliente(this.clienteActual).subscribe(() => {
        this.cargarClientes();
        this.limpiarFormulario();
      });
    }
  }

  editarCliente(cliente: Cliente): void {
    this.clienteActual = { ...cliente };
    this.editando = true;
  }

  eliminarCliente(id: number): void {
    this.clientesService.deleteCliente(id).subscribe(() => {
      this.cargarClientes();
      if (this.clienteActual.id === id) {
        this.limpiarFormulario();
      }
    });
  }

  limpiarFormulario(): void {
    this.clienteActual = this.getClienteInicial();
    this.editando = false;
  }
}
