import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { PublishInterface } from '../models/publishInterface';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators'; @Injectable({

  providedIn: 'root'

})

export class PublicacionesService {

  publishCollection: AngularFirestoreCollection<PublishInterface>;

  publications: Observable<PublishInterface[]>;

  publishDoc: AngularFirestoreDocument<PublishInterface>;
  counter: number;
  constructor(public afs: AngularFirestore) {

    //this.publications = afs.collection('publications').valueChanges();

    //obtenemos el id de la publicacion

    this.publishCollection = afs.collection<PublishInterface>('publications');//aca indicmos el nombre de la coleccion

    this.publications = this.publishCollection.snapshotChanges().pipe(

      map(post => post.map(texto => {

        const datos = texto.payload.doc.data() as PublishInterface;

        const id = texto.payload.doc.id;

        return { id, ...datos };

      }

      ))

    )

  } getPublications() {

    return this.publications;

  } addPublish(publicacion: PublishInterface) {

    // console.log('se publicó');

    this.publishCollection.add(publicacion);
  }
  
  deletePublish(publicacion: PublishInterface){
    // console.log('delete publicacion');
    this.publishDoc = this.afs.doc(`publications/${publicacion.id}`);

    this.publishDoc.delete();
  }

  editPublish(publicacion: PublishInterface){
    // console.log('edit publicacion');
    this.publishDoc=this.afs.doc(`publications/${publicacion.id}`);
    this.publishDoc.update(publicacion);
  }

  giveLike(publicacion: PublishInterface){
    this.publishDoc=this.afs.doc(`publications/${publicacion.id}`);
    publicacion.likeCounter = publicacion.likeCounter +1;
    // console.log(JSON.stringify(publicacion));
    this.publishDoc.update(publicacion);

  }

}