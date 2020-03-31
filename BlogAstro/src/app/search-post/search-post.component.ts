import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.css']
})
export class SearchPostComponent implements OnInit {

  public sujet: string;
  public PostUsers;
  public notFound: boolean;
  constructor(private serviceMess: MessageService, private router: Router) { }

  ngOnInit() {
    this.notFound = false;
  }

  searchPostf(value: any, searchPost: NgForm) {
    console.log(value.sujet);
    this.sujet = value.sujet;
    this.serviceMess.getMessageByPost(this.sujet).subscribe((response) => {
      searchPost.reset();
      this.notFound = false;
      console.log(response);
      this.PostUsers = response;
    },
      error => {
        this.PostUsers = undefined;
        this.notFound = true;
        console.log('no response')
      }
    )
  }

  commentaires(id, idUser) {
    console.warn(id + 'commentaires');
    this.router.navigateByUrl('/publication/' + id + '/' + idUser);
  }


}
