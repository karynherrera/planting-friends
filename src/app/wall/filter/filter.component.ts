import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../../services/publicaciones.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(public pubService: PublicacionesService) { }

  ngOnInit() {
  }

  filtrarTags(event){
    let tag = event.originalTarget.name;
    //console.log(event);
    console.log(tag);
    //this.pubService.filter(tag);
  }
}
