import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  correo: string = '';
  newPassword: string = ''; // Agregar esta propiedad
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
   ;
  }

  recoverPassword() {
    this.authService.recoverPassword(this.correo, this.newPassword).subscribe({
      next: (response) => {
        if (response.success) {
          this.message = 'Contraseña actualizada correctamente.';
          // Redirigir al login después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.message = 'No se pudo actualizar la contraseña. Inténtalo de nuevo.';
        }
      },
      error: (err) => {
        console.error('Error en recuperación de contraseña:', err);
        this.message = 'Error en recuperación de contraseña. Inténtalo de nuevo.';
      }
    });
  }
  
  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}