import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MyErrorStateMatcher } from '../../shared/error-state-matcher';
import { AuthService } from '../../shared/services/auth.service';
import { LoaderService } from '../../shared/services/loader.service';
import { MortgageService } from '../../shared/services/mortgage.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {

  buttonTexts = ['Before 1914', '1914 to 1944', '1945 to 1980', 'After 1980'];
  years: Year[] = [
    { value: '10', viewValue: '10' },
    { value: '20', viewValue: '20' },
    { value: '30', viewValue: '30' }
  ];
  propertyTypes: any = ['Residential', 'Apartment', 'Flat', 'Villa']
  tenures: any = [
    'Freehold',
    'Leasehold',
    'Commonhold',
    'Absolute title/feaudal'
  ]
  propertyAges: any = [10, 20, 30];
  hasDetailsSavedEarlier = false;
  propertyId: FormControl;
  postalCodeControl: FormControl;
  addressControl: FormControl;
  tenureType: FormControl;
  isPropertyCovered: FormControl;
  numberOfBedrooms: FormControl;
  propertyAge: FormControl;
  propertyBuilt: FormControl;
  propertyType: FormControl;
  userId: FormControl;
  propertyDetailsForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(private authService: AuthService, private router:Router, private mortgageService: MortgageService, private loaderService: LoaderService) {
    this.propertyId = new FormControl('', []);
    this.postalCodeControl = new FormControl('', [Validators.required]);
    this.addressControl = new FormControl('', [Validators.required]);
    this.tenureType = new FormControl('', [Validators.required]);
    this.isPropertyCovered = new FormControl('', [Validators.required]);
    this.numberOfBedrooms = new FormControl('', [Validators.required]);
    this.propertyAge = new FormControl('', [Validators.required]);
    this.propertyBuilt = new FormControl('', [Validators.required]);
    this.propertyType = new FormControl('', [Validators.required]);
    this.userId = new FormControl('', []);
    this.propertyDetailsForm = new FormGroup(
      {
        isPropertyCovered: this.isPropertyCovered,
        numberOfBedrooms: this.numberOfBedrooms,
        postCode: this.postalCodeControl,
        propertyAddress: this.addressControl,
        propertyAge: this.propertyAge,
        propertyBuilt: this.propertyBuilt,
        propertyType: this.propertyType,
        tenureType: this.tenureType,
        userId: this.userId
      }
    );
  }

  setTenureType = (tenure: string) => this.tenureType.setValue(tenure);

  setPropertyBuilt = (year: string) => this.propertyBuilt.setValue(year);

  setCoverage = (isCovered: boolean) => isCovered ? this.isPropertyCovered.setValue('Yes') : this.isPropertyCovered.setValue('No');

  onSaveAndContinue() {
    this.loaderService.changeLoadingState(true)
    if (this.propertyId.value) {
      this.mortgageService.updatePropertyDetails(this.propertyDetailsForm.value)
        .subscribe(d => {
          this.loaderService.changeLoadingState(false)
          this.router.navigateByUrl('/home/validations');
        })
    }
    else {
      this.userId.setValue(this.authService.getCurrentUser()?.userId)
      this.mortgageService.savePropertyDetails(this.propertyDetailsForm.value).subscribe(d => {
        this.loaderService.changeLoadingState(false)
        this.router.navigateByUrl('/home/validations');
      })
    }
    


  }

  ngOnInit(): void {
    this.loaderService.changeLoadingState(true);
    if (!this.mortgageService.startFresh)
      this.mortgageService.getPropertyDetails().pipe(map(res => {
        if (res)
          return res.pop();
        return res;
      })).subscribe(res => {
        if (res) {
          this.hasDetailsSavedEarlier = true;
          //let resData: any = { ...res, propertyId: '' };
          this.propertyDetailsForm.addControl('propertyId', this.propertyId);
          // delete resData.propertyId;
          this.propertyDetailsForm.setValue(res);
          this.loaderService.changeLoadingState(false);
        }
      })
  }

}

interface Year {
  value: string, viewValue: string
}