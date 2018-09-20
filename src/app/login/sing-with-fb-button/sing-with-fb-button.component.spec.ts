import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingWithFbButtonComponent } from './sing-with-fb-button.component';

describe('SingWithFbButtonComponent', () => {
  let component: SingWithFbButtonComponent;
  let fixture: ComponentFixture<SingWithFbButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingWithFbButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingWithFbButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
