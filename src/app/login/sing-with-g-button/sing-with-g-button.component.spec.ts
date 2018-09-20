import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingWithGButtonComponent } from './sing-with-g-button.component';

describe('SingWithGButtonComponent', () => {
  let component: SingWithGButtonComponent;
  let fixture: ComponentFixture<SingWithGButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingWithGButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingWithGButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
