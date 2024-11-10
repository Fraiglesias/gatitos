import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule aquí


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  login() {
    if (!this.loginForm) {
      console.error("Formulario de inicio de sesión no inicializado");
      return;
    }

    const correo = this.loginForm.get('correo')?.value;
    const contrasena = this.loginForm.get('contrasena')?.value;

    this.authService.login(correo, contrasena).subscribe({
      next: (response) => {
        if (response && response.user) {
          console.log('Inicio de sesión exitoso');
          // Redirige al usuario a la página de inicio
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Error en inicio de sesión:', error);
        this.errorMessage = 'Error en inicio de sesión. Verifica tus credenciales.';
      }
    });
  }

  
  redirectTo(path: string) {
    this.router.navigate([path]);
  }
  
}