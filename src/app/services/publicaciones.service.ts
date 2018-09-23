import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {PublishInterface} from '../models/publishInterface';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  publishCollection: AngularFirestoreCollection<PublishInterface>;
  publications: Observable<PublishInterface[]>;
  publishDoc: AngularFirestoreDocument<PublishInterface>;

  constructor(public afs: AngularFirestore) {
    this.publications = afs.collection('publications').valueChanges();
   }

   getPublications(){
     return this.publications;
   }

   addPublish(){
    console.log('se publicó');
    
  }

  deletePublish(){
    console.log('delete curso');
  }

  editPublish(){
    console.log('edit curso');
  }
}
