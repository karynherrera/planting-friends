import { NgModule, Component } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WallComponent } from './wall/wall.component';

import { AuthGuard } from './auth.guard';

const app_routes: Routes=[
  {
    path: '', component: WelcomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'login/register', component: RegisterComponent
  },
  {
    path: 'login/wall', component: WallComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', pathMatch: 'full', redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(app_routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}