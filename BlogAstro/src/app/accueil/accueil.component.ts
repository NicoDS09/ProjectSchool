import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/service/message.service';
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from '../service/web-socket.service';
import { Router } from '@angular/router';

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
  public sujetRefresh: string;
  public postRefresh: string;
  public idRefresh: number;
  modalRef: BsModalRef;
  constructor(private serviceMessage: MessageService, private toastr: ToastrService, private webSocketService: WebSocketService, private modalService: BsModalService, private router: Router) { }

  openModalWithClass(template: TemplateRef<any>, sujetRefresh, postRefresh, idRefresh) {
    this.sujetRefresh = sujetRefresh;
    this.postRefresh = postRefresh;
    this.idRefresh = idRefresh;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }


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
    if (value.post == undefined || value.sujet == undefined) {
      this.toastr.error('complétez les deux champs svp');
    } else {
      this.serviceMessage.postMessage(this.id, this.sujet, this.post).subscribe((response: any) => {
        this.toastr.success(`Vous venez d'ajouter un commentaire`);
        //this.callapiUserPost();
        PostCom.reset();
        error => {
          this.toastr.error(error.error.error);
          console.log(error.error.error)
        }
      })
    }
  }

  RefreshPost(value: any, UpdatePost: NgForm) {
    if (value.Refsujet == undefined || value.Refpost == undefined) {
      this.toastr.error('complétez les deux champs svp');
    } else {
      this.serviceMessage.putMessage(this.idRefresh, value.Refsujet, value.Refpost).subscribe((response: any) => {
        this.toastr.success(`Vous avez modifier le post ${value.Refsujet}`);
        this.callapiUserPost();
        error => {
          this.toastr.error(error.error.error);
          console.log(error.error.error)
        }
      })
    }
  }

  delete(id, sujet) {
    if (confirm("êtes vous sûe de vouloir supprimer " + sujet)) {
      this.serviceMessage.deleteMessage(id).subscribe((response: any) => {
        this.toastr.success(`Vous avez supprimer le sujet ${sujet}`);
        this.callapiUserPost();
        error => {
          this.toastr.error(error.error.error);
          console.log(error.error.error)
        }
      })
    }
  }

  commentaires(id, idUser) {
    console.warn(id + 'commentaires');
    this.router.navigateByUrl('/publication/' + id + '/' + idUser);
  }


}


