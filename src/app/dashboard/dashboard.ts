// src/app/dashboard/dashboard.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor, *ngIf
import { FormsModule } from '@angular/forms';   // Para [(ngModel)] si tuviéramos formularios

// --- Interfaces para los datos del dashboard ---

// Datos para tarjetas de resumen
interface ResumenCard {
  titulo: string;
  valor: string;
  icono: string; // Clase de Font Awesome
  color: string; // Color de acento para el valor o el icono
}

// Datos para la tabla de productos más vendidos
interface ProductoMasVendido {
  nombre: string;
  ventas: number;
  popularidad: number; // Simula un porcentaje o ranking
}

// Datos para el gráfico de ventas por día (simulado)
interface VentasPorDia {
  dia: string;
  ventas: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  // --- Datos de ejemplo (estáticos) ---

  // Tarjetas de Resumen
  tarjetasResumen: ResumenCard[] = [
    { titulo: 'Ventas del Día', valor: '$1,250.00', icono: 'fas fa-chart-line', color: '#28a745' },
    { titulo: 'Total de Pedidos', valor: '85', icono: 'fas fa-boxes', color: '#007bff' },
    { titulo: 'Clientes Nuevos', valor: '15', icono: 'fas fa-user-plus', color: '#ffc107' },
    { titulo: 'Productos Vendidos', valor: '210', icono: 'fas fa-shopping-cart', color: '#6f42c1' }
  ];

  // Tabla de Productos Más Vendidos
  productosMasVendidos: ProductoMasVendido[] = [
    { nombre: 'Raspberry Pi 4', ventas: 150, popularidad: 85 },
    { nombre: 'Sensor DHT22', ventas: 120, popularidad: 78 },
    { nombre: 'Módulo LED RGB', ventas: 95, popularidad: 70 },
    { nombre: 'Placa Arduino Uno', ventas: 80, popularidad: 65 },
    { nombre: 'Cables Jumper', ventas: 70, popularidad: 60 }
  ];

  // Datos para el gráfico de ventas simulado
  ventasPorDia: VentasPorDia[] = [
    { dia: 'Lun', ventas: 180 }, { dia: 'Mar', ventas: 220 }, { dia: 'Mié', ventas: 200 },
    { dia: 'Jue', ventas: 250 }, { dia: 'Vie', ventas: 300 }, { dia: 'Sáb', ventas: 280 },
    { dia: 'Dom', ventas: 150 }
  ];

  // Valor máximo de ventas para escalar el gráfico
  maxVentas: number = 0;

  // =============================================================
  // ===           SECCIÓN NUEVA A AÑADIR (1/2)                ===
  // =============================================================
  // Array de colores para las barras de progreso de popularidad
  coloresPopularidad: string[] = ['#28a745', '#007bff', '#ffc107', '#6f42c1', '#fd7e14'];
  // =============================================================

  constructor() { }

  ngOnInit(): void {
    // Calcular el valor máximo de ventas para la escala del gráfico
    this.maxVentas = Math.max(...this.ventasPorDia.map(v => v.ventas));
  }

  // Helper para calcular la altura de la barra del gráfico (simulado)
  getBarHeight(ventas: number): string {
    if (this.maxVentas === 0) return '0%';
    const heightPercentage = (ventas / this.maxVentas) * 100;
    return `${heightPercentage}%`;
  }

  // =============================================================
  // ===           SECCIÓN NUEVA A AÑADIR (2/2)                ===
  // =============================================================
  // Helper para obtener un color para la barra de progreso
  getColorPorcentaje(index: number): string {
    // Usamos el operador de módulo (%) para rotar a través de los colores
    // si hay más productos que colores en el array.
    return this.coloresPopularidad[index % this.coloresPopularidad.length];
  }
  // =============================================================
}
