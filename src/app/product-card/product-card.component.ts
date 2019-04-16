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
  @Input('shoppingCart'.toString()) shoppingCart: any;
  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) {
      return 0;
    }
    const item = this.shoppingCart.itemsMap[this.product.key];
    return item ? item.quantity : 0;
  }
}
