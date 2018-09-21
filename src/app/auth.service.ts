
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap} from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  age?: number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService{
  user: Observable<firebase.User>

  constructor(
    private firebaseAuth: AngularFireAuth,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
    ) { 
    this.user = firebaseAuth.authState;
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    
    );
    //console.log(this.user);
  }

  //signup(name:string, age:number, email:string, password:string){
  register(email:string, password:string){
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
     
  }

    ////// Autenticacion con metodos/////
    googleLogin() {
      new Promise<any>((resolve, reject)=>{
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        this.afAuth.auth
        .signInWithPopup(provider)
        .then(response => {
          this.router.navigate(['login/wall']);
          resolve (response)
        }, err => {
          console.log(err);
          reject(err);
        });
      });
    }
  
    facebookLogin() {
      return new Promise<any>((resolve, reject) => {
        let provider = new firebase.auth.FacebookAuthProvider();
        this.afAuth.auth
        .signInWithPopup(provider)
        .then(response => {
          this.router.navigate(['login/wall']);
          resolve(response);
        }, err => {
          console.log(err);
          reject(err);
        })
      })
    }
  
  
    
    
    //// Email/Password Login ////
    login(email: string, password: string) {
      return this.afAuth.auth
        .signInWithEmailAndPassword(email, password);
    }
  
    signOut() {
      this.afAuth.auth.signOut().then(() => {
        console.log('saliste');
        this.router.navigate(['/']);
      });
    }
  
    // If error, console log and notify user
    private handleError(error: Error) {
      console.error(error);
      console.log(error.message, 'error');
    }
  
    // Actualiza el estado del usuario despues de login
    private updateUserData(user: User) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
      );
  
      const data: User = {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName || 'nameless user',
        photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
      };
      return userRef.set(data);
    }
}
