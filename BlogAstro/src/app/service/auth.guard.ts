import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  login() {
    return !!localStorage.getItem('connect');
  }

  canActivate(): boolean {
    if (this.login()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
