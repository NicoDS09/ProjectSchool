import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private user: UserService) { }

  login() {
    return !!localStorage.getItem('token');
  }

  canActivate(): boolean {
    console.warn('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    console.warn(this.user.verifytoken());
    if (this.user.verifytoken()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

}
