import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  private id;
  public nom: string;
  constructor(private serviceUser: UserService) { }

  ngOnInit() {
    this.nom = localStorage.getItem('UserNomBlogeur');
    // this.serviceUser.getuser(this.id).subscribe((response: any) => {
    //   this.nom = response.nomBlogeur;
    // })
    // this.serviceUser.verifytoken().subscribe((response) => {
    //   console.warn(response)
    // }
    // )
  }

}
