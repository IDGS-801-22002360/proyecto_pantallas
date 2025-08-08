import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadosService } from './empleados';
import { HttpClientModule } from '@angular/common/http';


@Component({
    selector: 'app-crudempleados',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule],
    templateUrl: './crudempleados.html',
    styleUrls: ['./crudempleados.css']
})
export class CRUDEmpleados implements OnInit {
    empleados: any[] = [];
    empleadoActual = {
        id: 0,
        nombre: '',
        puesto: '',
        email: '',
        fechaContratacion: ''
    };
    editando: boolean = false;

    constructor(private empleadosService: EmpleadosService) {}

    ngOnInit() {
        this.cargarEmpleados();
    }

    cargarEmpleados() {
        this.empleadosService.getEmpleados().subscribe(data => {
            this.empleados = data;
        });
    }

    guardarEmpleado() {
        if (this.editando) {
            // Actualizar
            this.empleadosService.updateEmpleado(this.empleadoActual.id, this.empleadoActual).subscribe(() => {
                this.cargarEmpleados();
                this.limpiarFormulario();
            });
        } else {
            // Agregar
            this.empleadosService.addEmpleado(this.empleadoActual).subscribe(() => {
                this.cargarEmpleados();
                this.limpiarFormulario();
            });
        }
    }

    editarEmpleado(empleado: any) {
        this.empleadoActual = { ...empleado };
        this.editando = true;
    }

    eliminarEmpleado(id: number) {
        this.empleadosService.deleteEmpleado(id).subscribe(() => {
            this.cargarEmpleados();
            if (this.empleadoActual.id === id) {
                this.limpiarFormulario();
            }
        });
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
