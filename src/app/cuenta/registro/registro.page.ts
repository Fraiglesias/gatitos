import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      rut: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      direccion: [''],
      region: [''],
      comuna: ['']
    });
  }
  ngOnInit(): void {
    ;
  }



  register() {
    if (this.registroForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos obligatorios correctamente.';
      return;
    }
  
    const userData = {
      NOMBRE: this.registroForm.get('nombre')?.value,
      RUT: this.registroForm.get('rut')?.value,
      CORREO: this.registroForm.get('correo')?.value,
      CONTRASENA: this.registroForm.get('contrasena')?.value, // Verifica que sea 'contrasena'
      TIPO_PERFIL: 1,  // Ajusta este valor según tu lógica
      DIRECCION: this.registroForm.get('direccion')?.value,
      REGION: this.registroForm.get('region')?.value,
      COMUNA: this.registroForm.get('comuna')?.value
    };
  
    console.log("Datos del usuario a registrar:", userData); // Mensaje de depuración para verificar valores
  
    this.authService.registerUser(userData).subscribe({
      next: response => {
        console.log('Usuario registrado:', response);
        alert('Usuario registrado con éxito.');
        this.router.navigate(['/login']);  // Redirige al inicio de sesión u otra página después del registro
      },
      error: error => {
        console.error('Error al crear el perfil:', error);
        if (error.status === 409) {
          this.errorMessage = 'El correo ya está registrado. Por favor, utiliza otro correo.';
        } else {
          this.errorMessage = 'Error al crear el perfil. Por favor, intenta de nuevo más tarde.';
        }
      }
    });
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}
