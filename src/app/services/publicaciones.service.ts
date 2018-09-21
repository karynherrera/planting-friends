import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {PublishInterface} from '../models/publishInterface';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

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
}
