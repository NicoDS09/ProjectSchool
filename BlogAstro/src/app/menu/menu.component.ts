import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public home: boolean;
  public search: boolean;
  public planets: boolean;
  public test: any;
  public nomBlogeur: string;
  constructor(private router: Router, private toast: ToastrService, private cookieService: CookieService) { }

  ngOnInit() {
    this.test = sessionStorage.getItem('InformationsUser');
    console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    console.log(JSON.stringify(this.test));
    this.home = this.router.isActive('home', true);
    this.search = this.router.isActive('search', true);
    this.planets = this.router.isActive('planets', true);
    this.nomBlogeur = this.test = sessionStorage.getItem('UserNomBlogeur');
  }

  deconnect() {
    let id = sessionStorage.getItem('UserId');
    this.cookieService.delete(`token${id}`);
    window.sessionStorage.clear();
    this.toast.success('Deconnecté');
    this.router.navigate(['']);
  }

}
