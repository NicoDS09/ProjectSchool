import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {

  public urlCommentaires: string = 'http://localhost:3000/AstroBlog/commentaire/'
  public urlCommentairesUser: string = 'http://localhost:3000/AstroBlog/userComm/';

  constructor(private http: HttpClient) { }
  getCommentairesUser(idPost): Observable<any[]> {
    return this.http.get<any[]>(this.urlCommentairesUser + idPost);
  }

  getCommentairesByPost(idPost): Observable<any[]> {
    return this.http.get<any[]>(this.urlCommentaires + idPost);
  }
}
