import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, ObservableInput } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000/api/usuarios'; // URL de la API
    handleError: ((err: any, caught: Observable<Object>) => ObservableInput<any>) | undefined;
    

  constructor(private http: HttpClient,private router: Router) {}

  login(correo: string, contrasena: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { CORREO: correo, CONTRASENA: contrasena };

    console.log("Enviando solicitud de inicio de sesión con:", body);  // Agrega este console.log

    return this.http.post<any>(this.apiUrl, body, { headers });
}

logout() {
    // Limpia cualquier información de sesión (puedes agregar más si tienes otros datos)
    localStorage.removeItem('user'); // Ejemplo: eliminar datos de usuario almacenados

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
  createProfile(profileData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl, profileData, { headers });
  }
  
  isAuthenticated(): boolean {
    // Comprueba si el token existe
    return !!localStorage.getItem('authToken');
  }


  recoverPassword(correo: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { CORREO: correo });
  }
}
