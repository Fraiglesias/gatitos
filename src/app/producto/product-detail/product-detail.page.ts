import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { ClProducto } from '../model/Clproducto';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  // Objeto del gatito con las propiedades adecuadas
  producto: ClProducto = {
    id: 0,            // ID del gatito
    name: '',         // Nombre del gatito
    breed: '',        // Raza del gatito
    age: 0,           // Edad en años
    birthdate: '',    // Fecha de nacimiento
    description: '',  // Descripción
  };
  product: ClProducto | undefined;


  constructor(
    private productService: ProductServiceService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadKittenDetails();
  }

  // Función para cargar los detalles del gatito
  async loadKittenDetails() {
    const idString = this.route.snapshot.paramMap.get('id')!;
    const id = parseInt(idString, 10);

    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present();

    this.productService.getProduct(id).subscribe({
      next: (res) => {
        this.product = res;
        loading.dismiss();
      },
      error: (err) => {
        console.error("Error al cargar los detalles del gatito:", err);
        loading.dismiss();
      }
    });
  }

  // Método para confirmar la eliminación del gatito
  async delete(id: number) {
    const alert = await this.alertController.create({
      header: '¡Advertencia!',
      message: '¿Está seguro de que desea eliminar este gatito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => this.confirmDelete(id)
        }
      ]
    });
    await alert.present();
  }

  // Función para eliminar el gatito confirmado
  async confirmDelete(id: number) {
    const loading = await this.loadingController.create({ message: 'Eliminando...' });
    await loading.present();

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        loading.dismiss();
        this.router.navigate(['/product-list']); // Redirige a la lista después de eliminar
      },
      error: (err) => {
        console.error("Error al eliminar el gatito:", err);
        loading.dismiss();
      }
    });
  }
}
