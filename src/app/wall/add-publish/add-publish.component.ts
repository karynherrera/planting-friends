import { Component, OnInit } from '@angular/core';
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
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(fileroot, this.selectedFile);
    this.uploadPercent= task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
         this.downloadURL = ref.getDownloadURL()
         this.downloadURL.subscribe(url=>{
          const gsUrl = firebase.storage().refFromURL(url).toString();
          console.log(gsUrl);
          this.urlColection = gsUrl;
         })
        })
   )
  .subscribe()
    //const donwloadURL = task.downloadURL();
    //console.log(this.selectedFile.name);root
    
  }
  
  getUrl(filePath){
    let urlImg;
     const ref = this.storage.ref(filePath);
     this.profileUrl = ref.getDownloadURL();
     this.profileUrl.subscribe(url=>{
       urlImg=url
       console.log(urlImg);
       const gsUrl = firebase.storage().refFromURL(urlImg).toString();
       console.log(gsUrl);
       this.urlColection = gsUrl;
      })
      
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
  
  }
    

