import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';
import { CommentairesService } from 'src/app/service/commentaires.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from '../service/web-socket.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit {

  constructor(private route: ActivatedRoute, private serviceMessage: MessageService, private userService: UserService, private CommentairesService: CommentairesService, private toastr: ToastrService, private webSocketService: WebSocketService) { }
  public id;
  public idUser;
  public PostUsers;
  public idconnect;
  public name: string;
  public commentaires;
  public commentaire;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idUser = this.route.snapshot.paramMap.get('idUser');
    this.idconnect = sessionStorage.getItem('UserId');
    console.warn(this.id + 'testcomm')
    this.callapiUserPost();
    this.callapiGetUser(this.idUser);
    this.callapiGetCom(this.id);
    this.webSocketService.listen('commentaires').subscribe((data) => {
      console.log(data + 'rtt');
      console.warn('socket')
      this.callapiUserPost();
      this.callapiGetUser(this.idUser);
      this.callapiGetCom(this.id);
    })
  }

  callapiUserPost() {
    this.serviceMessage.getMessage(this.id).subscribe((response: any) => {
      this.PostUsers = response;
      console.log(this.PostUsers)
    })
  }

  callapiGetUser(id) {
    this.userService.getuser(id).subscribe((response: any) => {
      console.log(response);
      this.name = response.nomBlogeur;
    })
  }

  callapiGetCom(id) {
    this.CommentairesService.getCommentairesUser(id).subscribe((response: any) => {
      console.log(response);
      this.commentaires = response;
    })
  }

  PostCommentaire(value: any, PostCom: NgForm) {
    this.commentaire = value.commentaire;
    if (value.commentaire == undefined) {
      this.toastr.error('complétez le commentaire svp');
    } else {
      this.CommentairesService.postCommentaire(this.id, this.idconnect, this.commentaire).subscribe((response: any) => {
        this.toastr.success(`Vous venez d'ajouter un commentaire`);
        this.callapiGetCom(this.id);
        PostCom.reset();
        error => {
          this.toastr.error(error.error.error);
          console.log(error.error.error)
        }
      })
    }
  }

}
