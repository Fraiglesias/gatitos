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
  producto: ClProducto | null = null;

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
    const idString = this.route.snapshot.paramMap.get('id');
    const id = idString ? parseInt(idString, 10) : null;

    if (!id) {
      console.error("ID no válido");
      return;
    }

    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present();

    this.productService.getProduct(id).subscribe({
      next: (res) => {
        this.producto = res || null;
        loading.dismiss();
      },
      error: (err) => {
        console.error("Error al cargar los detalles del gatito:", err);
        loading.dismiss();
      }
    });
  }

  // Método para confirmar la eliminación del gatito
  async delete(id: number | undefined) {
    if (!id) return;
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
          handler: () => this.Delete(id)
        }
      ]
    });
    await alert.present();
  }

  async Delete(id: number | undefined) {
    if (id == null) {  // Verifica si el id es undefined o null
      console.error("ID no válido para eliminar.");
      return;
    }
  
    const loading = await this.loadingController.create({ message: 'Eliminando...' });
    await loading.present();
  
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        loading.dismiss();
        this.router.navigate(['/home']); // Redirige a la lista después de eliminar
      },
      error: (err) => {
        console.error("Error al eliminar el gatito:", err);
        loading.dismiss();
      }
    });
  }
  
}
