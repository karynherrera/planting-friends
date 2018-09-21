import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
  newPublish: FormGroup;

  newUser: FormGroup;
  //usersList$: AngularFireList<any>;
  publicacion: string;

  publishCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  constructor(public auth: AuthService, private formBuilder: FormBuilder, private afs: AngularFirestore, public router:Router) { 
    this.createPublish();
    this.publishCollection = afs.collection<any>('publications');
    this.items = this.publishCollection.valueChanges();
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
    this.publishCollection.add({ 
      publish: this.newPublish.value.publicacion,
    }).catch((err)=>{
      console.log(err);
    })
  }
}
