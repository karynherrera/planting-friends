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
    //obtenemos el id de la publicacion
    this.publishCollection = afs.collection<PublishInterface>('publications');//aca indicmos el nombre de la coleccion
    this.publications = this.publishCollection.snapshotChanges().pipe(
      map(post => post.map(texto=>{
        const datos = texto.payload.doc.data() as PublishInterface;
        const id = texto.payload.doc.id;
        return {id, ...datos};
      }
      ))
    )
   }

   getPublications(){
     return this.publications;
   }

   addPublish(publicacion: PublishInterface){
    console.log('se publicó');
    this.publishCollection.add(publicacion);
  }

  deletePublish(){
    console.log('delete publicacion');
  }

  editPublish(){
    console.log('edit publicacion');
  }
}
