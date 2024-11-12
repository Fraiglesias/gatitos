import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000/api/usuarios'; // URL de la API

  constructor(private http: HttpClient, private router: Router) {}
  

  login(correo: string, contrasena: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { CORREO: correo, CONTRASENA: contrasena };

    console.log("Enviando solicitud de inicio de sesión con:", body);

    return this.http.post<any>(`${this.apiUrl}`, body, { headers });
  }
  
  logout() {
    // Limpia cualquier información de sesión
    localStorage.removeItem('authToken'); // Ejemplo: eliminar token de autenticación
    this.router.navigate(['/login']);
  }

  createProfile(profileData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}`, profileData, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  isAuthenticated(): boolean {
    // Comprueba si el token existe
    return !!localStorage.getItem('authToken');
  }

  recoverPassword(correo: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/recover-password`, { CORREO: correo }, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Error en la solicitud; por favor intenta de nuevo más tarde.'));
  }
}
