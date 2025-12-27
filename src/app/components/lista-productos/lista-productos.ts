import { ProductosService } from './../../services/productos';
import { Component } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DescuentoPipe } from '../../pipes/descuento-pipe';

@Component({
  selector: 'app-lista-productos',
  imports: [CommonModule, DescuentoPipe],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos {
  products: Producto[] = [];
  loading: boolean = true;
  porcentaje_descuento: number = 10;
  private subscription?: Subscription;

  constructor(private productosService: ProductosService) {

  }

  ngOnInit() {
    /* Subscripcion al observable del productosService */
    this.subscription = this.productosService.getProductos().subscribe(
      /* Llega la lista de productos */
      (productos_lista) => {
        /* Modificamos los estados */
        this.products = productos_lista
        this.loading = false
      }
    )
  }

  eliminar(product_id: number) {
    /* NO manejamos logica, se encarga el servicio solo lo invocamos */
    this.productosService.eliminarProducto(product_id)
  }

  simularAgregarProducto() {
    this.productosService.agregarProducto(
      {
        nombre: 'Producto test',
        descripcion: 'Descripcion test',
        precio: 4000,
        stock: 10,
        fechaAlta: new Date().toISOString()
      }
    )
  }

  limpiar() {
    //Elimina desde el servicio todos los productos cargados
    this.products.forEach((product) => this.productosService.eliminarProducto(product.id))
  }

}
