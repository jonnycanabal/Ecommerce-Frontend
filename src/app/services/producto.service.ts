import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Producto } from '../models/producto';
import { BASE_ENDPOINT } from '../config/app';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

private baseEndpoint = BASE_ENDPOINT
private productoEndpoint = '/crear'

  private cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  public listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseEndpoint).pipe(
      tap((productos) => {
        console.log('Productos obtenidos:', productos);
      })
    );
  }

  public listarProductosPorTienda(tiendaId: number): Observable<Producto[]> {
    const url = this.baseEndpoint + "/por-tienda/" + tiendaId;
    return this.http.get<Producto[]>(url).pipe(
      tap((productos) => {
        console.log('Productos de la tienda obtenidos:', productos);
      })
    );
  }

  public ver (id: number): Observable<Producto>{
    return this.http.get<Producto>(`${this.baseEndpoint}/ver/${id}`);
  }

  public crear(producto:Producto): Observable<Producto>{
    const url = this.baseEndpoint + this.productoEndpoint;
    return this.http.post<Producto>(url, producto, {headers: this.cabeceras});
    //return this.http.post<Producto>(this.baseEndpoint, producto, {headers: this.cabeceras})
  }

  public editar(producto:Producto): Observable<Producto>{
    const url = this.baseEndpoint + "/editar/"+producto.id;
    return this.http.put<Producto>(url, producto, {headers: this.cabeceras});
  }
  
  public eliminar (id: number): Observable<void>{
    const url= this.baseEndpoint + "/eliminar/"+ id;
    return this.http.delete<void>(url)
  }

  public crearConFoto(producto: Producto, archivo: File): Observable<Producto>{
    const formData = new FormData();
    //en el form data se tiene que pasar los parametros del producto
    formData.append('archivo', archivo);
    formData.append('nombre', producto.nombre);
    formData.append('marca', producto.marca);
    formData.append('precio', producto.precio.toString());
    return this.http.post<Producto>(this.baseEndpoint + "/crear-con-foto", formData);
  }

  public editarConFoto(producto: Producto, archivo: File): Observable<Producto>{
    const formData = new FormData();
    //en el form data se tiene que pasar los parametros del producto
    formData.append('archivo', archivo);
    //se realizo un cast a toString debido a que como es de tipo blob la imagen debe recibir argumentos string o blob.
    formData.append('nombre', producto.nombre);
    formData.append('marca', producto.marca);
    formData.append('precio', producto.precio.toString());
    return this.http.put<Producto>(this.baseEndpoint + "/editar-con-foto/" + producto.id, formData);
  }
}