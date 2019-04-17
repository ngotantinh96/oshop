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
  subscription: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private order: OrderService
  ) {}

  placeOrder() {
    const order = {
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
    console.log(this.order.storeOrder(order));
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getShoppingCart()).subscribe(
      cart => (this.cart = cart)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
