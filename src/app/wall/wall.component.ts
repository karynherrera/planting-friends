import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth} from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection,  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
  newPublish: FormGroup;
  
  //usersList$: AngularFireList<any>;
  name: string;
  publicacion: string;

  publishCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  constructor(public auth: AuthService, private formBuilder: FormBuilder, private afs: AngularFirestore, public router:Router, public afAuth: AngularFireAuth,) { 

    this.createPublish();
    this.publishCollection = afs.collection<any>('publications');
    this.items = this.publishCollection.valueChanges();
    this.afAuth.authState.subscribe(user => {
      if(user) 
      console.log(user.displayName); 

    });
  }

  ngOnInit() {
  }

  createPublish() {
    this.newPublish = this.formBuilder.group({
      publicacion: ['', Validators.required],
    });
  }

  addPublish(){
    console.log('se publicó');
    this.afAuth.authState.subscribe(user => {
      if(user) 
        this.publishCollection.add({ 
          name: user.displayName,
          publish: this.newPublish.value.publicacion,
        }).catch((err)=>{
          console.log(err);
        })

    });
    
  }
}
