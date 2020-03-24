import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';
import { CommentairesService } from 'src/app/service/commentaires.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit {

  constructor(private route: ActivatedRoute, private serviceMessage: MessageService, private userService: UserService, private CommentairesService: CommentairesService) { }
  public id;
  public idUser;
  public PostUsers;
  public name: string;
  public commentaires;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idUser = this.route.snapshot.paramMap.get('idUser');
    console.warn(this.id + 'testcomm')
    this.callapiUserPost();
    this.callapiGetUser(this.idUser);
    this.callapiGetCom(this.id);
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
    this.CommentairesService.getCommentairesByPost(id).subscribe((response: any) => {
      console.log(response);
      this.commentaires = response;
    })
  }

}
