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
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      // Redirige al login y pasa la URL a la que intentaba acceder
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false; // Bloquea el acceso a la ruta
    }

    return true; // Permite el acceso a la ruta si el usuario está autenticado
  }
}
