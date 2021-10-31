import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../shared/error-state-matcher';
import { AuthService } from '../shared/services/auth.service';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService, private router:Router, private loaderService: LoaderService) { 
    this.registrationForm = new FormGroup({
      dateOfBirth: this.dobControl,
      email: this.emailFormControl,
      firstName: this.firstNameControl,
      forgetPasswordA: this.securityAnswerControl,
      forgetPasswordQ: this.securityQuestionControl,
      lastName: this.lastNameControl,
      password: this.passwordFormControl,
    });
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [ Validators.required ]);
  firstNameControl = new FormControl('', [ Validators.required ]);
  lastNameControl = new FormControl('', [ Validators.required ]);
  securityQuestionControl = new FormControl('', [ Validators.required ]);
  securityAnswerControl = new FormControl('', [ Validators.required ]);
  dobControl = new FormControl('', [ Validators.required ]);

  onRegistration () {
    this.loaderService.changeLoadingState(true);
    this.authService.register(this.registrationForm.value).subscribe();
    this.router.navigate(['/login'])
    
  }

  ngOnInit(): void {
    
  }

}
