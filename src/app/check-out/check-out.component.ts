import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart: ShoppingCart;
  orderSubscription: Subscription;
  userId: string;

  constructor(
    private authService: AuthService,
    private order: OrderService,
    private shoppingCartService: ShoppingCartService
  ) {}

  placeOrder() {
    const order = {
      userId: this.userId,
      dataPlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imgUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPridce: i.totalPrice
        };
      })
    };
    this.order.storeOrder(order);
  }

  async ngOnInit() {
    this.orderSubscription = (await this.shoppingCartService.getShoppingCart()).subscribe(
      cart => (this.cart = cart)
    );

    this.authService.user$.subscribe(user => (this.userId = user.uid));
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }
}
