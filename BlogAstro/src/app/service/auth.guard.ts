import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  private auth: boolean;

  constructor(private router: Router, private user: UserService) { }

  login() {
    this.user.verifytoken().subscribe((res: any) => {
      this.auth = res;
    },
      error => {
        this.auth = false;
      }
    );
  }

  canActivate(): boolean {
    this.login();
    console.warn(this.auth);
    if (this.auth) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

}
