import { take, map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getShoppingCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCart();
    return this.db
      .object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(map(x => new ShoppingCart(x.payload.val()['items'.toString()])));
  }

  private async getOrCreateCart(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: any) {
    this.updateItem(product, 1);
  }

  removeFromCart(product: any) {
    this.updateItem(product, -1);
  }

  private async updateItem(product: any, change: number) {
    const cartId = await this.getOrCreateCart();
    const item$ = this.getItem(cartId, product.key || product.$key);

    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe(item => {
        const existsItem = item.payload.val();
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity:
            (existsItem ? existsItem['quantity'.toString()] : 0) + change
        });
      });
  }
}
