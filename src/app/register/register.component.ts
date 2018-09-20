
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterModule, Routes } from '@angular/router';
import {AppRoutingModule} from '../app-routing.module';
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
