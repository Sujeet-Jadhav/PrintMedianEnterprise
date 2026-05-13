import { Injectable } from '@angular/core';

const cart = 'cart-products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart-product';

  addToCart(product: any) {
    const cartProducts = this.getCartProducts();
    const productsToAdd = Array.isArray(product) ? product : [product];

    const existingProduct = cartProducts.findIndex(
      (item) => item.id === product.id
    );

    if (existingProduct === -1) {
      cartProducts.push(...productsToAdd);
      this.storeCartProducts(cartProducts);
      return true;
    } else {
      console.warn('Product already exists in cart (consider quantity update)');
      return false;
    }
  }

  getCartProducts(): any[] {
    const cartString = localStorage.getItem(this.cartKey);
    try {
      return cartString ? JSON.parse(cartString) : [];
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return [];
    }
  }

  isProductInCart(productId: number | string): boolean {
    const cartProducts = this.getCartProducts();
    return cartProducts.some((item) => item.id === productId);
  }

  storeCartProducts(cartProducts: any[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cartProducts));
  }

  removeFromCart(productId: number | string): void {
    const cartProducts = this.getCartProducts();
    const productIndex = cartProducts.findIndex(
      (item) => item.id === productId
    );

    if (productIndex !== -1) {
      cartProducts.splice(productIndex, 1);
      this.storeCartProducts(cartProducts);
    } else {
      console.warn('Product not found in cart');
    }
  }

  addDetails(total: any) {
    localStorage.setItem('total', JSON.stringify(total));
  }

  getDetails() {
    const totalString = localStorage.getItem('total');
    try {
      return totalString ? JSON.parse(totalString) : {};
    } catch (error) {
      console.error('Error parsing total from localStorage:', error);
      return {};
    }
  }
}
