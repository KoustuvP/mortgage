import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MortgageOptionComponent } from './mortgage-option/mortgage-option.component';
import { ConfirmMortgageComponent } from './confirm-mortgage/confirm-mortgage.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { ValuationComponent } from './valuation/valuation.component';
import { SolicitorComponent } from './solicitor/solicitor.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ReviewComponent } from './review/review.component';
import { HowToApplyComponent } from './how-to-apply/how-to-apply.component';
import { SharedModule } from '../shared/shared.module';
import { NoticeComponent } from './notice/notice.component';

@NgModule({
  declarations: [HomeComponent, HowToApplyComponent, MortgageOptionComponent, ConfirmMortgageComponent, PropertyDetailsComponent, ValuationComponent, SolicitorComponent, PaymentDetailsComponent, ReviewComponent, NoticeComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule]
})
export class HomeModule {}
