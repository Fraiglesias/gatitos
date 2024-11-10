import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000/api/profiles'; // URL de la API

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { CORREO: correo, CONTRASENA: contrasena });
  }

  register(nombre: string, rut: string, correo: string, contrasena: string, tipo_perfil: number, direccion: string, region: string, comuna: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { 
      NOMBRE: nombre,
      RUT: rut,
      CORREO: correo,
      CONTRASEÑA: contrasena,
      TIPO_PERFIL: tipo_perfil,
      DIRECCION: direccion,
      REGIÓN: region,
      COMUNA: comuna
    });
  }

  recoverPassword(correo: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { CORREO: correo });
  }
}
