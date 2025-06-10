import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Order } from '../../models/product.interface';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="success-container">
      <div class="success-content">
        <div class="success-icon">✅</div>
        <h1>¡Pedido Realizado Exitosamente!</h1>
        <p class="success-message">Tu pedido ha sido recibido y está siendo procesado.</p>
        
        <div class="order-details" *ngIf="order">
          <h3>Detalles del Pedido</h3>
          <div class="order-info">
            <div class="info-row">
              <span class="label">Número de Pedido:</span>
              <span class="value">#{{ order.id }}</span>
            </div>
            <div class="info-row">
              <span class="label">Cliente:</span>
              <span class="value">{{ order.customerName }}</span>
            </div>
            <div class="info-row">
              <span class="label">Total:</span>
              <span class="value total">₪{{ order.total }}</span>
            </div>
            <div class="info-row">
              <span class="label">Método de Pago:</span>
              <span class="value">{{ order.paymentMethod === 'bit' ? 'Bit' : 'Transferencia Bancaria' }}</span>
            </div>
            <div class="info-row" *ngIf="order.paymentMethod === 'bit' && order.bitPhoneNumber">
              <span class="label">Teléfono Bit:</span>
              <span class="value">{{ order.bitPhoneNumber }}</span>
            </div>
          </div>
          
          <div class="order-items">
            <h4>Productos Ordenados:</h4>
            <div class="item" *ngFor="let item of order.items">
              <span>{{ item.product.name }} x{{ item.quantity }}</span>
              <span>₪{{ item.product.price * item.quantity }}</span>
            </div>
          </div>
        </div>
        
        <div class="payment-instructions" *ngIf="order">
          <h3>Instrucciones de Pago</h3>
          <div class="instructions" *ngIf="order.paymentMethod === 'transfer'">
            <p><strong>Transferencia Bancaria:</strong></p>
            <p>Por favor realiza la transferencia a los siguientes datos bancarios:</p>
            <div class="bank-details">
              <p><strong>Banco:</strong> Bank Hapoalim</p>
              <p><strong>Número de cuenta:</strong> 12-345-678901</p>
              <p><strong>Nombre:</strong> Tienda Electrónicos</p>
              <p><strong>Referencia:</strong> Pedido #{{ order.id }}</p>
            </div>
          </div>
          
          <div class="instructions" *ngIf="order.paymentMethod === 'bit'">
            <p><strong>Pago con Bit:</strong></p>
            <p>Envía el pago de ₪{{ order.total }} al número:</p>
            <div class="bit-details">
              <p class="phone-number">{{ order.bitPhoneNumber }}</p>
              <p><strong>Referencia:</strong> Pedido #{{ order.id }}</p>
            </div>
          </div>
          
          <div class="contact-info">
            <p>Una vez realizado el pago, nos pondremos en contacto contigo para confirmar y coordinar la entrega.</p>
            <p><strong>Teléfono de contacto:</strong> 050-123-4567</p>
          </div>
        </div>
        
        <div class="actions">
          <button class="btn-primary" routerLink="/products">
            Continuar Comprando
          </button>
          <button class="btn-secondary" (click)="goHome()">
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .success-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
    }

    .success-content {
      max-width: 600px;
      width: 100%;
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .success-icon {
      font-size: 64px;
      margin-bottom: 20px;
    }

    h1 {
      font-size: 28px;
      font-weight: 700;
      color: #059669;
      margin: 0 0 12px 0;
    }

    .success-message {
      font-size: 16px;
      color: #6B7280;
      margin: 0 0 32px 0;
    }

    .order-details {
      text-align: left;
      background: #F9FAFB;
      padding: 24px;
      border-radius: 12px;
      margin-bottom: 24px;
    }

    .order-details h3,
    .payment-instructions h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1F2937;
      margin: 0 0 16px 0;
    }

    .order-info {
      margin-bottom: 20px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #E5E7EB;
    }

    .info-row:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: 600;
      color: #374151;
    }

    .value {
      color: #1F2937;
    }

    .value.total {
      font-weight: 700;
      color: #059669;
      font-size: 18px;
    }

    .order-items h4 {
      font-size: 16px;
      font-weight: 600;
      color: #1F2937;
      margin: 0 0 12px 0;
    }

    .item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      color: #6B7280;
    }

    .payment-instructions {
      text-align: left;
      background: #FEF3C7;
      padding: 24px;
      border-radius: 12px;
      margin-bottom: 32px;
      border-left: 4px solid #F59E0B;
    }

    .instructions p {
      margin: 0 0 8px 0;
      color: #92400E;
    }

    .bank-details,
    .bit-details {
      background: white;
      padding: 16px;
      border-radius: 8px;
      margin: 12px 0;
    }

    .bank-details p,
    .bit-details p {
      margin: 4px 0;
      color: #1F2937;
    }

    .phone-number {
      font-size: 20px !important;
      font-weight: 700 !important;
      color: #2563EB !important;
    }

    .contact-info {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #F3F4F6;
    }

    .contact-info p {
      font-size: 14px;
      color: #6B7280;
    }

    .actions {
      display: flex;
      gap: 16px;
      justify-content: center;
    }

    .btn-primary,
    .btn-secondary {
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary {
      background: #2563EB;
      color: white;
      border: none;
    }

    .btn-primary:hover {
      background: #1D4ED8;
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: white;
      color: #374151;
      border: 2px solid #E5E7EB;
    }

    .btn-secondary:hover {
      border-color: #D1D5DB;
      background: #F9FAFB;
    }

    @media (max-width: 640px) {
      .success-content {
        padding: 24px;
      }
      
      .actions {
        flex-direction: column;
      }
      
      h1 {
        font-size: 24px;
      }
    }
  `]
})
export class OrderSuccessComponent implements OnInit {
  order: Order | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.order = navigation.extras.state['order'];
    }
  }

  ngOnInit(): void {
    if (!this.order) {
      this.router.navigate(['/products']);
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}