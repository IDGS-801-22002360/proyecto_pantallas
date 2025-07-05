import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  ventas2025 = [120, 150, 180, 200, 170, 210, 230, 250, 220, 210, 200, 190];
  ventas2024 = [100, 130, 160, 170, 150, 190, 200, 210, 190, 180, 170, 160];
  promedioMensual = this.ventas2025.map(v => v / 30);
  gananciasPorDia = [500, 700, 600, 800, 750, 900, 950];
  categorias = ['Arduino', 'Sensores', 'Kits', 'Relays', 'Cables'];
  categoriasVendidas = [120, 80, 60, 30, 50];
}
