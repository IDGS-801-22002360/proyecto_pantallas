import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor, *ngIf
import { FormsModule } from '@angular/forms';   // Para [(ngModel)]

// 1. Definimos la interfaz para el modelo de Proveedor
export interface Proveedor {
  id: number;
  nombreEmpresa: string;
  personaContacto: string;
  email: string;
  telefono: string;
  direccion: string;
}

@Component({
  selector: 'app-crudproveedores',
  standalone: true,
  imports: [CommonModule, FormsModule], // 2. Añadimos los imports necesarios
  templateUrl: './crudproveedores.html',
  styleUrls: ['./crudproveedores.css']
})
export class Crudproveedores implements OnInit {

  // Lista para almacenar todos los proveedores
  proveedores: Proveedor[] = [];

  // Objeto para vincular con los campos del formulario
  proveedorActual: any = {};

  // Bandera para cambiar el estado del botón "Guardar" a "Actualizar"
  editando: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Datos de ejemplo para inicializar la tabla
    this.proveedores = [
      { id: 1, nombreEmpresa: 'Componentes Electrónicos S.A.', personaContacto: 'Carlos Ruiz', email: 'contacto@componentessa.com', telefono: '555-1122', direccion: 'Polígono Industrial Norte, Lote 5' },
      { id: 2, nombreEmpresa: 'Microchips del Sur', personaContacto: 'Laura Méndez', email: 'ventas@microchipsur.com', telefono: '555-3344', direccion: 'Avenida de la Tecnología 42' },
      { id: 3, nombreEmpresa: 'Global Arduino Supplies', personaContacto: 'David Chen', email: 'support@globalarduino.com', telefono: '555-5566', direccion: 'Calle de la Innovación 88' }
    ];
    this.limpiarFormulario();
  }

  // Método principal para guardar o actualizar un proveedor
  guardarProveedor(): void {
    if (this.editando) {
      // Lógica para ACTUALIZAR (Update)
      const index = this.proveedores.findIndex(p => p.id === this.proveedorActual.id);
      if (index !== -1) {
        this.proveedores[index] = this.proveedorActual;
      }
    } else {
      // Lógica para CREAR (Create)
      this.proveedorActual.id = this.proveedores.length > 0 ? Math.max(...this.proveedores.map(p => p.id)) + 1 : 1;
      this.proveedores.push(this.proveedorActual);
    }
    this.limpiarFormulario();
  }

  // Carga los datos de un proveedor en el formulario para editar
  editarProveedor(proveedor: Proveedor): void {
    this.editando = true;
    this.proveedorActual = { ...proveedor };
  }

  // Lógica para ELIMINAR (Delete)
  eliminarProveedor(id: number): void {
    this.proveedores = this.proveedores.filter(p => p.id !== id);
    if(this.proveedorActual.id === id) {
      this.limpiarFormulario();
    }
  }

  // Limpia el formulario y resetea el estado de edición
  limpiarFormulario(): void {
    this.proveedorActual = {
      id: 0,
      nombreEmpresa: '',
      personaContacto: '',
      email: '',
      telefono: '',
      direccion: ''
    };
    this.editando = false;
  }
}
