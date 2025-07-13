import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string; // Esta propiedad ahora guardará la URL web O la data Base64
}

@Component({
  selector: 'app-crudproductos',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './crudproductos.html',
  styleUrls: ['./crudproductos.css']
})
export class CrudproductosComponent {
  productos: Producto[] = [
    // Los datos de ejemplo con URLs externas seguirán funcionando
    {
      id: 1,
      nombre: 'Arduino Uno R3 Original',
      descripcion: 'La placa de desarrollo más popular...',
      precio: 24.99,
      stock: 150,
      imagenUrl: 'https://m.media-amazon.com/images/I/71i5EorAMBL._AC_.jpg'
    },
    {
      id: 2,
      nombre: 'ESP32 Development Board',
      descripcion: 'Placa con Wi-Fi y Bluetooth integrados...',
      precio: 12.50,
      stock: 80,
      imagenUrl: 'https://tse3.mm.bing.net/th/id/OIP.uELFVC7jBeJ3pulv3wYMJAHaGV?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    }
  ];

  productoActual: Producto = this.getProductoInicial();
  editando: boolean = false;
  private idCounter: number = 3;

  getProductoInicial(): Producto {
    return {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      imagenUrl: '' // La URL de la imagen empieza vacía
    };
  }

  // --- ¡NUEVO MÉTODO PARA MANEJAR LA CARGA DE ARCHIVOS! ---
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Convertimos la imagen a una cadena Base64 y la guardamos en nuestro objeto
        this.productoActual.imagenUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarProducto() {
    if (this.editando) {
      const index = this.productos.findIndex(p => p.id === this.productoActual.id);
      if (index !== -1) {
        this.productos[index] = { ...this.productoActual };
      }
    } else {
      this.productoActual.id = this.idCounter++;
      this.productos.push({ ...this.productoActual });
    }
    this.limpiarFormulario();
  }

  editarProducto(producto: Producto) {
    this.productoActual = { ...producto };
    this.editando = true;
    window.scrollTo(0, 0);
  }

  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    if (this.productoActual.id === id) {
      this.limpiarFormulario();
    }
  }

  limpiarFormulario() {
    this.productoActual = this.getProductoInicial();
    this.editando = false;
    // Opcional: limpiar el input del archivo si tienes una referencia a él
  }
}
