import { Component, OnInit } from '@angular/core';
import { PublishInterface } from '../../models/publishInterface';
import { PublicacionesService } from '../../services/publicaciones.service';


@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {


  constructor(private pubService: PublicacionesService) { }

  ngOnInit() {
    this.pubService.getPublications().subscribe(publicacion=>{
      console.log(publicacion);
    })
  }

}
