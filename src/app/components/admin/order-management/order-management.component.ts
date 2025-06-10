import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../models/product.interface';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="order-management">
      <div class="management-header">
        <h2>Gestión de Órdenes</h2>
        <div class="order-stats">
          <div class="stat">
            <span class="stat-label">Pendientes:</span>
            <span class="stat-value pending">{{ getPendingCount() }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Total:</span>
            <span class="stat-value">{{ orders.length }}</span>
          </div>
        </div>
      </div>
      
      <div class="orders-list">
        <div class="order-card" *ngFor="let order of orders">
          <div class="order-header">
            <div class="order-id">
              <strong>Pedido #{{ order.id }}</strong>
              <span class="order-date">{{ formatDate(order.createdAt) }}</span>
            </div>
            <div class="order-status">
              <span class="status-badge" [ngClass]="order.status">
                {{ getStatusText(order.status) }}
              </span>
            </div>
          </div>
          
          <div class="order-details">
            <div class="customer-info">
              <h4>Información del Cliente</h4>
              <p><strong>Nombre:</strong> {{ order.customerName }}</p>
              <p><strong>Teléfono:</strong> {{ order.customerPhone }}</p>
              <p><strong>Email:</strong> {{ order.customerEmail }}</p>
              <p><strong>Método de Pago:</strong> {{ order.paymentMethod === 'bit' ? 'Bit' : 'Transferencia Bancaria' }}</p>
              <p *ngIf="order.paymentMethod === 'bit' && order.bitPhoneNumber">
                <strong>Teléfono Bit:</strong> {{ order.bitPhoneNumber }}
              </p>
            </div>
            
            <div class="order-items">
              <h4>Productos Ordenados</h4>
              <div class="item" *ngFor="let item of order.items">
                <div class="item-info">
                  <img [src]="item.product.imageUrl" [alt]="item.product.name" />
                  <div>
                    <strong>{{ item.product.name }}</strong>
                    <p>Cantidad: {{ item.quantity }}</p>
                  </div>
                </div>
                <div class="item-price">₪{{ item.product.price * item.quantity }}</div>
              </div>
              
              <div class="order-total">
                <strong>Total: ₪{{ order.total }}</strong>
              </div>
            </div>
          </div>
          
          <div class="order-actions" *ngIf="order.status === 'pending'">
            <button class="btn-success" (click)="approveOrder(order.id)">
              ✅ Aprobar
            </button>
            <button class="btn-danger" (click)="rejectOrder(order.id)">
              ❌ Rechazar
            </button>
          </div>
        </div>
        
        <div class="empty-state" *ngIf="orders.length === 0">
          <div class="empty-icon">📋</div>
          <h3>No hay órdenes</h3>
          <p>Las órdenes aparecerán aquí cuando los clientes realicen compras</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .order-management {
      padding: 24px;
    }

    .management-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .management-header h2 {
      font-size: 24px;
      font-weight: 600;
      color: #1F2937;
      margin: 0;
    }

    .order-stats {
      display: flex;
      gap: 20px;
    }

    .stat {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .stat-label {
      color: #6B7280;
      font-size: 14px;
    }

    .stat-value {
      font-weight: 700;
      font-size: 18px;
      color: #1F2937;
    }

    .stat-value.pending {
      color: #F59E0B;
    }

    .order-card {
      background: white;
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #E5E7EB;
    }

    .order-id strong {
      display: block;
      font-size: 18px;
      color: #1F2937;
    }

    .order-date {
      color: #6B7280;
      font-size: 14px;
    }

    .status-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-badge.pending {
      background: #FEF3C7;
      color: #92400E;
    }

    .status-badge.approved {
      background: #D1FAE5;
      color: #059669;
    }

    .status-badge.rejected {
      background: #FEE2E2;
      color: #DC2626;
    }

    .order-details {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 24px;
      margin-bottom: 20px;
    }

    .customer-info h4,
    .order-items h4 {
      font-size: 16px;
      font-weight: 600;
      color: #1F2937;
      margin: 0 0 12px 0;
    }

    .customer-info p {
      margin: 6px 0;
      color: #374151;
      font-size: 14px;
    }

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #F3F4F6;
    }

    .item:last-child {
      border-bottom: none;
    }

    .item-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .item-info img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 6px;
    }

    .item-info strong {
      display: block;
      color: #1F2937;
      font-size: 14px;
    }

    .item-info p {
      color: #6B7280;
      font-size: 12px;
      margin: 2px 0 0 0;
    }

    .item-price {
      font-weight: 600;
      color: #059669;
    }

    .order-total {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 2px solid #E5E7EB;
      text-align: right;
      font-size: 18px;
      color: #1F2937;
    }

    .order-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }

    .btn-success {
      background: #059669;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .btn-success:hover {
      background: #047857;
    }

    .btn-danger {
      background: #DC2626;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .btn-danger:hover {
      background: #B91C1C;
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

    @media (max-width: 768px) {
      .management-header {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
      }
      
      .order-stats {
        align-self: stretch;
        justify-content: space-between;
      }
      
      .order-details {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      .order-actions {
        justify-content: stretch;
      }
      
      .btn-success,
      .btn-danger {
        flex: 1;
      }
    }
  `]
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.orders$.subscribe(orders => {
      this.orders = orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    });
  }

  approveOrder(orderId: number): void {
    this.orderService.updateOrderStatus(orderId, 'approved');
  }

  rejectOrder(orderId: number): void {
    if (confirm('¿Estás seguro de que quieres rechazar esta orden?')) {
      this.orderService.updateOrderStatus(orderId, 'rejected');
    }
  }

  getPendingCount(): number {
    return this.orders.filter(order => order.status === 'pending').length;
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'approved': return 'Aprobada';
      case 'rejected': return 'Rechazada';
      default: return status;
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
}