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
  template: `
    <div class="checkout-container">
      <div class="checkout-header">
        <h2>Finalizar Compra</h2>
      </div>
      
      <div class="checkout-content">
        <!-- Order Summary -->
        <div class="order-summary">
          <h3>Resumen del Pedido</h3>
          <div class="summary-items">
            <div class="summary-item" *ngFor="let item of cartItems">
              <span>{{ item.product.name }} x{{ item.quantity }}</span>
              <span>₪{{ item.product.price * item.quantity }}</span>
            </div>
          </div>
          <div class="summary-total">
            <strong>Total: ₪{{ getCartTotal() }}</strong>
          </div>
        </div>
        
        <!-- Customer Form -->
        <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()" class="checkout-form">
          <div class="form-section">
            <h3>Información Personal</h3>
            
            <div class="form-group">
              <label for="customerName">Nombre Completo *</label>
              <input
                type="text"
                id="customerName"
                formControlName="customerName"
                placeholder="Ingresa tu nombre completo"
              />
              <div class="error-message" *ngIf="checkoutForm.get('customerName')?.invalid && checkoutForm.get('customerName')?.touched">
                El nombre es obligatorio
              </div>
            </div>
            
            <div class="form-group">
              <label for="customerPhone">Teléfono *</label>
              <input
                type="tel"
                id="customerPhone"
                formControlName="customerPhone"
                placeholder="Ej: 050-1234567"
              />
              <div class="error-message" *ngIf="checkoutForm.get('customerPhone')?.invalid && checkoutForm.get('customerPhone')?.touched">
                El teléfono es obligatorio
              </div>
            </div>
            
            <div class="form-group">
              <label for="customerEmail">Email *</label>
              <input
                type="email"
                id="customerEmail"
                formControlName="customerEmail"
                placeholder="tu@email.com"
              />
              <div class="error-message" *ngIf="checkoutForm.get('customerEmail')?.invalid && checkoutForm.get('customerEmail')?.touched">
                <span *ngIf="checkoutForm.get('customerEmail')?.errors?.['required']">El email es obligatorio</span>
                <span *ngIf="checkoutForm.get('customerEmail')?.errors?.['email']">Formato de email inválido</span>
              </div>
            </div>
          </div>
          
          <div class="form-section">
            <h3>Método de Pago</h3>
            
            <div class="payment-methods">
              <div class="payment-option">
                <input
                  type="radio"
                  id="transfer"
                  value="transfer"
                  formControlName="paymentMethod"
                />
                <label for="transfer" class="payment-label">
                  <div class="payment-icon">🏦</div>
                  <div class="payment-info">
                    <strong>Transferencia Bancaria</strong>
                    <p>Realizarás la transferencia manualmente después de confirmar el pedido</p>
                  </div>
                </label>
              </div>
              
              <div class="payment-option">
                <input
                  type="radio"
                  id="bit"
                  value="bit"
                  formControlName="paymentMethod"
                />
                <label for="bit" class="payment-label">
                  <div class="payment-icon">📱</div>
                  <div class="payment-info">
                    <strong>Bit</strong>
                    <p>Pago rápido y seguro con la app Bit</p>
                  </div>
                </label>
              </div>
            </div>
            
            <div class="form-group" *ngIf="checkoutForm.get('paymentMethod')?.value === 'bit'">
              <label for="bitPhoneNumber">Número de teléfono para Bit *</label>
              <input
                type="tel"
                id="bitPhoneNumber"
                formControlName="bitPhoneNumber"
                placeholder="Número de teléfono del destinatario"
              />
              <div class="error-message" *ngIf="checkoutForm.get('bitPhoneNumber')?.invalid && checkoutForm.get('bitPhoneNumber')?.touched">
                El número de teléfono para Bit es obligatorio
              </div>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn-secondary" (click)="goBack()">
              Volver al Carrito
            </button>
            <button 
              type="submit" 
              class="btn-primary"
              [disabled]="checkoutForm.invalid || isProcessing"
            >
              {{ isProcessing ? 'Procesando...' : 'Confirmar Pedido' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .checkout-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .checkout-header h2 {
      font-size: 28px;
      font-weight: 700;
      color: #1F2937;
      margin: 0;
    }

    .checkout-content {
      display: grid;
      gap: 24px;
    }

    .order-summary {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .order-summary h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1F2937;
      margin: 0 0 16px 0;
    }

    .summary-items {
      border-bottom: 1px solid #E5E7EB;
      padding-bottom: 16px;
      margin-bottom: 16px;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      color: #6B7280;
    }

    .summary-total {
      font-size: 18px;
      color: #1F2937;
    }

    .checkout-form {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .form-section {
      margin-bottom: 32px;
    }

    .form-section h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1F2937;
      margin: 0 0 20px 0;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      font-weight: 600;
      color: #374151;
      margin-bottom: 8px;
    }

    .form-group input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #E5E7EB;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.2s ease;
    }

    .form-group input:focus {
      outline: none;
      border-color: #2563EB;
    }

    .error-message {
      color: #DC2626;
      font-size: 14px;
      margin-top: 4px;
    }

    .payment-methods {
      display: grid;
      gap: 16px;
    }

    .payment-option {
      position: relative;
    }

    .payment-option input[type="radio"] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .payment-label {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border: 2px solid #E5E7EB;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .payment-option input[type="radio"]:checked + .payment-label {
      border-color: #2563EB;
      background: #EFF6FF;
    }

    .payment-icon {
      font-size: 24px;
      flex-shrink: 0;
    }

    .payment-info strong {
      display: block;
      color: #1F2937;
      margin-bottom: 4px;
    }

    .payment-info p {
      color: #6B7280;
      font-size: 14px;
      margin: 0;
    }

    .form-actions {
      display: flex;
      gap: 16px;
      margin-top: 32px;
    }

    .btn-secondary {
      flex: 1;
      padding: 16px;
      border: 2px solid #E5E7EB;
      background: white;
      color: #374151;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-secondary:hover {
      border-color: #D1D5DB;
      background: #F9FAFB;
    }

    .btn-primary {
      flex: 2;
      padding: 16px;
      background: #2563EB;
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary:hover:not(:disabled) {
      background: #1D4ED8;
      transform: translateY(-1px);
    }

    .btn-primary:disabled {
      background: #9CA3AF;
      cursor: not-allowed;
      transform: none;
    }

    @media (min-width: 768px) {
      .checkout-content {
        grid-template-columns: 1fr 2fr;
      }
    }

    @media (max-width: 640px) {
      .form-actions {
        flex-direction: column;
      }
    }
  `]
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