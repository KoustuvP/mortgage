import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mortgage-option',
  templateUrl: './mortgage-option.component.html',
  styleUrls: ['./mortgage-option.component.scss']
})
export class MortgageOptionComponent implements OnInit {

  data:any=[{
    "description": "string",
    "initialRate": 0,
    "monthlyRepayment": "string",
    "productFee": 0,
    "monthlRepayments": "string",
  }]
  options:any;

  constructor(private router:Router) { 
  }

  onSaveAndContinue=()=>this.router.navigateByUrl('/home/mortgage-confirmation')

  ngOnInit(): void {
    this.options=Object.keys(this.data[0])
  }

}
