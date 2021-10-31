import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageOptionComponent } from './mortgage-option.component';

describe('MortgageOptionComponent', () => {
  let component: MortgageOptionComponent;
  let fixture: ComponentFixture<MortgageOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortgageOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
