import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitorComponent } from './solicitor.component';

describe('SolicitorComponent', () => {
  let component: SolicitorComponent;
  let fixture: ComponentFixture<SolicitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
