import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  private id;
  public nom: string;
  constructor(private serviceMessage: MessageService) { }

  ngOnInit() {
    this.nom = localStorage.getItem('UserNomBlogeur');
    // this.serviceUser.getuser(this.id).subscribe((response: any) => {
    //   this.nom = response.nomBlogeur;
    // })
    // this.serviceUser.verifytoken().subscribe((response) => {
    //   console.warn(response)
    // }
    // )
    this.id = localStorage.getItem('UserId');
    this.serviceMessage.getMessage(this.id).subscribe((response: any) => {
      console.log(response)
    })
  }




}
