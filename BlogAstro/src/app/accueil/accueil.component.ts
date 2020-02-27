import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  private id;
  private nom: string;
  constructor(private serviceUser: UserService) { }

  ngOnInit() {
    this.id = localStorage.getItem('userid');
    this.serviceUser.getuser(this.id).subscribe((response: any) => {
      this.nom = response.nomBlogeur;
    })
  }

}
