import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-how-to-apply',
  templateUrl: './how-to-apply.component.html',
  styleUrls: ['./how-to-apply.component.scss']
})
export class HowToApplyComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  continue=()=>this.router.navigateByUrl('/home/mortgage-options')
  ngOnInit(): void {
  }


}
