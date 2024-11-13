import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000/api/usuarios'; // URL de la API
  private apiUrlV = 'http://127.0.0.1:5000/api/usuarios/validar'; // URL de la API
  private apiUrlR = 'http://127.0.0.1:5000/api/usuarios/recover-password'; // URL de la API
  private userData: any;
  constructor(private http: HttpClient, private router: Router) {}
  

  login(correo: string, contrasena: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { CORREO: correo.trim(),  CONTRASENA: contrasena };

    console.log("Enviando solicitud de inicio de sesión con:", body);

    return this.http.post<any>(`${this.apiUrlV}`, body, { headers }).pipe(
      tap((response) => {
        console.log("Respuesta del servidor:", response);  // Esto te ayudará a ver si tienes los datos correctos
        if (response && response.user) {
          this.userData = response.user;
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      }),
      catchError((error) => {
        console.error("Error en la autenticación:", error);
        return throwError("Error en inicio de sesión. Verifica tus credenciales.");
      })
    );
}


getUserName(): string | null {
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  return storedUser ? storedUser.NOMBRE : null;
}
  
  logout() {
    // Limpia cualquier información de sesión
    localStorage.removeItem('authToken'); // Ejemplo: eliminar token de autenticación
    this.router.navigate(['/login']);
  }

  registerUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}`, userData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        if (error.status === 0) {
          console.error('No se pudo conectar con el servidor. Verifica que esté en ejecución y que CORS esté habilitado.');
        } else {
          console.error(`Error del servidor: ${error.status} - ${error.message}`);
        }
        return throwError(() => new Error('Error en la solicitud; por favor intenta de nuevo más tarde.'));
      })
    );
  }
  
  isAuthenticated(): boolean {
    // Comprueba si el token existe
    return !!localStorage.getItem('authToken');
  }

  recoverPassword(correo: string, newPassword: string): Observable<any> {
    const body = { correo, new_password: newPassword };
    return this.http.put<any>(this.apiUrlR, body, httpOptions).pipe(
      catchError((error) => {
        console.error('Error en recuperación de contraseña:', error);
        throw error;
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Error en la solicitud; por favor intenta de nuevo más tarde.'));
  }
}
