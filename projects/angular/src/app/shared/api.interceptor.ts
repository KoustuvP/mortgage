import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url, method, body, headers } = request;
    if (!this.authService.getToken() && (url.includes('register')||url.includes('authenticate'))) {
      const cloned = request.clone({
        headers: new HttpHeaders({
          'Content-type': 'application/json',
        })
      })
      return next.handle(cloned)
    }
    // else if(url.includes('confirmMortgage'))
    // return of(new HttpResponse({
    //   status:200,
    //   body: mortgageConfirmation
    // }));
    return next.handle(request.clone({headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })}))
  }
}

const mortgageConfirmation= {
  "borrowingAmount": 2500,
  "buyerType": "Owner",
  "estimatedPropertyValue": 4500,
  "followOnRate": 10,
  "initialRate": 10,
  "loanToValue": 10,
  "monthlyRepayment": 500,
  "mortgageTerm": "5 Years",
  "productFee": 10,
  "productFeeAddedToLoanAmt": 10,
  "rateFinishedDate": "2021-06-21",
  "repaymentMethod": "Credit Card"
}
