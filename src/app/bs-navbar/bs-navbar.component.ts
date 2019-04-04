import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  user: firebase.User;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(x => (this.user = x));
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
