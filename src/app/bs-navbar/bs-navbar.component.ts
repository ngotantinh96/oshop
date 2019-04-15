import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  user$: Observable<firebase.User>;
  appUser: AppUser;
  shoppingCartItemsCount: number;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));

    const cart$ = await this.shoppingCartService.getShoppingCart();
    cart$.subscribe(cart => {
      this.shoppingCartItemsCount = 0;
      const items = cart.payload.val()['items'.toString()];
      // tslint:disable-next-line: forin
      for (const item in items) {
        this.shoppingCartItemsCount += items[item]['quantity'.toString()];
      }
    });
  }

  logout() {
    this.auth.logout();
  }
}
