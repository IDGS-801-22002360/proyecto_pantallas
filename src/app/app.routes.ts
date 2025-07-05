import { Routes } from '@angular/router';
import { PantallaPrincipal } from './pantalla-principal/pantalla-principal';
import { CRUDEmpleados } from './crudempleados/crudempleados';
import { Clientes } from './clientes/clientes';
import { Proveedores } from './proveedores/proveedores';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: 'inicio', component: PantallaPrincipal },
  { path: 'empleados', component: CRUDEmpleados },
  { path: 'clientes', component: Clientes },
  { path: 'proveedores', component: Proveedores },
  { path: 'dashboard', component: Dashboard },
  { path: '', redirectTo: 'empleados', pathMatch: 'full' }
];

