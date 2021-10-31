import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MortgageService } from '../../shared/services/mortgage.service';

@Component({
  selector: 'app-solicitor',
  templateUrl: './solicitor.component.html',
  styleUrls: ['./solicitor.component.scss']
})
export class SolicitorComponent implements OnInit {
  
  private otherOccupantForm: FormGroup;
  private solicitorForm: FormGroup;
  otherOccupant: FormControl;
  santanderPanel: FormControl;
  withoutSolicitor: FormControl
  constructor(private router: Router, private mortgageService:MortgageService) { 
    this.otherOccupant=new FormControl('',[Validators.required])
    this.santanderPanel=new FormControl('',[Validators.required])
    this.withoutSolicitor=new FormControl('',[Validators.required])
    this.otherOccupantForm= new FormGroup({
      otherOccupant:this.otherOccupant
    })
    this.solicitorForm=new FormGroup({
      santanderPanel:this.santanderPanel,
      withoutSolicitor:this.withoutSolicitor
    })
  }

  setOtherOccupant(occupant:string){
    this.otherOccupant.setValue(occupant)
  }

  setSolicitorPanel(panel:string){
    this.santanderPanel.setValue(panel)
  }

  setWithoutSolicitor(solicitor:string){
    this.withoutSolicitor.setValue(solicitor)
  }

  onSaveAndContinue(){
    this.mortgageService.setSolicitorDetails(this.otherOccupantForm.value,this.solicitorForm.value)
    this.router.navigateByUrl('/home/payment-details')
  }
  ngOnInit(): void {
    this.otherOccupantForm.setValue(this.mortgageService.getOtherOccupant())
    this.solicitorForm.setValue(this.mortgageService.getSolicitor())
  }

}
