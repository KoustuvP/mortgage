import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { LoaderService } from '../shared/services/loader.service';
import { MortgageService } from '../shared/services/mortgage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  routerLinks = [
    { name: 'How to Apply', path: 'how-to-apply' },
    { name: 'Mortgage Options', path: 'mortgage-options' },
    { name: 'Confirm Mortgage', path: 'mortgage-confirmation' },
    { name: 'Property Details', path: 'property-details' },
    { name: 'Validations', path: 'validations' },
    { name: 'Solicitors', path: 'solicitor' },
    { name: 'Payment Details', path: 'payment-details' },
    { name: 'Review And Submit', path: 'review-submit' }
  ]
  isOpened: boolean = false;

  constructor(private router: Router, private loaderService: LoaderService, private mortgageService: MortgageService) { }

  ngOnInit(): void {
    this.router.events.pipe(map(event => {
      if (event instanceof NavigationStart) {
        this.loaderService.changeLoadingState(true)
      }
      return event;
    }),
      delay(1000)).subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.loaderService.changeLoadingState(false)
        }
        if (event instanceof NavigationCancel) {
          this.loaderService.changeLoadingState(false)
          this.isOpened = true;
        }
      })
    forkJoin({
      propertyDetails: this.mortgageService.getPropertyDetails().pipe(catchError(err=>of([]))),
      valuation: this.mortgageService.getValuation().pipe(catchError(err=>of([]))),
      paymentDetails: this.mortgageService.getPaymentDetails().pipe(catchError(err=>of(undefined)))
    })
      .subscribe(({ propertyDetails, valuation, paymentDetails }) => {
        if (propertyDetails&&propertyDetails.length) {
          if (propertyDetails.length == valuation.length && paymentDetails) {
            //this.mortgageService.startFresh = true;
            this.mortgageService.setAvailability(true, true, true,true)
          }
          else if (propertyDetails.length == valuation.length && !paymentDetails) {
            this.mortgageService.startFresh = false;
            this.mortgageService.setAvailability(true, true, false,true)
          }
          else if (propertyDetails.length > valuation.length) {
            this.mortgageService.startFresh = false;
            this.mortgageService.setAvailability(true, true, false,false)
          }
        }
        else {
          this.mortgageService.startFresh = false;
          this.mortgageService.setAvailability(false, false, false,false)
        }

      });
  }
}
