import { Component, Input, OnInit } from '@angular/core';

import { ClProducto } from '../producto/model/Clproducto';
import { ProductServiceService } from '../producto/product-service.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../producto/cart.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @Input() producto!: ClProducto;
  productos: ClProducto[] = [];
  ofertas: ClProducto[] = [];
  novedad: ClProducto[] = [];
  searchTerm: string = ''; // Añadido para la búsqueda
  busqueda: ClProducto[] = [];
  carrito: { producto: ClProducto, cantidad: number, precioFinal: number }[] = [];

 


 

  constructor(
    private restApi: ProductServiceService,
    private loadingController: LoadingController,   
    private router: Router,
    private cartService: CartService,
    private authService: AuthService) {}

  // Función para redirigir a otra página
  redirectTo(path: string) {
    this.router.navigate([path]);
  }
  
  redirectTo2(id: number) {
    this.router.navigate([`/product-detail/${id}`]); // Redirige a la página de detalles con el ID del gatito
  }
  ngOnInit() {
    this.getProducts();
  }
  onLogout() {
    this.authService.logout();
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
        
        
        loading.dismiss();
        this.busqueda = this.productos;
      },
      error: (err) => {
        console.log("Error:", err);
        loading.dismiss();
      }
    });
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
  formatPrice(price: number): string {
    return price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  }
  getDiscountedPrice(price: number): number {
    return price * 0.8; // Aplica un descuento del 20%
  }
  buscarGatito(event: any) {
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
