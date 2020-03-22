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
  public post: boolean;
  public test: any;
  constructor(private router: Router, private toast: ToastrService, private cookieService: CookieService) { }

  ngOnInit() {
    this.test = sessionStorage.getItem('InformationsUser');
    console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    console.log(JSON.stringify(this.test));
    this.home = this.router.isActive('home', true);
    this.post = this.router.isActive('post', true);
    console.error(this.home + 'home');
    console.error(this.post + 'post');
  }

  deconnect() {
    let id = sessionStorage.getItem('UserId');
    this.cookieService.delete(`token${id}`);
    window.sessionStorage.clear();
    this.toast.success('Deconnecté');
    this.router.navigate(['']);
  }

}
