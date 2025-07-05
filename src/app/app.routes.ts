import { Routes } from '@angular/router';
import { PantallaPrincipal } from './pantalla-principal/pantalla-principal';
import { CRUDEmpleados } from './crudempleados/crudempleados';
//import { Clientes } from './clientes/clientes.ts';

export const routes: Routes = [
  { path: 'inicio', component: PantallaPrincipal },
  { path: 'empleados', component: CRUDEmpleados },
  //{ path: 'clientes', component:  Clientes},
  { path: '', redirectTo: 'empleados', pathMatch: 'full' }
];

