import { ShoppingCart } from 'shared/models/shopping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart'.toString()) cart: ShoppingCart;
  shipping = {};
  userSubscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private order: OrderService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(
      user => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.order.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
