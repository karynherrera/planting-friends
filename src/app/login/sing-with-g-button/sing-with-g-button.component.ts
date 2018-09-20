import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sing-with-g-button',
  templateUrl: './sing-with-g-button.component.html',
  styleUrls: ['./sing-with-g-button.component.css']
})
export class SingWithGButtonComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }
  logout() {
    this.auth.signOut();
  }
}
