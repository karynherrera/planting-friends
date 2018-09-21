import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
  newPublish: FormGroup;


 

  constructor(private formBuilder: FormBuilder, public auth: AuthService, private afs: AngularFirestore) { 
    this.createPublish();
  }


  ngOnInit() {
  }
  createPublish() {
    this.newPublish = this.formBuilder.group({
      publicacion: ['', Validators.required],
    });
  }

  addPublish(){
    console.log('publicación');
  }
}
