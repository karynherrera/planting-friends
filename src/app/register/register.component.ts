//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser: FormGroup;
  usersList$: AngularFireList<any>;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private database:AngularFireDatabase) {
    this.createUser();
    this.usersList$ = this.database.list('/users'); 
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
  this.authService.signup(this.newUser.value.email, this.newUser.value.pass)
    .then(() => {
      //Registro exitoso, celebremos esto!
    })
    .catch(() => {
      console.log("nou");
      //Algo salió mal, avisemos mejor para que reintente
      //this.snackBar.open('Error de registro, trata otra vez'
       // , null/*No necesitamos botón en el aviso*/
       // , {
       //   duration: 3000
        //});
    });
}

}
