import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccueilComponent } from './accueil/accueil.component';


const appRoutes: Routes = [
  { path: '', component: ConnectionComponent },
  { path: 'home', component: AccueilComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
