import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cart-container">
      <div class="cart-header">
        <h2>Tu Carrito</h2>
        <div class="cart-count">{{ getCartItemCount() }} productos</div>
      </div>
      
      <div class="cart-content" *ngIf="cartItems$ | async as items">
        <div class="cart-items" *ngIf="items.length > 0">
          <div class="cart-item" *ngFor="let item of items">
            <div class="item-image">
              <img [src]="item.product.imageUrl" [alt]="item.product.name" />
            </div>
            
            <div class="item-info">
              <h3>{{ item.product.name }}</h3>
              <p class="item-price">₪{{ item.product.price }}</p>
              
              <div class="quantity-controls">
                <button 
                  class="quantity-btn"
                  (click)="decreaseQuantity(item.product.id)"
                >-</button>
                <span class="quantity">{{ item.quantity }}</span>
                <button 
                  class="quantity-btn"
                  (click)="increaseQuantity(item.product.id)"
                >+</button>
              </div>
            </div>
            
            <div class="item-total">
              <div class="total-price">₪{{ item.product.price * item.quantity }}</div>
              <button 
                class="remove-btn"
                (click)="removeItem(item.product.id)"
              >🗑️</button>
            </div>
          </div>
          
          <div class="cart-summary">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span class="amount">₪{{ getCartTotal() }}</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span class="amount">₪{{ getCartTotal() }}</span>
            </div>
            
            <button 
              class="checkout-btn"
              routerLink="/checkout"
            >
              Proceder al Pago
            </button>
          </div>
        </div>
        
        <div class="empty-cart" *ngIf="items.length === 0">
          <div class="empty-icon">🛒</div>
          <h3>Tu carrito está vacío</h3>
          <p>Agrega algunos productos para continuar</p>
          <button class="continue-shopping" routerLink="/products">
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .cart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #E5E7EB;
    }

    .cart-header h2 {
      font-size: 24px;
      font-weight: 700;
      color: #1F2937;
      margin: 0;
    }

    .cart-count {
      background: #EFF6FF;
      color: #2563EB;
      padding: 8px 12px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 14px;
    }

    .cart-item {
      display: flex;
      gap: 16px;
      padding: 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 16px;
    }

    .item-image {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      overflow: hidden;
      flex-shrink: 0;
    }

    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .item-info {
      flex: 1;
    }

    .item-info h3 {
      font-size: 16px;
      font-weight: 600;
      color: #1F2937;
      margin: 0 0 8px 0;
    }

    .item-price {
      color: #059669;
      font-weight: 600;
      margin: 0 0 12px 0;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .quantity-btn {
      width: 32px;
      height: 32px;
      border: 2px solid #E5E7EB;
      background: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    .quantity-btn:hover {
      border-color: #2563EB;
      color: #2563EB;
    }

    .quantity {
      font-weight: 600;
      min-width: 24px;
      text-align: center;
    }

    .item-total {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    }

    .total-price {
      font-size: 18px;
      font-weight: 700;
      color: #1F2937;
    }

    .remove-btn {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: background 0.2s ease;
    }

    .remove-btn:hover {
      background: #FEE2E2;
    }

    .cart-summary {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-top: 24px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
    }

    .summary-row.total {
      border-top: 2px solid #E5E7EB;
      margin-top: 12px;
      padding-top: 16px;
      font-size: 18px;
      font-weight: 700;
    }

    .amount {
      font-weight: 600;
      color: #059669;
    }

    .checkout-btn {
      width: 100%;
      background: #2563EB;
      color: white;
      border: none;
      padding: 16px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 20px;
      transition: all 0.3s ease;
    }

    .checkout-btn:hover {
      background: #1D4ED8;
      transform: translateY(-1px);
    }

    .empty-cart {
      text-align: center;
      padding: 60px 20px;
    }

    .empty-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }

    .empty-cart h3 {
      font-size: 20px;
      color: #1F2937;
      margin: 0 0 8px 0;
    }

    .empty-cart p {
      color: #6B7280;
      margin: 0 0 24px 0;
    }

    .continue-shopping {
      background: #2563EB;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .continue-shopping:hover {
      background: #1D4ED8;
      transform: translateY(-1px);
    }

    @media (max-width: 640px) {
      .cart-header {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
      }
      
      .cart-item {
        flex-direction: column;
        gap: 12px;
      }
      
      .item-total {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartItems$;
  }

  increaseQuantity(productId: number): void {
    const items = this.cartService.getCartItems();
    const item = items.find(i => i.product.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: number): void {
    const items = this.cartService.getCartItems();
    const item = items.find(i => i.product.id === productId);
    if (item && item.quantity > 1) {
      this.cartService.updateQuantity(productId, item.quantity - 1);
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  getCartItemCount(): number {
    return this.cartService.getCartItemCount();
  }
}