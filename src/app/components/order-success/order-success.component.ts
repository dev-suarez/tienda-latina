import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Order } from '../../models/product.interface';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
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