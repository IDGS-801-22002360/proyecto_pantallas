import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-crudempleados',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './crudempleados.html',
    styleUrls: ['./crudempleados.css']
})
export class CRUDEmpleados {
    empleados: any[] = [];
    empleadoActual = {
        id: 0,
        nombre: '',
        puesto: '',
        email: '',
        fechaContratacion: ''
    };
    editando: boolean = false;
    private idCounter: number = 1;

    guardarEmpleado() {
        if (this.editando) {
            const index = this.empleados.findIndex(e => e.id === this.empleadoActual.id);
            if (index !== -1) {
                this.empleados[index] = { ...this.empleadoActual };
            }
        } else {
            this.empleadoActual.id = this.idCounter++;
            this.empleados.push({ ...this.empleadoActual });
        }
        this.limpiarFormulario();
    }

    editarEmpleado(empleado: any) {
        this.empleadoActual = { ...empleado };
        this.editando = true;
    }

    eliminarEmpleado(id: number) {
        this.empleados = this.empleados.filter(e => e.id !== id);
        if (this.empleadoActual.id === id) {
            this.limpiarFormulario();
        }
    }

    limpiarFormulario() {
        this.empleadoActual = {
            id: 0,
            nombre: '',
            puesto: '',
            email: '',
            fechaContratacion: ''
        };
        this.editando = false;
    }
}
