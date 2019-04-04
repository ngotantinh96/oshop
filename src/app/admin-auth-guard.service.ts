import { AppUser } from './models/app-user';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}
  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(x => this.userService.get(x.uid).valueChanges()),
      map(appUser => appUser.isAdmin)
    );
  }
}
