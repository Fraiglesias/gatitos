import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Importa tu servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Verifica si el usuario está autenticado
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      // Si no está autenticado, redirige al login
      this.router.navigate(['/login']);
      return false;
    }
    // Si está autenticado, permite el acceso
    return true;
  }
}
