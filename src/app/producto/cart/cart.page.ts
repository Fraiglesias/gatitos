import { Component, OnInit } from '@angular/core';
import { ClProducto } from '../model/Clproducto';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  carrito: { producto: ClProducto, cantidad: number, precioFinal: number }[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.carrito = this.cartService.getCart();
  }

  removeFromCart(producto: ClProducto) {
    this.cartService.removeFromCart(producto);
    this.loadCart();
  }

  volver(path: string) {
    this.router.navigate([path]);
  }

  increaseQuantity(producto: ClProducto) {
    this.cartService.addToCart(producto);
    this.loadCart();
  }

  decreaseQuantity(producto: ClProducto) {
    const cartItem = this.carrito.find(item => item.producto === producto);
    if (cartItem && cartItem.cantidad > 1) {
      cartItem.cantidad--;
      this.cartService.updateCart(this.carrito);
      this.loadCart();
    }
  }

  getTotalPrice(producto: ClProducto, cantidad: number, precioFinal: number): number {
    return precioFinal * cantidad;
  }

  getTotalCartPrice(): number {
    return this.carrito.reduce((total, item) => total + this.getTotalPrice(item.producto, item.cantidad, item.precioFinal), 0);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  }

  extractDigits(text: string): number {
    return parseInt(text.replace(/\D/g, ''), 10);
  }

  getDiscountedPrice(price: number): number {
    return price * 0.8; // Aplica un descuento del 20%
  }

  Comprar() {
    const totalCarrito = this.formatPrice(this.getTotalCartPrice());
    const onlyNumber = this.extractDigits(totalCarrito.toString());

    fetch(`http://127.0.0.1:5000/api/transbank?amount=${onlyNumber}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud a Transbank');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        const token = data.token;
        const newRoute = data.url;
        const url = `${newRoute}?token_ws=${token}`;
        window.location.href = url;
      })
      .catch(error => {
        console.error('Error al llamar a Transbank:', error);
      });
  }
}
