import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPublishComponent } from './add-publish.component';

describe('AddPublishComponent', () => {
  let component: AddPublishComponent;
  let fixture: ComponentFixture<AddPublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
