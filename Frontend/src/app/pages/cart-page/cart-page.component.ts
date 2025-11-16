import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPosition = 20;

    // Company Header
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Print Median Enterprises', pageWidth / 2, yPosition, {
      align: 'center',
    });

    yPosition += 8;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Professional Printing Services', pageWidth / 2, yPosition, {
      align: 'center',
    });

    yPosition += 5;
    pdf.text(
      'Contact: +91-XXXXXXXXXX | Email: info@printmedian.com',
      pageWidth / 2,
      yPosition,
      { align: 'center' }
    );

    // Line separator
    yPosition += 8;
    pdf.setLineWidth(0.5);
    pdf.line(15, yPosition, pageWidth - 15, yPosition);

    // Invoice details
    yPosition += 10;
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INVOICE', 15, yPosition);

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Date: ${this.dateString}`, pageWidth - 15, yPosition, {
      align: 'right',
    });

    yPosition += 7;
    pdf.text(
      `Invoice #: INV-${Date.now().toString().slice(-8)}`,
      pageWidth - 15,
      yPosition,
      { align: 'right' }
    );

    // Customer Section (if needed)
    yPosition += 15;
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Bill To:', 15, yPosition);
    yPosition += 6;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Customer Name', 15, yPosition);

    // Table Header
    yPosition += 15;
    pdf.setFillColor(52, 73, 94);
    pdf.rect(15, yPosition - 5, pageWidth - 30, 10, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Sr.', 20, yPosition);
    pdf.text('Product Name', 40, yPosition);
    pdf.text('Qty', 120, yPosition);
    pdf.text('Size', 145, yPosition);
    pdf.text('Price (Rs.)', pageWidth - 25, yPosition, { align: 'right' });

    // Reset text color for items
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'normal');

    // Product Items
    yPosition += 10;
    this.cartProducts.forEach((product, index) => {
      // Check if we need a new page
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }

      // Alternate row background
      if (index % 2 === 0) {
        pdf.setFillColor(245, 245, 245);
        pdf.rect(15, yPosition - 5, pageWidth - 30, 10, 'F');
      }

      pdf.text(`${index + 1}`, 20, yPosition);

      // Truncate long product names
      const productName =
        product.name.length > 30
          ? product.name.substring(0, 27) + '...'
          : product.name;
      pdf.text(productName, 40, yPosition);

      pdf.text(`${product.quantity}`, 120, yPosition);

      // Get selected size
      const selectedSize =
        product.size.find((s) => s.value === this.size)?.type || 'N/A';
      pdf.text(selectedSize, 145, yPosition);

      pdf.text(
        `${product.productPrice.toFixed(2)}`,
        pageWidth - 25,
        yPosition,
        { align: 'right' }
      );

      yPosition += 10;
    });

    // Line separator before totals
    yPosition += 5;
    pdf.setLineWidth(0.3);
    pdf.line(15, yPosition, pageWidth - 15, yPosition);

    // Totals Section
    yPosition += 10;
    const labelX = pageWidth - 80;
    const valueX = pageWidth - 25;

    pdf.setFont('helvetica', 'normal');
    pdf.text('Subtotal:', labelX, yPosition);
    pdf.text(`Rs. ${this.productPrice.toFixed(2)}`, valueX, yPosition, {
      align: 'right',
    });

    if (this.productPrice > 1000) {
      yPosition += 7;
      pdf.text('Discount:', labelX, yPosition);
      pdf.text(`- Rs. ${this.discount.toFixed(2)}`, valueX, yPosition, {
        align: 'right',
      });
    }

    yPosition += 7;
    pdf.setLineWidth(0.2);
    pdf.line(labelX - 5, yPosition, pageWidth - 15, yPosition);

    yPosition += 7;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Total Amount:', labelX, yPosition);
    pdf.text(`Rs. ${this.totalPrice.toFixed(2)}`, valueX, yPosition, {
      align: 'right',
    });

    // Footer
    yPosition += 20;
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(100, 100, 100);
    pdf.text('Thank you for your business!', pageWidth / 2, yPosition, {
      align: 'center',
    });

    yPosition += 5;
    pdf.text(
      'Terms & Conditions: Payment due within 30 days',
      pageWidth / 2,
      yPosition,
      { align: 'center' }
    );

    // Page border
    pdf.setDrawColor(52, 73, 94);
    pdf.setLineWidth(1);
    pdf.rect(10, 10, pageWidth - 20, pdf.internal.pageSize.getHeight() - 20);

    // Save the PDF
    pdf.save(`Invoice-${Date.now()}.pdf`);
  }
}
