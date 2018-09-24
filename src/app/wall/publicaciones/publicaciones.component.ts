import { Component, OnInit } from '@angular/core';
import { PublishInterface } from '../../models/publishInterface';
import { PublicacionesService } from '../../services/publicaciones.service';


@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {
  posts: PublishInterface[]; //esto es como lo que hizo fabian con el observable
  isEditPost: Boolean = false;
  editPost: PublishInterface;

  constructor(public pubService: PublicacionesService) { }

  ngOnInit() {
    this.pubService.getPublications().subscribe(publicacion=>{
      console.log(publicacion);
      this.posts = publicacion;
    })
  }

  editPostNow(event, post: PublishInterface){
    this.isEditPost = true;
    this.editPost = post;
  }

  updatePost(post: PublishInterface){
    this.pubService.editPublish(post);
  }

  deletePost(event, post: PublishInterface){
 
  }

  clearEdit(){
    this.isEditPost = false;
    this.editPost = null;
  }

}
