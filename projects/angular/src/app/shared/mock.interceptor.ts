import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const {url,method,body,headers} = request;
    
    if(url.includes('/authenticate'))
    return  of(new HttpResponse({
      status:200,
      body: {
        role:'admin'
      }
    }))
    else if(url.includes('propertyDetails')) {
      return  of(new HttpResponse({
        status:200,
        body: {
          "userId": 75,
          "propertyId": 36,
          "propertyAddress": "India",
          "propertyType": "Flat",
          "numberOfBedrooms": 3,
          "propertyBuilt": "After 1980",
          "propertyAge": 10,
          "isPropertyCovered": "Yes",
          "tenureType": "Freehold",
          "postCode": "712617"
      }
      }))
    }

    else
    return of( new HttpResponse({
      status:200,
      body:"success"
    })).pipe(delay(3000));
    //return next.handle(request);
  }
}
