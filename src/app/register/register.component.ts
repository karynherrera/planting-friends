
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import { RouterModule, Routes } from '@angular/router';
import {AppRoutingModule} from '../app-routing.module';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.createUser();
    //this.usersList$ = this.database.list('/users'); 
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
      console.log(success);
      
    })
    .catch(() => {
      console.log("nou");
    });
}

}
export class users {
  nombre: string;
  edad: number;
  comuna: string;
  email:string;

  usersCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<Item>('items');
    this.items = this.usersCollection.valueChanges();
  }
  addNewUser(item: Item) {
    /*
    this.usersCollection.doc('yourId').set({
      nombreUsuario: this.nombre,
      edadUsuario:this.edad,
      comunaUser: this.comuna,
      emailUser: this.email,
    }).catch((err)=>{
      console.log(err);
    }) */
    this.usersCollection.add(item);
  }
}