import { Injectable } from '@angular/core';
import { ClProducto } from './model/Clproducto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carrito: { producto: ClProducto, cantidad: number, precioFinal: number }[] = [];

  constructor() {
    this.loadCartFromLocalStorage();
  }

  addToCart(producto: ClProducto) {
    const index = this.carrito.findIndex(item => item.producto === producto);
    if (index === -1) {
      const precioFinal = producto.breed === 'Makita' ? this.getDiscountedPrice(producto.age) : producto.age;
      this.carrito.push({ producto, cantidad: 1, precioFinal });
    } else {
      this.carrito[index].cantidad++;
    }
    this.updateCart(this.carrito);
  }

  removeFromCart(producto: ClProducto) {
    const index = this.carrito.findIndex(item => item.producto === producto);
    if (index !== -1) {
      this.carrito.splice(index, 1);
    }
    this.updateCart(this.carrito);
  }

  getCart() {
    return this.carrito;
  }

  updateCart(carrito: { producto: ClProducto, cantidad: number, precioFinal: number }[]) {
    this.carrito = carrito;
    this.saveCartToLocalStorage();
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('carrito');
    if (storedCart) {
      this.carrito = JSON.parse(storedCart);
    }
  }

  getDiscountedPrice(price: number): number {
    return price * 0.8; // Aplica un descuento del 20%
  }
}
