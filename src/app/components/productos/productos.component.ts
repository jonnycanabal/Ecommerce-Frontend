import { Component } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  tiendaId: number;
  productosDeLaTienda : Producto[];

  titulo = 'Listado de productos';
  productos: Producto[];

  baseEndpoint = BASE_ENDPOINT

  constructor(private service: ProductoService, private datePipe: DatePipe, private route: ActivatedRoute) { }

  ngOnInit(): void {
  
    console.log('Iniciando ngOnInit');  
    
    this.tiendaId = +this.route.snapshot.paramMap.get('tiendaId');

    if(this.tiendaId !== undefined){
      
    this.service.listarProductosPorTienda(this.tiendaId)
      .subscribe((productos: Producto[]) => {
        this.productosDeLaTienda = productos;
        console.log('Productos de la tienda:', this.productosDeLaTienda);
      });
    }else{

      //this.service.listar().subscribe(productos => this.productos = productos);
      // this.service.listar().subscribe((productos: Producto[]) => {
      //   this.productos = productos;
      //   console.log('Todos los productos:', this.productos);
      // });
    }

    this.service.listar().subscribe(productos => this.productos = productos);
  }
  

  public formatearFecha(createAt: any): string {
    // Verifica si createAt es un número válido
    if (typeof createAt === 'number') {
      const fecha = new Date(createAt);
      return this.datePipe.transform(fecha, 'dd/MM/yyyy HH:mm:ss');
    } else {
      // En caso de que no sea un número válido, devuelve un mensaje de error o el valor original
      return 'Fecha inválida';
    }
  }

  public eliminar(producto: Producto): void {

    Swal.fire({
      title: 'Cuidado: ',
      text: `¿Seguro que deseas eliminar a ${producto.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.service.eliminar(producto.id).subscribe(() => {
          // al usar filter nos crea una nueva lista sin el producto eliminado, se iguala a la lista producto
          this.productos = this.productos.filter(p => p !== producto);
          Swal.fire('Eliminado', `Producto  ${producto.nombre} eliminado con exito`, 'success');
        });

      }
    })
  }
}
