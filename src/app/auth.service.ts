import { UserService } from './user.service';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private user: UserService
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(x => {
      this.user.save(x.user);
      this.router.navigateByUrl(localStorage.getItem('returnUrl'));
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
