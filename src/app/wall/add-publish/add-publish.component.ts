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
        this.publicacion.imgPublish= this.urlColection;
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
    // const task = this.storage.upload(fileroot, this.selectedFile);
    // esperar a que este cargado en la base de datos
    task.snapshotChanges().pipe(
        finalize(() => {
           // obtener url correcta para subir a la coleccion 
     this.profileUrl = ref.getDownloadURL();
     this.profileUrl.subscribe(url=>{
       // crear imagen en la memoria para dibujarla en canvas
       const myImage = new Image();
       myImage.src = url;
       // console.log('myImg' + myImage);
       const imgPlace = document.getElementById('place_img');
       this.urlColection = myImage.src;
       // esta es la url que sirve
      // const url64 = this.getBase64Image(myImage); 
      // console.log('url64'+ url64);
      
          })
        })
    ).subscribe()
 
  //   this.uploadPercent= task.percentageChanges();
  //   task.snapshotChanges().pipe(
  //     finalize(() => {
  //        this.downloadURL = ref.getDownloadURL()
  //        this.downloadURL.subscribe(url=>{
  //         const gsUrl = firebase.storage().refFromURL(url).toString();
  //         console.log(gsUrl);
  //         this.urlColection = gsUrl;
  //        })
  //       })
  //  )
  // .subscribe()
  //   //const donwloadURL = task.downloadURL();
  //   //console.log(this.selectedFile.name);root
    
  }

  // getBase64Image(img) {
  //   const canvas =  <HTMLCanvasElement>this.myCanvas.nativeElement;
  //   this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
  //   this.context.drawImage(img, 0, 0);
  //   var dataURL = canvas.toDataURL();
  //   return dataURL;
  // }
  

//   const gsUrl = firebase.storage().refFromURL(url).toString();
//   // pasar la url a la coleccion 
//   // Create a child reference
//   const imagesRef = ref.child(fileroot);
//   // subir esta url 
//  // pasarle la url directo 
 
//  // this.urlColection = JSON.stringify(url);
//  console.log(JSON.stringify(gsUrl));
 
//  const message = JSON.stringify(gsUrl);
//  imagesRef.putString(message).then(function(snapshot) {
//      console.log('Uploaded a raw string!');
//    });
//  })
  
  // getUrl(filePath){
  //   let urlImg;
  //    const ref = this.storage.ref(filePath);
  //    this.profileUrl = ref.getDownloadURL();
  //    this.profileUrl.subscribe(url=>{
  //      urlImg=url
  //      console.log(urlImg);
  //      const gsUrl = firebase.storage().refFromURL(urlImg).toString();
  //      console.log(gsUrl);
  //      this.urlColection = gsUrl;
  //     })
      
     //console.log(ref);
    //let stRef = firebase.storage().ref();
    //let imgRef = stRef.child('imgs');
    //let path = 'imgs/'+filePath;
    //console.log(path);
    /*
    storage.child(filePath).getDownloadURL().then(function(url) {
      urlImg = url;
      console.log(url);
      const ref = this.storage.ref(`${filePath}`);
      this.profileUrl = ref.getDownloadURL();
      console.log(ref.getDownloadURL());
       //return console.log(urlImg);
       //return urlImg;
    }).catch(function(error) {
      console.log(error);
      // Handle any errors
    });
    */
    //console.log(imagesRef);
    //let imagenUrl= this.storage.ref(filePath).getDownloadURL;
    //console.log(imagenUrl);
    //const ref = this.storage.ref(filePath);
    //const task2 = ref.put(this.selectedFile);
    //console.log(task2);
    
    //const downloadUrl = "https://firestorage.googleapis...";
    //const gsUrl = firebase.storage().refFromUrl(downloadUrl).toString();
  }
  
  
    

