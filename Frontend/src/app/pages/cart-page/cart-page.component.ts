import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  size: number = 1;
  cartProducts = [
    // {
    //   id: 1,
    //   name: 'Digital Prints',
    //   image: '../../assets/images/Digital.jpg',
    //   description: 'Description of Product 1',
    //   quantity: 10,
    //   value: 10,
    //   price: 2,
    //   productPrice: 0,
    //   size: [
    //     {
    //       type: 'Small',
    //       value: 10,
    //     },
    //     {
    //       type: 'Medium',
    //       value: 20,
    //     },
    //     {
    //       type: 'Large',
    //       value: 30,
    //     },
    //   ],
    // },
  ];

  pdf: jsPDF;

  constructor(private cartService: CartService) {
    this.cartProducts = this.cartService.getCartProducts();
    this.cartProducts.forEach((element, i) => {
      this.getTotal(i);
      this.getSize(element.size[0].value.toString(), i);
    });

    const pdf = new jsPDF();
  }

  ngOnInit(): void {
    this.totalItems = this.cartProducts.length;
    this.updateTotal();
  }

  totalPrice = 0;
  productPrice = 0;
  Cartprice = 0;
  totalItems = 0;
  tax = 10;
  discount = 100;
  delivery = 'delivery';
  date = new Date();
  dateString = this.date.toLocaleDateString();

  getSize(size: string, index: number) {
    this.size = parseInt(size);
    this.getTotal(index);
    this.updateTotal();
  }

  getTotal(index: number) {
    this.cartProducts[index].productPrice =
      this.cartProducts[index].quantity *
      this.cartProducts[index].price *
      this.size;
  }

  incrementQuantity(index: number) {
    this.cartProducts[index].quantity += this.cartProducts[index].value;
    this.getTotal(index);
    this.updateTotal();
  }

  updateTotal() {
    this.totalPrice = this.cartProducts.reduce(
      (total, product) => total + product.productPrice,
      0
    );
    this.productPrice = this.totalPrice;
    if (this.totalPrice > 1000) this.totalPrice -= this.discount;
  }

  decrementQuantity(index: number) {
    if (this.cartProducts[index].quantity > 0) {
      this.cartProducts[index].quantity -= this.cartProducts[index].value;
      this.getTotal(index);
      this.updateTotal();
    }
  }

  remove(index: number) {
    this.cartService.removeFromCart(index);
    this.cartProducts = this.cartService.getCartProducts();
    this.totalItems--;
  }

  generatePDF() {
    const print = document.getElementById('contentToConvert');
    html2canvas(print, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, 200, 300);
      pdf.text(`Product List`, 50, 130);
      // Add product details to the PDF
      this.cartProducts.forEach((product, index) => {
        const y = 150 + index * 30;
        pdf.text(`Sr: ${index + 1}`, 5, y);
        pdf.text(`Product Name: ${product.name}`, 25, y);
        pdf.text(`Quantity: ${product.quantity}`, 25, y + 10);
        pdf.text(`Price: Rs.${product.productPrice}`, 25, y + 20);
      });

      pdf.save('Bill.pdf');
    });
  }
}
