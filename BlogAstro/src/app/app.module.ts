import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthGuard } from './service/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { TokenInterceptorService } from '../app/service/token-interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { CommentaireComponent } from './commentaire/commentaire.component';

const appRoutes: Routes = [
  {
    path: '', component: ConnectionComponent,
  },
  {
    path: 'home', component: AccueilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'commentaires/:id', component: CommentaireComponent,
    canActivate: [AuthGuard]
  },
]

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    AccueilComponent,
    MenuComponent,
    CommentaireComponent
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
  providers: [AuthGuard, CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
