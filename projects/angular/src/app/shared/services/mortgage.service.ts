import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/santander-angular/src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PaymentDetailsGetRes } from '../../home/models/payment-details-get-response';
import { ValuationGetRes } from '../../home/models/valuation-get-response';
import { CurrentUser } from '../model/CurrentUser';

import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class MortgageService {
  //currentUser:CurrentUser; 
  isPropertyDetailsAvailable=false;
  isValuationDetailsAvailable=false;
  isSolicitorAvailable=false;
  isPaymentDetailsAvailable=false;
  startFresh: boolean=false;
  otherOccupant={otherOccupant:'Yes'}
  solicitorDetails={santanderPanel:'Yes',withoutSolicitor:'No'}
  constructor(private http:HttpClient, private notificationService: NotificationService, private loadeService: LoaderService,private authService: AuthService) { }

  setAvailability(isProp:boolean,isVal:boolean,isPay:boolean,isSoli:boolean){
    this.isPropertyDetailsAvailable=isProp;
    this.isValuationDetailsAvailable=isVal;
    this.isPaymentDetailsAvailable=isPay;
    this.isSolicitorAvailable=isSoli;
  }
  savePropertyDetails(details:any):Observable<PropertyDetailsSaveRes>{
    
    return this.http.post<PropertyDetailsSaveRes>(`${environment.endpoint}/mortgage-api/api/propertyDetails`,details).pipe(map(res=>{
     // this.loadeService.changeLoadingState(false);
      this.notificationService.setmessage(res.message);
      this.isValuationDetailsAvailable=true;
      return res;
    }
    ));
  }

  updatePropertyDetails(details:any):Observable<PropertyDetailsSaveRes>{
    //this.loadeService.changeLoadingState(true);
    this.isValuationDetailsAvailable=true;
    return this.http.put<PropertyDetailsSaveRes>(`${environment.endpoint}/mortgage-api/api/propertyDetails/${this.authService.getCurrentUser()?.userId}`,details)
    .pipe(map((res:PropertyDetailsSaveRes)=>{
    //  this.loadeService.changeLoadingState(false);
      this.notificationService.setmessage(res.message);
      return res;
    }
    ));
  }

  getPropertyDetails():Observable<PropertyDetailsGetRes[]>{
    //this.loadeService.changeLoadingState(true);
    return this.http.get<PropertyDetailsGetRes[]>(`${environment.endpoint}/mortgage-api/api/propertyDetailsById/${this.authService.getCurrentUser()?.userId}`).pipe(
      tap(()=>this.loadeService.changeLoadingState(false)),
      )
  }

  savePaymentDetails(details:any):Observable<PropertyDetailsSaveRes>{
    
    return this.http.post<PropertyDetailsSaveRes>(`${environment.endpoint}/mortgage-api/api/payment-details`,details).pipe(map(res=>{
     // this.loadeService.changeLoadingState(false);
      this.notificationService.setmessage(res.message);
      this.isPaymentDetailsAvailable=true;
      return res;
    }
    ));
  }

  updatePaymentDetails(details:any):Observable<PropertyDetailsSaveRes>{
    //this.loadeService.changeLoadingState(true);
    this.isValuationDetailsAvailable=true;
    return this.http.put<PropertyDetailsSaveRes>(`${environment.endpoint}/mortgage-api/api/update/payment-details/`,details)
    .pipe(map((res:PropertyDetailsSaveRes)=>{
    //  this.loadeService.changeLoadingState(false);
      this.notificationService.setmessage(res.message);
      return res;
    }
    ));
  }

  getPaymentDetails():Observable<PaymentDetailsGetRes>{
    //this.loadeService.changeLoadingState(true);
    return this.http.get<PaymentDetailsGetRes>(`${environment.endpoint}/mortgage-api/api/getPaymentDetailsById/${this.authService.getCurrentUser()?.userId}`).pipe(
     // tap(()=>this.loadeService.changeLoadingState(false)),
      )
  }

  saveValuation(valuation:any):Observable<PropertyDetailsSaveRes>{
    
    return this.http.post<PropertyDetailsSaveRes>(`${environment.endpoint}/mortgage-api/api/valuation`,valuation).pipe(map(res=>{
     // this.loadeService.changeLoadingState(false);
      this.notificationService.setmessage(res.message);
      this.isSolicitorAvailable=true;
      return res;
    }
    ));
  }

  getValuation():Observable<ValuationGetRes[]>{
    //this.loadeService.changeLoadingState(true);
    if(this.authService.getCurrentUser()?.userId)
    return this.http.get<ValuationGetRes[]>(`${environment.endpoint}/mortgage-api/api/valuation/${this.authService.getCurrentUser()?.userId}`).pipe(
   //   tap(()=>this.loadeService.changeLoadingState(false)),
      )
      return throwError('User Id is not present');
  }

  // saveSolicitors():Observable<any>{
  //   this.isPaymentDetailsAvailable=true
  //   return of({

  //   })
  // }
  confirmMortgage(){
    this.isPropertyDetailsAvailable=true;
  }
  getOtherOccupant(){
    return this.otherOccupant;
  }
  getSolicitor(){
    return this.solicitorDetails
  }
  setSolicitorDetails(occupant:any,solicitor:any){
    this.otherOccupant=occupant;
    this.solicitorDetails=solicitor;
    this.isPaymentDetailsAvailable=true
  }
  
}

interface PropertyDetailsSaveRes {
  userId: string, message:string 
}
interface PropertyDetailsGetRes{
  "isPropertyCovered": string,
  "numberOfBedrooms": string,
  "postCode": string,
  "propertyAddress": string,
  "propertyAge": number,
  "propertyBuilt": string,
  "propertyId": string,
  "propertyType": string,
  "tenureType": string,
  "userId": string
}
