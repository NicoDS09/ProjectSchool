import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public urlUser = "http://localhost:3000/AstroBlog/user/";

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  postUser(prenom, nom, email, password, nomBlogeur): Observable<any[]> {
    let data = { prenom: prenom, nom: nom, email: email, password: password, nomBlogeur: nomBlogeur }
    return this.http.post<any[]>(this.urlUser, data);
  }

  postlogin(email, password): Observable<any[]> {
    console.log(email + ' ' + password);
    let data = { email: email, password: password }
    return this.http.post<any[]>(this.urlUser + 'login', data);
  }

  getuser(id): Observable<any[]> {
    return this.http.get<any[]>(this.urlUser + id);
  }

  gettoken() {
    let id = sessionStorage.getItem('UserId');
    return this.cookieService.get(`token${id}`);
  }

  verifytoken(): Observable<any[]> {
    return this.http.get<any[]>(this.urlUser + 'token');
  }
}
