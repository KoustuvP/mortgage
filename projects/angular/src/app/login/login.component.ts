import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../shared/error-state-matcher';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: this.emailFormControl,
      pwd: this.passwordFormControl
    });
    this.authService.authentication.subscribe(data=>{
      data?this.router.navigate(['/home']):this.router.navigate(['/login'])
    })
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  onAuthentication(){
      this.authService.authenticate(this.loginForm.value
        
        );
  }
  

}
