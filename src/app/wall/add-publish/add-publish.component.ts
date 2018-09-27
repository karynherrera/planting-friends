import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../../services/publicaciones.service';
import { PublishInterface } from '../../models/publishInterface';
import {NgForm} from '@angular/forms/src/directives/ng_form';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    imgPublish: '',
  };

  constructor(public pubServicio: PublicacionesService, public afAuth: AngularFireAuth, public storage: AngularFireStorage) { }
  uploadPercent: Observable<number>;
  profileUrl: Observable<string | null>;
  downloadURL: Observable<string>;
  selectedFile = null;
  filePath: string;

  ngOnInit() {
  }

  //validar que no este vacio para postear
 
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
        //this.publicacion.imgPublish= this.getUrl(this.filePath);
        //this.pubServicio.addPublish(this.publicacion);
        this.pubServicio.addPublish(this.publicacion);
      } 
    });
  }

 

  addImg(event){
    //console.log(event);
    this.selectedFile = event.target.files[0];
    const fileroot = this.selectedFile.name;
    const task = this.storage.upload(fileroot, this.selectedFile);
    //console.log(this.selectedFile.name);
    this.filePath = fileroot;
    this.getUrl(fileroot);
  }
  
  getUrl(filePath){
    let urlImg;
    let stRef = firebase.storage().ref();
    let imgRef = stRef.child('imgs');
    let path = 'imgs/'+filePath;
    console.log(path);
    stRef.child(filePath).getDownloadURL().then(function(url) {
      urlImg = url;
      console.log(url);
      const ref = this.storage.ref(`imgs/${filePath}`);
      this.profileUrl = ref.getDownloadURL();
      console.log(ref.getDownloadURL());
       //return console.log(urlImg);
       //return urlImg;
    }).catch(function(error) {
      console.log(error);
      // Handle any errors
    });
    //console.log(imagesRef);
    //let imagenUrl= this.storage.ref(filePath).getDownloadURL;
    //console.log(imagenUrl);
    //const ref = this.storage.ref(filePath);
    //const task2 = ref.put(this.selectedFile);
    //console.log(task2);
    
  }
  
  }
    

