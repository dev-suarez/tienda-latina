import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductManagementComponent } from './product-management/product-management.component';
import { OrderManagementComponent } from './order-management/order-management.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductManagementComponent, OrderManagementComponent],
  template: `
    <div class="admin-container">
      <div class="admin-header">
        <h1>Panel de Administración</h1>
        <p>Gestiona tu inventario y órdenes</p>
      </div>
      
      <div class="admin-tabs">
        <button 
          class="tab-btn"
          [class.active]="activeTab === 'products'"
          (click)="activeTab = 'products'"
        >
          📦 Productos
        </button>
        <button 
          class="tab-btn"
          [class.active]="activeTab === 'orders'"
          (click)="activeTab = 'orders'"
        >
          📋 Órdenes
        </button>
      </div>
      
      <div class="admin-content">
        <app-product-management *ngIf="activeTab === 'products'"></app-product-management>
        <app-order-management *ngIf="activeTab === 'orders'"></app-order-management>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .admin-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .admin-header h1 {
      font-size: 28px;
      font-weight: 700;
      color: #1F2937;
      margin: 0 0 8px 0;
    }

    .admin-header p {
      color: #6B7280;
      margin: 0;
    }

    .admin-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
      background: #F3F4F6;
      padding: 8px;
      border-radius: 12px;
    }

    .tab-btn {
      flex: 1;
      padding: 12px 16px;
      background: transparent;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #6B7280;
    }

    .tab-btn:hover {
      background: #E5E7EB;
    }

    .tab-btn.active {
      background: white;
      color: #2563EB;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .admin-content {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    @media (max-width: 640px) {
      .admin-tabs {
        flex-direction: column;
      }
    }
  `]
})
export class AdminPanelComponent {
  activeTab: 'products' | 'orders' = 'products';
}