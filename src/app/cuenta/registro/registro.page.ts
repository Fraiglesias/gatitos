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

  onSubmit() {
    const profileData = {
      NOMBRE: this.registroForm.get('nombre')?.value,
      RUT: this.registroForm.get('rut')?.value,
      CORREO: this.registroForm.get('correo')?.value,
      CONTRASENA: this.registroForm.get('contrasena')?.value,
      DIRECCIÓN: this.registroForm.get('direccion')?.value,
      REGIÓN: this.registroForm.get('region')?.value,
      COMUNA: this.registroForm.get('comuna')?.value,
      TIPO_PERFIL: 1 // Por ejemplo, se puede ajustar según el tipo de perfil
    };

    this.authService.createProfile(profileData).subscribe({
      next: (response) => {
        console.log('Perfil creado:', response);
        this.router.navigate(['/login']);  // Redirige al inicio de sesión después de crear la cuenta
      },
      error: (error) => {
        console.error('Error al crear el perfil:', error);
        this.errorMessage = 'No se pudo crear el perfil. Inténtalo de nuevo.';
      }
    });
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}