import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../../services/publicaciones.service';
import { PublishInterface } from '../../models/publishInterface';
import {NgForm} from '@angular/forms/src/directives/ng_form';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddTagComponent } from './add-tag/add-tag.component';

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
    tag:''
  };
  
  constructor(private pubServicio: PublicacionesService, public afAuth: AngularFireAuth, private tagComponent: AddTagComponent) { }

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
        let photo = user.photoURL;
        this.publicacion.date = date;
        this.publicacion.name = name;
        this.publicacion.photoUrl = photo;
        //this.pubServicio.addPublish(this.publicacion);
        this.pubServicio.addPublish(this.publicacion);
      } 
    });
  }

  
}
