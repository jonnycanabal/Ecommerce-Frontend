import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tienda } from 'src/app/models/tienda';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tienda-form',
  templateUrl: './tienda-form.component.html',
  styleUrls: ['./tienda-form.component.css']
})

export class TiendaFormComponent {

  titulo = "Ingresar Tienda";

  tienda: Tienda = new Tienda();

  error: any;

  private fotoSeleccionada: File;

  constructor(private service: TiendaService, 
    private router: Router, 
    private route: ActivatedRoute) { 

  }
  
  ngOnInit() {
    //como el paramMap es reactivo, toca usar el subscribe (no entiendi bien esta parte)
    //con el signo + se convierte de number a String, seria un cast
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.service.ver(id).subscribe(tienda => {
          this.tienda = tienda;
        })
      }
    })
  }

  public guardarTienda(): void{
    if (this.fotoSeleccionada){
      if(this.tienda.id){
        this.editarConFoto();
      }else{
        this.crearConFoto();
      }
    }else {
      if(this.tienda.id){
        this.editar();
      }else{
        this.crear();
      }
    }
  }

  public crear(): void {
    if (!this.tienda.nombre){
      alert('Por favor, completar todos los campos')
      return;
    }
    this.service.crear(this.tienda).subscribe(tienda => {
      console.log(tienda);
      this.router.navigate(['/tiendas/ver']);
    },err => {
      if (err.status == 400) {
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

  public editar(): void{
    this.service.editar(this.tienda).subscribe(tienda => {
      console.log(tienda);
      Swal.fire('Modificar', `Tienda ${tienda.nombre} actualizada con exito`, 'success');
      this.router.navigate(['/tiendas/ver']);
    }, err => {
      if (err.status == 400) {
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

  public seleccionarFoto(event): void {
    this.fotoSeleccionada = event.target.files[0];
    console.info(this.fotoSeleccionada);

    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      this.fotoSeleccionada = null;
      Swal.fire('Error al seleccionar la foto', 'El archivo debe ser de tipo imagen', 'error');
    }
  }

  public crearConFoto(): void {
    if (!this.fotoSeleccionada) {
      this.crear();
    } else {
      this.service.crearConFoto(this.tienda, this.fotoSeleccionada).subscribe(tienda => {
        console.log(tienda);
        //el Swal es un fremawork para cambiar los mensajes de alertas. se usa el fire para disparar este mensaje
        Swal.fire('Nuevo', `Tienda ${tienda.nombre} creada con exito`, 'success');
        this.router.navigate(['/tiendas/ver']);
      }, err => {
        if (err.status == 400) {
          this.error = err.error;
          console.log(this.error);
        }
      });
    }
  }

  public editarConFoto(): void {
    if (!this.fotoSeleccionada) {
      this.editar();
    } else {
      this.service.editarConFoto(this.tienda, this.fotoSeleccionada).subscribe(tienda => {
        console.log(tienda);
        //el Swal es un fremawork para cambiar los mensajes de alertas. se usa el fire para disparar este mensaje
        Swal.fire('Modificado', `Tienda ${tienda.nombre} actualizada con exito`, 'success');
        this.router.navigate(['/tiendas/ver']);
      }, err => {
        if (err.status == 400) {
          this.error = err.error;
          console.log(this.error);
        }
      });
    }
  }
  
}
