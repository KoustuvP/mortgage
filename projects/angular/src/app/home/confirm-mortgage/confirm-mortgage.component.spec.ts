import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMortgageComponent } from './confirm-mortgage.component';

describe('ConfirmMortgageComponent', () => {
  let component: ConfirmMortgageComponent;
  let fixture: ComponentFixture<ConfirmMortgageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmMortgageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMortgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
