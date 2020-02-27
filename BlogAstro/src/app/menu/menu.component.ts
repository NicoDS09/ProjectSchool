import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private toast: ToastrService) { }

  ngOnInit() {
  }

  deconnect() {
    localStorage.removeItem("userid");
    localStorage.removeItem("connect");
    this.toast.success('Deconnecté');
    this.router.navigate(['']);
    console.warn(" my firend");
  }

}
