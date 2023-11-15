import { Injectable } from '@angular/core';
import { BASE_ENDPOINT2 } from '../config/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tienda } from '../models/tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  private baseEndPoint = BASE_ENDPOINT2

  private cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  public listar(): Observable<Tienda[]>{
    return this.http.get<Tienda[]>(this.baseEndPoint);
  }

  public ver (id: number): Observable<Tienda>{
    return this.http.get<Tienda>(`${this.baseEndPoint}/ver/${id}`)
  }

  public crear (tienda: Tienda): Observable<Tienda>{
    const url = this.baseEndPoint + "/crear";
    return this.http.post<Tienda>(url, tienda, {headers: this.cabeceras});
  }

  public editar (tienda: Tienda): Observable<Tienda>{
    const url = this.baseEndPoint + "/editar/" + tienda.id;
    return this.http.put<Tienda>(url, tienda, {headers: this.cabeceras});
  }

  public eliminar (id: number): Observable<void>{
    const url = this.baseEndPoint + "/eliminar/" + id;
    return this.http.delete<void>(url);
  }

  public crearConFoto(tienda: Tienda, archivo: File): Observable<Tienda>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', tienda.nombre)

    return this.http.post<Tienda>(this.baseEndPoint + "/crear-con-foto", formData);
  }

  public editarConFoto(tienda: Tienda, archivo: File): Observable<Tienda>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', tienda.nombre);

    return this.http.put<Tienda>(this.baseEndPoint + "/editar-con-foto/" + tienda.id, formData);
  }
}
