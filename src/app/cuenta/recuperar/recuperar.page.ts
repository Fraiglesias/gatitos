import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  correo: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
}