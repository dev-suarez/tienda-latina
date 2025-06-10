import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { CartItem, PaymentInfo } from '../../models/product.interface';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cartItems: CartItem[] = [];
  isProcessing = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    
    if (this.cartItems.length === 0) {
      this.router.navigate(['/cart']);
      return;
    }

    this.checkoutForm = this.fb.group({
      customerName: ['', [Validators.required]],
      customerPhone: ['', [Validators.required]],
      customerEmail: ['', [Validators.required, Validators.email]],
      paymentMethod: ['transfer', [Validators.required]],
      bitPhoneNumber: ['']
    });

    // Add conditional validator for Bit phone number
    this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      const bitPhoneControl = this.checkoutForm.get('bitPhoneNumber');
      if (method === 'bit') {
        bitPhoneControl?.setValidators([Validators.required]);
      } else {
        bitPhoneControl?.clearValidators();
      }
      bitPhoneControl?.updateValueAndValidity();
    });
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  goBack(): void {
    this.router.navigate(['/cart']);
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      this.isProcessing = true;
      
      const formValue = this.checkoutForm.value;
      const paymentInfo: PaymentInfo = {
        method: formValue.paymentMethod,
        bitPhoneNumber: formValue.paymentMethod === 'bit' ? formValue.bitPhoneNumber : undefined
      };

      // Create the order
      const order = this.orderService.createOrder(
        this.cartItems,
        formValue.customerName,
        formValue.customerPhone,
        formValue.customerEmail,
        paymentInfo
      );

      // Update product stock
      this.cartItems.forEach(item => {
        const product = this.productService.getProductById(item.product.id);
        if (product) {
          this.productService.updateStock(product.id, product.stock - item.quantity);
        }
      });

      // Clear cart
      this.cartService.clearCart();

      // Redirect to success page with order info
      setTimeout(() => {
        this.isProcessing = false;
        this.router.navigate(['/order-success'], { 
          state: { order } 
        });
      }, 2000);
    }
  }
}