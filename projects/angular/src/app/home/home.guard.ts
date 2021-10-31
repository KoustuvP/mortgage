import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MortgageService } from '../shared/services/mortgage.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivateChild {
  prevUrl: string = '';
  isAllowed: boolean = false;
  constructor(private router: Router, private mortgageService: MortgageService) { }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.isAllowed = false;

    switch (state.url) {
      case '/home/how-to-apply':
        this.isAllowed = true;
        break;
      case '/home/mortgage-options':
        this.isAllowed = true;
        break;
      case '/home/mortgage-confirmation':
        this.isAllowed = true;
        break;
      case '/home/property-details':
        this.mortgageService.isPropertyDetailsAvailable?this.isAllowed = true:this.isAllowed=false;
        break;
        case '/home/validations':
        this.mortgageService.isValuationDetailsAvailable?this.isAllowed = true:this.isAllowed=false;
        break;
        case '/home/solicitor':
        this.mortgageService.isSolicitorAvailable?this.isAllowed = true:this.isAllowed=false;
        break;
        case '/home/payment-details':
        this.mortgageService.isPaymentDetailsAvailable?this.isAllowed = true:this.isAllowed=false;
        break;
        case '/home/review-submit':
        this.mortgageService.isPaymentDetailsAvailable&&
        this.mortgageService.isValuationDetailsAvailable&&
        this.mortgageService.isPropertyDetailsAvailable
        ?this.isAllowed = true:this.isAllowed=false;
        break;
      default:
        this.isAllowed = false;
    }
    if (!this.isAllowed)
      this.router.navigateByUrl(this.prevUrl);
    else
      this.prevUrl = state.url;
    return this.isAllowed
  }

}
