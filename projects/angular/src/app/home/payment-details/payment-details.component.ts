import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../../shared/error-state-matcher';
import { AuthService } from '../../shared/services/auth.service';
import { MortgageService } from '../../shared/services/mortgage.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  sortCode: FormControl;
  accountNumber: FormControl;
  accountHolderName: FormControl;
  currentcircumstances: FormControl;
  currentCircumstances: FormControl;
  dayOfPayment: FormControl;
  userId: FormControl;
  paymentId: FormControl
  PaymentForm: FormGroup;
  private isPaymentSaved: boolean = false;
  // matcher = new MyErrorStateMatcher();
  constructor(private mortgageService: MortgageService, private authService: AuthService, private router:Router) {
    this.sortCode = new FormControl('', [Validators.required]);
    this.accountNumber = new FormControl('', [Validators.required]);
    this.accountHolderName = new FormControl('', [Validators.required]);
    this.currentcircumstances = new FormControl('', [Validators.required]);
    this.currentCircumstances = new FormControl('', []);
    this.dayOfPayment = new FormControl('', [Validators.required]);
    this.userId = new FormControl('', []);
    this.paymentId = new FormControl('', [Validators.required]);

    this.PaymentForm = new FormGroup({

      accountHolderName: this.accountHolderName,
      accountNumber: this.accountNumber,
      currentcircumstances: this.currentcircumstances,
      dayOfPayment: this.dayOfPayment,
      sortCode: this.sortCode,
      userId: this.userId
    })
  }
  setCircumstances = (circumstance: number) => {
    this.currentcircumstances.setValue(circumstance)
    this.currentCircumstances.setValue(circumstance)
  };
  setDayOfPayment = (day: number) => this.dayOfPayment.setValue(day);
  onSaveAndContinue() {
    this.userId.setValue(this.authService.getCurrentUser()?.userId);
    this.PaymentForm.removeControl('currentcircumstances');
    if(!this.PaymentForm.contains('currentCircumstances'))this.PaymentForm.addControl('currentCircumstances',this.currentCircumstances);
    if (this.PaymentForm.contains('paymentId'))
      this.PaymentForm.removeControl('paymentId')
    if (!this.isPaymentSaved)
      this.mortgageService.savePaymentDetails(this.PaymentForm.value).subscribe(data=>{
        this.router.navigateByUrl('/home/review-submit')
      });
    else {
      this.mortgageService.updatePaymentDetails(this.PaymentForm.value).subscribe(data=>{
        this.router.navigateByUrl('/home/review-submit')
      });
    }
    
  }
  ngOnInit(): void {
    this.userId.setValue(this.authService.getCurrentUser()?.userId);

    this.mortgageService.getPaymentDetails().subscribe(res => {
      if (res) {
        this.PaymentForm.addControl('paymentId', this.paymentId);
        this.currentCircumstances.setValue(res.currentcircumstances);
        this.PaymentForm.patchValue(res);
        this.isPaymentSaved = true
      }
    })
  }

}
