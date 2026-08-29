import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  productId: number = 0;
  products: any;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(): void {
    this.products = JSON.parse(localStorage.getItem('product'));
  }

  addToCart() {
    const existingProduct = this.cartService.addToCart(this.products);
    if (existingProduct) {
      alert('Product already exists in cart');
    } else {
      alert('Product added to cart');
    }
  }
}
