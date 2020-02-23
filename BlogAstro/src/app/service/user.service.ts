import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public urlUser = "http://localhost:3000/AstroBlog/user/";

  constructor(private http: HttpClient) { }


  postUser(prenom, nom, email, password, nomBlogeur): Observable<any[]> {
    let data = { prenom: prenom, nom: nom, email: email, password: password, nomBlogeur: nomBlogeur }
    return this.http.post<any[]>(this.urlUser, data);
  }
}
