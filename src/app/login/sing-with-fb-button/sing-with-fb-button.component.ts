import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-sing-with-fb-button',
  templateUrl: './sing-with-fb-button.component.html',
  styleUrls: ['./sing-with-fb-button.component.css']
})
export class SingWithFbButtonComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }
  logout() {
    this.auth.signOut();
  }

}
