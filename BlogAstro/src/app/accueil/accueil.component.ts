import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/service/message.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private serviceMessage: MessageService, private toastr: ToastrService) { }

  ngOnInit() {
    this.nom = localStorage.getItem('UserNomBlogeur');
    this.id = localStorage.getItem('UserId');
    this.callapiUserPost();
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
    console.log(this.sujet);
    this.serviceMessage.postMessage(this.id, this.sujet, this.post).subscribe((response: any) => {
      this.toastr.success(`Vous venez d'ajouter un commentaire`);
      this.callapiUserPost();
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