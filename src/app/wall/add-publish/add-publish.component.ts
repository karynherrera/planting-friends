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

  constructor(private pubServicio: PublicacionesService, public afAuth: AngularFireAuth, private storage: AngularFireStorage) { }
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  selectedFile = null;

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
       
        //this.pubServicio.addPublish(this.publicacion);
        this.pubServicio.addPublish(this.publicacion);
      } 
    });
  }

 addImg(event) {
    let i = 0;
    this.uploadImg(event, i);
    }

  uploadImg(event,i){
    i++;
    //console.log(event);
    this.selectedFile = event.target.files[0];
    const filePath = this.selectedFile.name;
    const task = this.storage.upload(filePath, this.selectedFile);
    //console.log(this.selectedFile.name);

    let stRef = firebase.storage().ref();
    let imgRef = stRef.child('imgs');

    let spaceRef = imgRef.child(filePath);
    let path = spaceRef.fullPath;
    let name = spaceRef.name;
    let imagesRef = spaceRef.parent;

    stRef.child(filePath).getDownloadURL().then(function(url) {
      // `url` is the download URL for 'images/stars.jpg'
    
      // Or inserted into an <img> element:
      var img = document.getElementById('myimg');
      console.log(url);
      this.publicacion.imgPublish = url;
    }).catch(function(error) {
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
  

