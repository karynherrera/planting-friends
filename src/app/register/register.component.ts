//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.createUser();
  }
  
  ngOnInit() {
  }
  
  createUser() {
    this.newUser = this.formBuilder.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      comuna: ['', Validators.required],
      email: ['',Validators.required],
      contraseña: ['',Validators.required],
      confirm: ['',Validators.required],
    });
  }

 
}
