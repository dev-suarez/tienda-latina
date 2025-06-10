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
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
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