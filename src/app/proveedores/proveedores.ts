import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: '/proveedores.html',
  styleUrls: ['./proveedores.css']
})
export class Proveedores {
  proveedores: any[] = [];
  proveedorActual = {
    id: 0,
    nombre: '',
    contacto: '',
    telefono: '',
    direccion: ''
  };
  editando: boolean = false;
  private idCounter: number = 1;

  guardarProveedor() {
    if (this.editando) {
      const index = this.proveedores.findIndex(p => p.id === this.proveedorActual.id);
      if (index !== -1) {
        this.proveedores[index] = { ...this.proveedorActual };
      }
    } else {
      this.proveedorActual.id = this.idCounter++;
      this.proveedores.push({ ...this.proveedorActual });
    }
    this.limpiarFormulario();
  }

  editarProveedor(proveedor: any) {
    this.proveedorActual = { ...proveedor };
    this.editando = true;
  }

  eliminarProveedor(id: number) {
    this.proveedores = this.proveedores.filter(p => p.id !== id);
    if (this.proveedorActual.id === id) {
      this.limpiarFormulario();
    }
  }

  limpiarFormulario() {
    this.proveedorActual = {
      id: 0,
      nombre: '',
      contacto: '',
      telefono: '',
      direccion: ''
    };
    this.editando = false;
  }
}
