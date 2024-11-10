import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre: string = '';
  rut: string = '';
  correo: string = '';
  contrasena: string = '';
  tipo_perfil: number = 1; // Asumiendo perfil de usuario regular
  direccion: string = '';
  region: string = '';
  comuna: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  register() {
    this.authService.register(this.nombre, this.rut, this.correo, this.contrasena, this.tipo_perfil, this.direccion, this.region, this.comuna).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/login']);
        } else {
          this.message = 'Error en el registro. Inténtalo de nuevo.';
        }
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        this.message = 'Error en el registro. Inténtalo de nuevo.';
      }
    });
  }
}