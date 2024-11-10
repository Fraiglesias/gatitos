import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ClProducto } from '../model/Clproducto';
import { ProductServiceService } from '../product-service.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  productos: ClProducto[] = [];
  searchTerm: string = ''; // Añadido para la búsqueda
  busqueda: ClProducto[] = [];

  constructor(
    private restApi: ProductServiceService,
    private loadingController: LoadingController,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    this.restApi.getProducts().subscribe({
      next: (res: ClProducto[]) => {
        console.log('Productos recibidos:', res);
        this.productos = res.map(producto => new ClProducto(producto));
        this.busqueda = this.productos;
        loading.dismiss();
      },
      error: (err) => {
        console.log("Error:", err);
        loading.dismiss();
      }
    });
  }

  redirectTo(id: number) {
    this.router.navigate([`/product-detail/${id}`]); // Redirige a la página de detalles con el ID del gatito
  }
  handleRefresh(event: { target: { complete: () => void } }) {
    setTimeout(() => {
      event.target.complete();
      this.getProducts();
    }, 2000);
  }

  addToCart(producto: ClProducto) {
    this.cartService.addToCart(producto);
    console.log('Producto agregado al carrito:', producto);
  }
  volver(path: string) {
    this.router.navigate([path]);
  }
  formatPrice(price: number): string {
    return price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  }
  getDiscountedPrice(price: number): number {
    return price * 0.8; // Aplica un descuento del 20%
  }

  buscarProducto(event: any) {
    const term = event.target.value.toLowerCase().trim();
    if (!term) {
      this.busqueda = []; // Si no hay término de búsqueda, muestra la lista vacía
    } else {
      this.busqueda = this.productos.filter(producto =>
        producto.name.toLowerCase().includes(term) ||
        producto.breed.toLowerCase().includes(term) ||
        producto.description.toLowerCase().includes(term)
      );
    }
    console.log('Productos encontrados:', this.busqueda);
  }
}
