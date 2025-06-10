import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-card">
      <div class="product-image">
        <img [src]="product.imageUrl" [alt]="product.name" />
        <div class="stock-badge" [class.low-stock]="product.stock <= 5">
          {{ product.stock }} disponibles
        </div>
      </div>
      
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-category">{{ product.category }}</div>
        
        <div class="product-footer">
          <div class="product-price">₪{{ product.price }}</div>
          <button 
            class="add-to-cart-btn"
            [disabled]="product.stock === 0"
            (click)="addToCart()"
          >
            <span class="btn-icon">🛒</span>
            {{ product.stock === 0 ? 'Sin stock' : 'Agregar' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: all 0.3s ease;
      margin-bottom: 20px;
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    }

    .product-image {
      position: relative;
      width: 100%;
      height: 200px;
      overflow: hidden;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .product-card:hover .product-image img {
      transform: scale(1.05);
    }

    .stock-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      background: #059669;
      color: white;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    .stock-badge.low-stock {
      background: #EA580C;
    }

    .product-info {
      padding: 16px;
    }

    .product-name {
      font-size: 18px;
      font-weight: 600;
      color: #1F2937;
      margin: 0 0 8px 0;
      line-height: 1.4;
    }

    .product-description {
      color: #6B7280;
      font-size: 14px;
      margin: 0 0 8px 0;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-category {
      background: #EFF6FF;
      color: #2563EB;
      font-size: 12px;
      font-weight: 500;
      padding: 4px 8px;
      border-radius: 8px;
      display: inline-block;
      margin-bottom: 12px;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .product-price {
      font-size: 20px;
      font-weight: 700;
      color: #059669;
    }

    .add-to-cart-btn {
      background: #2563EB;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 100px;
      justify-content: center;
    }

    .add-to-cart-btn:hover:not(:disabled) {
      background: #1D4ED8;
      transform: translateY(-1px);
    }

    .add-to-cart-btn:disabled {
      background: #9CA3AF;
      cursor: not-allowed;
      transform: none;
    }

    .btn-icon {
      font-size: 16px;
    }

    @media (min-width: 768px) {
      .product-name {
        font-size: 20px;
      }
      
      .product-description {
        font-size: 15px;
      }
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }
}