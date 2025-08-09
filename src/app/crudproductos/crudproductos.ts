import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService, Producto } from './productos';

@Component({
  selector: 'app-crudproductos',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './crudproductos.html',
  styleUrls: ['./crudproductos.css']
})
export class CrudproductosComponent implements OnInit {
  productos: Producto[] = [];
  productoActual: Producto = this.getProductoInicial();
  editando: boolean = false;

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  getProductoInicial(): Producto {
    return {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      imagenUrl: ''
    };
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.productoActual.imagenUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  cargarProductos() {
    this.productosService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  guardarProducto() {
    if (this.editando) {
      this.productosService.updateProducto(this.productoActual.id, this.productoActual).subscribe(() => {
        this.cargarProductos();
        this.limpiarFormulario();
      });
    } else {
      this.productosService.addProducto(this.productoActual).subscribe(() => {
        this.cargarProductos();
        this.limpiarFormulario();
      });
    }
  }

  editarProducto(producto: Producto) {
    this.productoActual = { ...producto };
    this.editando = true;
    window.scrollTo(0, 0);
  }

  eliminarProducto(id: number) {
    this.productosService.deleteProducto(id).subscribe(() => {
      this.cargarProductos();
      if (this.productoActual.id === id) {
        this.limpiarFormulario();
      }
    });
  }

  limpiarFormulario() {
    this.productoActual = this.getProductoInicial();
    this.editando = false;
  }
}
