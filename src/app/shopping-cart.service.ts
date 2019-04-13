import { take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

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

  async getShoppingCart() {
    const cartId = await this.getOrCreateCart();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges();
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
    const cartId = await this.getOrCreateCart();
    const item$ = this.getItem(cartId, product.key);

    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe(item => {
        const existsItem = item.payload.val();
        item$.update({
          product,
          quantity: (existsItem ? existsItem['quantity'.toString()] : 0) + 1
        });
      });
  }
}
