import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-sing-in-form',
  templateUrl: './sing-in-form.component.html',
  styleUrls: ['./sing-in-form.component.css']
})
export class SingInFormComponent implements OnInit {
  authForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, public snackBar: MatSnackBar) { 
    this.createAuthForm();
  }

  ngOnInit() {
  }
  createAuthForm() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  } 

  onLogin() {
    this.authService.login(this.authForm.value.email, this.authForm.value.password)
      .then(() => {
        this.snackBar.open('Login exitoso, bienvenido'
        , null/*No necesitamos botón en el aviso*/
        , {
          duration: 3000
        });
        this.router.navigate(['login/wall']);
      })
      .catch((err) => {
        //Algo salió mal, avisemos mejor para que reintente
       if(err.code === 'auth/wrong-password'){
        this.snackBar.open('Error, Contraseña incorrecta, trata otra vez'
        , null/*No necesitamos botón en el aviso*/
        , {
          duration: 3000
        });
       }
       if(err.code === 'auth/user-not-found'){
        this.snackBar.open('Error, email no registrado, trata otra vez'
        , null/*No necesitamos botón en el aviso*/
        , {
          duration: 3000
        });
       }
       this.router.navigate(['login']);
      });
  }
}

