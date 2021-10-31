import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmMortgageComponent } from './confirm-mortgage/confirm-mortgage.component';
import { HomeComponent } from './home.component';
import { HomeGuard } from './home.guard';
import { HowToApplyComponent } from './how-to-apply/how-to-apply.component';
import { MortgageOptionComponent } from './mortgage-option/mortgage-option.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { ReviewComponent } from './review/review.component';
import { SolicitorComponent } from './solicitor/solicitor.component';
import { ValuationComponent } from './valuation/valuation.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivateChild: [HomeGuard] ,children:
    [
      {path:'', redirectTo: 'how-to-apply', pathMatch:'full'},
      {path:'how-to-apply', component: HowToApplyComponent},
      {path:'mortgage-options', component: MortgageOptionComponent},
      {path:'mortgage-confirmation', component: ConfirmMortgageComponent},
      {path:'property-details', component: PropertyDetailsComponent},
      {path:'validations', component: ValuationComponent},
      {path:'solicitor', component: SolicitorComponent},
      {path:'payment-details', component: PaymentDetailsComponent},
      {path:'review-submit', component: ReviewComponent},
    ] 
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
