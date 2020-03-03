import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  private auth: boolean;

  constructor(private router: Router, private user: UserService, private http: HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.http.get("http://localhost:3000/AstroBlog/user/token").pipe(
      map(res => {
        console.log(res)
        if (res == true) {
          return true;
        }
      },
      ), catchError(err => {
        this.router.navigateByUrl('');
        return of(false);
      })
    );
  }

}
