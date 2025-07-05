import { PantallaPrincipal } from './pantalla-principal/pantalla-principal';
import { Routes } from '@angular/router';
import { CRUDEmpleados } from './crudempleados/crudempleados';

export const routes: Routes = [
  { path: 'inicio', component: PantallaPrincipal },
  { path: 'empleados', component: CRUDEmpleados },
  { path: '', redirectTo: 'empleados', pathMatch: 'full' }
];

