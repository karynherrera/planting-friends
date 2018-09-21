import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService} from './auth.service'


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}


  canActivate() {
  // si el usuario no logra entrar, se devuelve a la misma pagina 
    if (!this.auth.user) {
      console.log('No estás logueado');
      this.router.navigate(['login']);
      return false;
    }

    return true;
     
  }
}