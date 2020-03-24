import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public urlMessage: string = 'http://localhost:3000/AstroBlog/postm/'
  public urlMessageUser: string = 'http://localhost:3000/AstroBlog/userMessage/';

  constructor(private http: HttpClient) {
  }

  getMessageUser(): Observable<any[]> {
    return this.http.get<any[]>(this.urlMessageUser);
  }

  getMessage(id): Observable<any[]> {
    return this.http.get<any[]>(this.urlMessage + id);
  }

  getALLMessage(): Observable<any[]> {
    return this.http.get<any[]>(this.urlMessage);
  }

  postMessage(idUser, sujet, post): Observable<any[]> {
    let data = { idUser: idUser, post: post, sujet: sujet }
    return this.http.post<any[]>(this.urlMessage, data);
  }

  putMessage(id, sujet, post): Observable<any[]> {
    let data = { post: post, sujet: sujet }
    return this.http.put<any[]>(this.urlMessage + id, data);
  }

  deleteMessage(id): Observable<any[]> {
    return this.http.delete<any[]>(this.urlMessage + id);
  }

}
