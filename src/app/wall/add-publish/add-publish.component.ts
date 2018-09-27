import { Component, OnInit } from '@angular/core';

import { ViewChild, ElementRef } from '@angular/core';

import { PublicacionesService } from '../../services/publicaciones.service';
import { PublishInterface } from '../../models/publishInterface';
import {NgForm} from '@angular/forms/src/directives/ng_form';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddTagComponent } from './add-tag/add-tag.component';

import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { ngfactoryFilePath } from '@angular/compiler/src/aot/util';



@Component({
  selector: 'app-add-publish',
  templateUrl: './add-publish.component.html',
  styleUrls: ['./add-publish.component.css']
})

export class AddPublishComponent implements OnInit {
  publicacion: PublishInterface = {
    publish: '',
    date:'',
    name:'',
    photoUrl: '',
    likeCounter:0,
    tag:'',
    imgPublish: '',
  };

  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  
  constructor(private pubServicio: PublicacionesService, public afAuth: AngularFireAuth, private storage: AngularFireStorage, private tagComponent: AddTagComponent) { }
  
  
  uploadPercent: Observable<number>;
  profileUrl: Observable<string | null>;
  downloadURL: Observable<string>;
  task: Observable<string>;
  selectedFile = null;
  filePath: string;
  fileroot: string;
  urlColection: string;
  


  ngOnInit() {
  }
  
  // traer informacion del componente hijo add-tag
  public saveTag(choosenTag: string):void { 
    console.log('Tag: ', choosenTag); 
    this.publicacion.tag = choosenTag;
  } 
 
  newPublish(myForm: NgForm) {
    this.afAuth.authState.subscribe(user => {
      if(user){
        let time = new Date().getTime();
        let date = new Date(time).toLocaleString();
        let name = user.displayName;
        let img = 'img';
        let photo = user.photoURL;
        this.publicacion.date = date;
        this.publicacion.name = name;
        this.publicacion.photoUrl = photo;

        //this.pubServicio.addPublish(this.publicacion);
        this.pubServicio.addPublish(this.publicacion);
      } 
    });
  }


  addImg(event){
    //console.log(event);
    this.selectedFile = event.target.files[0];
    let fileroot = this.selectedFile.name;
    let filePath;
    // intento mariel 
    // subir archivo a la base de datos
    const ref = this.storage.ref(fileroot);
    const task = this.storage.upload(fileroot, this.selectedFile);

    // esperar a que este cargado en la base de datos
    task.snapshotChanges().pipe(
        finalize(() => {
           // obtener url correcta para subir a la coleccion 
     this.profileUrl = ref.getDownloadURL();
     this.profileUrl.subscribe(url=>{
       // crear imagen en la memoria para dibujarla 
       const myImage = new Image();
       myImage.src = url;
       // pasarle el valor al post. 
       this.publicacion.imgPublish = myImage.src;
      
          })
        })
    ).subscribe()
 
  }

  }
  
  
    

