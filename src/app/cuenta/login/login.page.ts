import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo: string = '';
  contrasena: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login() {
    this.authService.login(this.correo, this.contrasena).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/home']);
        } else {
          this.message = 'Error en inicio de sesión. Verifica tus credenciales.';
        }
      },
      error: (err) => {
        console.error('Error en el inicio de sesión:', err);
        this.message = 'Error en inicio de sesión. Inténtalo de nuevo.';
      }
    });
  }
  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}