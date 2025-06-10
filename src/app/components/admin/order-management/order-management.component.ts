import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../models/product.interface';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
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