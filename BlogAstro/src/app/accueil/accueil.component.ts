import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/service/message.service';
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from '../service/web-socket.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  private id;
  public post: string;
  public nom: string;
  public PostUsers: any;
  public sujet: string;
  constructor(private serviceMessage: MessageService, private toastr: ToastrService, private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.nom = sessionStorage.getItem('UserNomBlogeur');
    this.id = sessionStorage.getItem('UserId');
    this.callapiUserPost();
    this.webSocketService.listen('test event').subscribe((data) => {
      console.log(data + 'rtt');
      console.warn('socket')
      this.callapiUserPost();
    })
  }

  callapiUser() {

  }

  callapiUserPost() {
    this.serviceMessage.getMessageUser().subscribe((response: any) => {
      console.log(response)
      this.PostUsers = response;
    })
  }

  PostCommentaire(value: any, PostCom: NgForm) {
    this.post = value.post;
    this.sujet = value.sujet;
    // console.log(this.sujet);
    this.serviceMessage.postMessage(this.id, this.sujet, this.post).subscribe((response: any) => {
      this.toastr.success(`Vous venez d'ajouter un commentaire`);
      //this.callapiUserPost();
      PostCom.reset();
      error => {
        console.log(error.error.error)
      }
    })
  }




}

// <div *ngFor="let PostUser of PostUsers">
//                     <th scope="row">{{PostUser.updatedAt}}</th>
//                     <td>{{nom}}</td>
//                     <td>{{PostUser.post}}</td>
//                 </div>