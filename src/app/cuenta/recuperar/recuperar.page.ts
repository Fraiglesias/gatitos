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
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
   ;
  }

  recoverPassword() {
    this.authService.recoverPassword(this.correo).subscribe({
      next: (response) => {
        if (response.success) {
          this.message = 'Se ha enviado un correo para restablecer la contraseña.';
        } else {
          this.message = 'No se pudo enviar el correo. Inténtalo de nuevo.';
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