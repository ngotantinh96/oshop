import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Order } from '../models/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private order: OrderService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.order.storeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  async ngOnInit() {
    this.cartSubscription = (await this.shoppingCartService.getShoppingCart()).subscribe(
      cart => (this.cart = cart)
    );

    this.userSubscription = this.authService.user$.subscribe(user => (this.userId = user.uid));
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
