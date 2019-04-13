import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product'.toString()) product: any;
  @Input('showActions'.toString()) showActions: false;
  @Input('numberProducts'.toString()) numberProducts: 0;
  constructor(private cartService: ShoppingCartService) {}

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
