
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
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

  /*
  addUser(){
    console.log('purr');
    this.afAuth.auth.createUserWithEmailAndPassword(this.newUser.value.email, this.newUser.value.pass)
    .then(() => {
      //Registro exitoso, celebremos esto!
    })
    .catch(() => {
      console.log("nou");
  });
  } */
  
  addUser() {
    //console.log('holi');
    this.authService.register(this.newUser.value.email, this.newUser.value.pass);
    /*
  this.authService.register(this.newUser.value.email, this.newUser.value.pass)
    .then(() => {
      //Registro exitoso, celebremos esto!
    })
    .catch(() => {
      console.log("nou");
    });
*/
}
}
