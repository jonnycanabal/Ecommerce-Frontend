import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { Tienda } from 'src/app/models/tienda';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent {

  titulo = 'Listado de tiendas'
  tiendas: Tienda[];

  baseEndPoint = BASE_ENDPOINT

  constructor(private service: TiendaService, private datePipe: DatePipe){ }

  ngOnInit(): void {
    this.service.listar().subscribe(tiendas => this.tiendas = tiendas)
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

  public eliminar(tienda: Tienda): void {

    Swal.fire({
      title: 'Cuidado: ',
      text: `¿Seguro que deseas eliminar a ${tienda.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.service.eliminar(tienda.id).subscribe(() => {
          // al usar filter nos crea una nueva lista sin el producto eliminado, se iguala a la lista producto
          this.tiendas = this.tiendas.filter(p => p !== tienda);
          Swal.fire('Eliminado', `Producto  ${tienda.nombre} eliminado con exito`, 'success');
        });

      }
    })
  }
}
