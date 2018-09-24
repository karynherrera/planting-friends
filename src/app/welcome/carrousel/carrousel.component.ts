import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class CarrouselComponent implements OnInit {
  images = ['../../../assets/img/agriculture-alternative-alternative-energy-414886.jpg', '../../../assets/img/bruno-scramgnon-bulb-idea-315658.jpg', 
   '../../../assets/img/cuidado-del-medio-ambiente-770x578.jpg',
  '../../../assets/img/carrousel.png'];

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
  

  ngOnInit() {
  }

}




