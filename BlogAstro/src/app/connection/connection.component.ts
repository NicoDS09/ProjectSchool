import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  public email: string;
  public password: string;
  public nom: string
  public prenom: string;
  public nomBlogeur: string;
  public emaillogin: string;
  public passwordlogin: string;

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private toastr: ToastrService, private serviceUser: UserService, private router: Router, private cookieService: CookieService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

  ngOnInit() {

  }


  PostUsers(value: any, PostUser: NgForm) {
    this.email = value.email;
    this.password = value.password;
    this.nom = value.nom;
    this.nomBlogeur = value.nomBlogeur;
    this.prenom = value.prenom;
    this.serviceUser.postUser(this.prenom, this.nom, this.email, this.password, this.nomBlogeur).subscribe((response) => {
      PostUser.reset();
      if (response) this.toastr.success(`Vous êtes inscrit ${value.prenom} ${value.nom}`);
    },
      error => {
        console.log(error)
        this.toastr.error(error.error.error);
      }
    )
  }

  login(value: any, LoginUser: NgForm) {
    this.emaillogin = value.email;
    this.passwordlogin = value.password;
    this.serviceUser.postlogin(this.emaillogin, this.passwordlogin).subscribe((response: any) => {
      sessionStorage.setItem('UserId', response.User.id);
      this.cookieService.set(`token${response.User.id}`, response.token);
      console.log(response);
      LoginUser.reset();
      console.warn(response.token + `token${response.User.id}`);
      if (response) this.toastr.success(`Vous êtes connecté `);
      sessionStorage.setItem('UserId', response.User.id);
      sessionStorage.setItem('UserPrenom', response.User.prenom);
      sessionStorage.setItem('UserNom', response.User.nom);
      sessionStorage.setItem('UserEmail', response.User.email);
      sessionStorage.setItem('UserNomBlogeur', response.User.nomBlogeur);
      this.cookieService.set(`token${response.User.id}`, response.token);
      this.router.navigateByUrl('/home');
    },
      error => {
        this.toastr.error(`${error.error.error}`);
      }
    )

  }

}
