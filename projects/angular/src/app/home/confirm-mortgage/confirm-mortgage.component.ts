import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MortgageService } from '../../shared/services/mortgage.service';

@Component({
  selector: 'app-confirm-mortgage',
  templateUrl: './confirm-mortgage.component.html',
  styleUrls: ['./confirm-mortgage.component.scss']
})
export class ConfirmMortgageComponent implements OnInit {

  isAccepted: FormControl;
  isHappy: FormControl;
  mortgageConfirmationForm: FormGroup;
  constructor(private mortgageService:MortgageService,private router: Router) { 
    this.isAccepted=new FormControl(false,[Validators.requiredTrue]);
    this.isHappy=new FormControl(false,[Validators.requiredTrue]);
    this.mortgageConfirmationForm=new FormGroup({
      isAccepted:this.isAccepted,
      isHappy:this.isHappy
    })
  }

  onContinue(){
    this.mortgageService.confirmMortgage();
    this.router.navigate(['/home/property-details'])
  }
  ngOnInit(): void {
    if(this.mortgageService.isPropertyDetailsAvailable){
      this.mortgageConfirmationForm.setValue({
        isAccepted: true,
        isHappy: true
      })
    }
  }
  getError(){
    return !this.mortgageConfirmationForm.valid
  }

}
