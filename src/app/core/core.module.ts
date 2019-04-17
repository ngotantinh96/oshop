import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from 'app/app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
