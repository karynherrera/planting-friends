import { Component, OnInit } from '@angular/core';
import { PublishInterface } from '../../../models/publishInterface';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-add-img',
  templateUrl: './add-img.component.html',
  styleUrls: ['./add-img.component.css']
})
export class AddImgComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }


}
