import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private user: UserService) { }

  intercept(req, next) {
    let tokenCheck = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.user.gettoken()}`
      }
    })
    return next.handle(tokenCheck)
  }

}
