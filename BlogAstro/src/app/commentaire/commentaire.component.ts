import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit {

  constructor(private route: ActivatedRoute, private serviceMessage: MessageService) { }
  public id;
  public PostUsers;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.warn(this.id + 'testcomm')
    this.callapiUserPost();
  }

  callapiUserPost() {
    this.serviceMessage.getMessage(this.id).subscribe((response: any) => {
      console.log(response)
      this.PostUsers = response;
    })
  }

}
