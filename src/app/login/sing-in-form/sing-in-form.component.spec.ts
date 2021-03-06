import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingInFormComponent } from './sing-in-form.component';

describe('SingInFormComponent', () => {
  let component: SingInFormComponent;
  let fixture: ComponentFixture<SingInFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingInFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
