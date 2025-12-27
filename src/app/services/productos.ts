import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  /* Lista inicial de productos */
  private inicial: Producto[] = [
    {
      id: 1,
      nombre: 'Ceramicas',
      precio: 100,
      descripcion: '50 x 50',
      stock: 400,
      fechaAlta: new Date(2025, 12, 19).toISOString()
    },
    {
      id: 2,
      nombre: 'Zocalos',
      precio: 3100,
      descripcion: 'Madera',
      stock: 100,
      fechaAlta: new Date(2025, 12, 18).toISOString()
    },
    {
      id: 3,
      nombre: 'Masilla',
      precio: 2300,
      descripcion: 'Color blanco',
      stock: 20,
      fechaAlta: new Date(2025, 12, 17).toISOString()
    },
    {
      id: 4,
      nombre: 'Barniz',
      precio: 6500,
      descripcion: 'Opaco',
      stock: 5,
      fechaAlta: new Date(2025, 12, 17).toISOString()
    }
  ]


  //Estado de productos
  private productosSubject = new BehaviorSubject<Producto[]>([...this.inicial])

  //Averiguar cual es el id mas alto de productos inciales y sumarle uno mas para que ese sea nuestro proximo id
  private nextId = Math.max(...this.inicial.map(product => product.id)) + 1

  constructor() { }

  /* Obtener productos */
  getProductos(): Observable<Producto[]> {
    return this.productosSubject.asObservable()
  }

  /* 
  Partial: Nos permite marcar al objeto con propiedades opcionales
  Como generaremos el ID nosotros, el producto es parcial, no tiene todas las propiedades que debe tener, es una parte/porcion del producto
  */
  agregarProducto(producto_parcial: Partial<Producto>) {
    const productos_actuales = this.productosSubject.getValue()
    //Guardamos y incrementamos el contador de ids
    const new_id = this.nextId++
    const new_producto: Producto = {
      id: new_id,
      nombre: producto_parcial.nombre || '',
      precio: producto_parcial.precio ?? 0,
      descripcion: producto_parcial.descripcion || '',
      stock: producto_parcial.stock ?? 0,
      fechaAlta: producto_parcial.fechaAlta || new Date().toISOString()
    }

    //Añade un nuevo producto a la lista de productos
    this.productosSubject.next([...productos_actuales, new_producto])
  }

  eliminarProducto(product_id: number) {
    //Creamos una lista sin el producto que queriamos eliminar
    const productos_filtrados = this.productosSubject.getValue().filter(product => product.id !== product_id)

    //Seteamos la lista como nuevo valor de estado
    this.productosSubject.next(productos_filtrados)
  }


  /* Volver al estado inicial */
  reset() {
    this.productosSubject.next([...this.inicial])
    this.nextId = Math.max(...this.inicial.map(product => product.id)) + 1
  }

}
