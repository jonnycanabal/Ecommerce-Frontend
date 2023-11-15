import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

//import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})

export class ProductoFormComponent {

  titulo = "Ingresar Producto";

  producto: Producto = new Producto(); //atributo producto

  error: any;

  //atributo, despues de creado el atributo se le tiene que asignar un valor
  private fotoSeleccionada: File;

  //importar el service en el contructor
  //Clase u objeto de angular que se llama Router, se debe inyectar  para despues utilizarlo en el metodo por medio del navigate
  // con el private route: ActivatedRoute obtiene el ID y en caso de que exista lo muestra en el formulario
  constructor(private service: ProductoService, 
    private router: Router, 
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    //como el paramMap es reactivo, toca usar el subscribe (no entiendi bien esta parte)
    //con el signo + se convierte de number a String, seria un cast
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.service.ver(id).subscribe(producto => {
          this.producto = producto;
        })
      }
    })
  }

  public guardarProducto(): void {
    if (this.fotoSeleccionada) {
        // Si se seleccionó un archivo, decidir si editar o crear con foto
        if (this.producto.id) {
            this.editarConFoto();
        } else {
            this.crearConFoto();
        }
    } else {
        // Si no se seleccionó un archivo, decidir si editar o crear sin foto
        if (this.producto.id) {
            this.editar();
        } else {
            this.crear();
        }
    }
}

  public crear(): void {
    if (!this.producto.nombre || !this.producto.marca || !this.producto.precio) {
      alert('Por favor, completar todos los campos.')
      return;
    }
    this.service.crear(this.producto).subscribe(producto => {
      console.log(producto);
      //el Swal es un fremawork para cambiar los mensajes de alertas. se usa el fire para disparar este mensaje
      //Swal.fire('Nuevo', `Producto ${producto.nombre} creado con exito`, 'success');
      this.router.navigate(['/productos/ver']);
    }, err => {
      if (err.status == 400) {
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

  public editar(): void {
    this.service.editar(this.producto).subscribe(producto => {
      console.log(producto);
      Swal.fire('Modificar', `Producto ${producto.nombre} actualizado con exito`, 'success');
      this.router.navigate(['/productos/ver']);
    }, err => {
      if (err.status == 400) {
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

  /**----------------------------------------------------------------------------------------------- */

  public seleccionarFoto(event): void {
    this.fotoSeleccionada = event.target.files[0];
    console.info(this.fotoSeleccionada);

    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      this.fotoSeleccionada = null;
      Swal.fire('Error al seleccionar la foto', 'El archivo debe ser de tipo imagen', 'error');
    }
  }
  //atraves del event se obtiene la imagen que es de tipo file, pero se puede asignar a un atributo del componente
  //para que despues se puede enviar al servis(backend)

  //despues de terminar estos pasos en el "service" se debe de crear un metodo para crear y editar con foto.


  //aqui se debe hacer un swich dependiente de si se invoca el crear o editar con foto
  
  public crearConFoto(): void {
    if (!this.fotoSeleccionada) {
      this.crear();
    } else {
      this.service.crearConFoto(this.producto, this.fotoSeleccionada).subscribe(producto => {
        console.log(producto);
        //el Swal es un fremawork para cambiar los mensajes de alertas. se usa el fire para disparar este mensaje
        Swal.fire('Nuevo', `Producto ${producto.nombre} creado con exito`, 'success');
        this.router.navigate(['/productos/ver']);
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
      this.service.editarConFoto(this.producto, this.fotoSeleccionada).subscribe(producto => {
        console.log(producto);
        //el Swal es un fremawork para cambiar los mensajes de alertas. se usa el fire para disparar este mensaje
        Swal.fire('Modificado', `Producto ${producto.nombre} actualizado con exito`, 'success');
        this.router.navigate(['/productos/ver']);
      }, err => {
        if (err.status == 400) {
          this.error = err.error;
          console.log(this.error);
        }
      });
    }
  }
  
}