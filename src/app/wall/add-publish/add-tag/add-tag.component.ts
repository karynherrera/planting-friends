import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {
  @Output() onTagChoose: EventEmitter<any> = new EventEmitter<any>(); 
  
  constructor() { }

  ngOnInit() {
  }
  
  public saveTag(choosenTag: string): void { 
    this.onTagChoose.emit(choosenTag); 
  } 
 
}
