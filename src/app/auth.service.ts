import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  user: Observable<firebase.User>

  constructor(private firebaseAuth: AngularFireAuth) { 
    this.user = firebaseAuth.authState;
    //console.log(this.user);
  }

  //signup(name:string, age:number, email:string, password:string){
  register(email:string, password:string){
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
      // aqui deberia ir el push a la base de datos para crear el usuario con todos los datos que se piden en formulario
  }

  login(email:string, password:string){
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.firebaseAuth.auth.signOut()
  }
}
