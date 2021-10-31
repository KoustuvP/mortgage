import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { MortgageService } from '../../shared/services/mortgage.service';
import { PaymentDetailsGetRes } from '../models/payment-details-get-response';
import { PropertyDetailsGetRes } from '../models/property-details-get-response';
import { ValuationGetRes } from '../models/valuation-get-response';
import { PropertyDetailsComponent } from '../property-details/property-details.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  panelOpenState = false;
  //panels = ['Property Details', 'Valuation', 'Other Occupants', 'Solicitor Details', 'payments Details'];
  panels:any
  propertyDetails?: PropertyDetailsGetRes;
  valuation?: ValuationGetRes;
  paymentDetails?: any
  constructor(private mortgageService: MortgageService) {
    this.panels=[
      {
        title: 'Property Details',
        data: this.propertyDetails,
        link: '/home/property-details'
      },
      {
        title: 'Valuation',
        data: this.valuation,
        link: '/home/validations'
      },
      {
        title: 'Other Occupants',
        data: {},
        link: '/home/solicitor'
      },
      {
        title: 'Solicitor Details',
        data: {},
        link: '/home/solicitor'
      },
      {
        title: 'payments Details',
        data: this.paymentDetails,
        link: '/home/payment-details'
      }
    ]

  }


  ngOnInit(): void {
    this.mortgageService.getPropertyDetails().subscribe(details => {
      this.propertyDetails = details.pop();
    })
    this.mortgageService.getValuation().subscribe(valuation => {
      this, valuation = valuation;
    })
    forkJoin({
      propertyDetails: this.mortgageService.getPropertyDetails().pipe(map(res=>res.pop())),
      valuation: this.mortgageService.getValuation().pipe(map(res=>res.pop())),
      paymentDetails: this.mortgageService.getPaymentDetails()
    })
    .subscribe(({propertyDetails, valuation, paymentDetails}) => {
      this.panels[0].data=this.propertyDetails = propertyDetails;
      this.panels[1].data=this.valuation = valuation;
      this.panels[2].data = this.mortgageService.getOtherOccupant();
      this.panels[3].data= this.mortgageService.getSolicitor()
      this.panels[4].data=this.paymentDetails = paymentDetails;
    });
    
  }

}

