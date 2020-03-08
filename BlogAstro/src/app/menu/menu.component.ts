import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public home: boolean;
  public post: boolean;
  constructor(private router: Router, private toast: ToastrService) { }

  ngOnInit() {
    this.home = this.router.isActive('home', true);
    this.post = this.router.isActive('post', true);
    console.error(this.home + 'home');
    console.error(this.post + 'post');
  }

  deconnect() {
    //localStorage.removeItem("userid");
    localStorage.removeItem("token");
    this.toast.success('Deconnecté');
    this.router.navigate(['']);
  }

}
