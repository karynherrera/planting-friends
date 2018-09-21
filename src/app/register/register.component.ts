
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { name: string; }
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser: FormGroup;
  //usersList$: AngularFireList<any>;
  nombre: string;
  edad: number;
  comuna: string;
  email:string;

  usersCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private afs: AngularFirestore, public router:Router) {
    //private listUsers: users
    this.createUser();
    //this.usersList$ = this.database.list('/users'); 
    this.usersCollection = afs.collection<any>('users');
    this.items = this.usersCollection.valueChanges();
  }
  
  ngOnInit() {
  }
  
  createUser() {
    this.newUser = this.formBuilder.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      comuna: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      pass: ['',Validators.compose([Validators.required, Validators.minLength(8)])],
      confirm: ['',Validators.required],
    });
  }

  
  addUser() {
  this.authService.register(this.newUser.value.email, this.newUser.value.pass)
    .then((success) => {
      //Registro exitoso, celebremos esto!
     // console.log(success);
      this.router.navigate(['login/wall']);
     //console.log('new User'+ this.newUser.value.email);
     // this.listUsers.addNewUser(this.newUser);
     this.usersCollection.add({ 
        //id: DocRef.name,
        name: this.newUser.value.nombre,
        age: this.newUser.value.edad,
        location: this.newUser.value.comuna,
        mail: this.newUser.value.email,
    
      }).catch((err)=>{
        console.log(err);
      })
    })
    .catch((error) => {
      console.log("nou "+error);
    });
}

}
