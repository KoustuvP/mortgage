import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { MortgageService } from '../../shared/services/mortgage.service';

@Component({
  selector: 'app-valuation',
  templateUrl: './valuation.component.html',
  styleUrls: ['./valuation.component.scss']
})
export class ValuationComponent implements OnInit {

  persons=['Deputy Manager','Branch Manager','Manager']
  contactPerson: FormControl;
  contactName: FormControl;
  contactNumber: FormControl;
  isPropertyInScotland: FormControl;
  userId: FormControl;
  valuationId: FormControl;
  valuationForm: FormGroup;
  hasDetailsSavedEarlier: boolean=false;
  constructor(private mortgageService: MortgageService, private authService: AuthService, private router:Router) { 
    this.contactPerson = new FormControl('', [Validators.required]);
    this.contactName = new FormControl('', [Validators.required]);
    this.contactNumber = new FormControl('', [Validators.required]);
    this.isPropertyInScotland = new FormControl('',[]);
    this.userId = new FormControl('',[]);
    this.valuationId = new FormControl('',[]);
    this.valuationForm = new FormGroup({
      contactName: this.contactName,
      contactNumber: this.contactNumber,
      contactPerson: this.contactPerson,
      isPropertyInScotland: this.isPropertyInScotland,
      userId: this.userId
      })
  }

  setLocationScotland=(isScotland:number)=>this.isPropertyInScotland.setValue(isScotland)
  onSaveAndContinue(){
    if(!this.hasDetailsSavedEarlier)
    this.mortgageService.saveValuation(this.valuationForm.value).subscribe(
      res=>this.router.navigateByUrl('/home/solicitor')
    );
    
  }

  ngOnInit(): void {
    this.userId.setValue(this.authService.getCurrentUser()?.userId)
    if(!this.mortgageService.startFresh)
    this.mortgageService.getValuation().pipe(map(res=>res.pop())).subscribe(res => {
      if (res) {
        this.hasDetailsSavedEarlier = true;
        //let resData: any = { ...res, propertyId: '' };
        //this.valuationForm.addControl('valuationId', this.valuationId);
        // delete resData.propertyId;
        this.valuationForm.setValue(res);
        this.hasDetailsSavedEarlier=true;
        //this.loaderService.changeLoadingState(false);
      }
    })
  }

}
