import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order, CartItem, PaymentInfo } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();
  private nextOrderId = 1;

  createOrder(
    items: CartItem[], 
    customerName: string, 
    customerPhone: string, 
    customerEmail: string, 
    paymentInfo: PaymentInfo
  ): Order {
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: this.nextOrderId++,
      items: [...items],
      total,
      customerName,
      customerPhone,
      customerEmail,
      paymentMethod: paymentInfo.method,
      bitPhoneNumber: paymentInfo.bitPhoneNumber,
      status: 'pending',
      createdAt: new Date()
    };

    const currentOrders = this.ordersSubject.value;
    this.ordersSubject.next([...currentOrders, newOrder]);
    
    return newOrder;
  }

  updateOrderStatus(orderId: number, status: 'pending' | 'approved' | 'rejected'): void {
    const orders = this.ordersSubject.value;
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
      order.status = status;
      this.ordersSubject.next([...orders]);
    }
  }

  getOrders(): Order[] {
    return this.ordersSubject.value;
  }

  getPendingOrders(): Order[] {
    return this.ordersSubject.value.filter(order => order.status === 'pending');
  }
}