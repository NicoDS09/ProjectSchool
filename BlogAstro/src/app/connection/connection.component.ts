import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private toastr: ToastrService, private serviceUser: UserService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    console.warn('test')
    this.toastr.success('Hello world!', 'Toastr fun!');

  }

  PostUsers(value: any, PostUser: NgForm) {
    console.error('caca');
    console.warn(value.email);
    console.warn(value.password);
    console.warn(value.nom);
    console.warn(value.nomBlogeur);
    console.warn(value.prenom);
    this.serviceUser.postUser(value.prenom, value.nom, value.email, value.password, value.nomBlogeur).subscribe((response) => {
      PostUser.reset();
      if (response) this.toastr.success(`Vous êtes inscrit ${value.prenom} ${value.nom}`);
    },
      error => {
        this.toastr.error(`Network Erreur !`);
      }
    )

  }

}
