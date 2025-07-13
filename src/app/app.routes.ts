import { PantallaPrincipal } from './pantalla-principal/pantalla-principal';
import { Routes } from '@angular/router';
import { CRUDEmpleados } from './crudempleados/crudempleados';
import { CrudproductosComponent } from './crudproductos/crudproductos';
import { CrudpedidosComponent } from './crudpedidos/crudpedidos';
import { CrudcomprasComponent } from './crudcompras/crudcompras';
import { Crudclientes } from './crudclientes/crudclientes';
import { Crudproveedores } from './crudproveedores/crudproveedores';
import { Component } from '@angular/core';
import { Dashboard } from './dashboard/dashboard';


export const routes: Routes = [
  { path: 'inicio', component: PantallaPrincipal },
  { path: 'empleados', component: CRUDEmpleados },
  { path: 'productos', component: CrudproductosComponent },
  { path: 'pedidos', component: CrudpedidosComponent },
  { path: 'compras', component: CrudcomprasComponent },
  { path: 'clientes', component: Crudclientes },
  { path: 'proveedores', component: Crudproveedores },
  { path: 'dashboard', component: Dashboard},
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];

