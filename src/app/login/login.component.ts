import { Component, OnInit } from '@angular/core';
import { SingInFormComponent } from './sing-in-form/sing-in-form.component';
import { SingWithFbButtonComponent } from './sing-with-fb-button/sing-with-fb-button.component';
import { SingWithGButtonComponent } from './sing-with-g-button/sing-with-g-button.component';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
