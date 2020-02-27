import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthGuard } from './service/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { PostMessageComponent } from './post-message/post-message.component';


const appRoutes: Routes = [
  {
    path: '', component: ConnectionComponent,
  },
  {
    path: 'home', component: AccueilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post', component: PostMessageComponent,
    canActivate: [AuthGuard]
  },
]

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    AccueilComponent,
    MenuComponent,
    PostMessageComponent
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
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
