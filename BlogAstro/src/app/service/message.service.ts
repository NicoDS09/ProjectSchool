import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public urlMessage: string = 'http://localhost:3000/AstroBlog/postm/'

  constructor(private http: HttpClient) {
  }

  getMessage(id): Observable<any[]> {
    return this.http.get<any[]>(this.urlMessage + id);
  }


}
