import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="product-list-container">
      <div class="header">
        <h2>Productos Latinos</h2>
        <p>Encuentra todos los sabores de casa que tanto extrañas</p>
      </div>
      
      <div class="products-grid" *ngIf="products$ | async as products">
        <app-product-card 
          *ngFor="let product of products" 
          [product]="product"
        ></app-product-card>
      </div>
      
      <div class="empty-state" *ngIf="(products$ | async)?.length === 0">
        <div class="empty-icon">🌮</div>
        <h3>No hay productos disponibles</h3>
        <p>Vuelve pronto para ver nuevos productos latinos</p>
      </div>
    </div>
  `,
  styles: [`
    .product-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      text-align: center;
      margin-bottom: 32px;
    }

    .header h2 {
      font-size: 28px;
      font-weight: 700;
      color: #1F2937;
      margin: 0 0 8px 0;
    }

    .header p {
      color: #6B7280;
      font-size: 16px;
      margin: 0;
    }

    .products-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #6B7280;
    }

    .empty-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      font-size: 20px;
      margin: 0 0 8px 0;
    }

    .empty-state p {
      margin: 0;
    }

    @media (min-width: 640px) {
      .products-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .header h2 {
        font-size: 32px;
      }
    }

    @media (min-width: 1024px) {
      .products-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (min-width: 1280px) {
      .products-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `]
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getActiveProducts();
  }
}