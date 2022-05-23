import {FormControl, Validators} from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);


  constructor(private serviceAuth: AuthService, private router: Router) { }

  onSignup() {
    console.log(this.name.value);
    console.log(this.email.value);
    console.log(this.password.value);
    this.serviceAuth.signup(this.name.value, this.email.value, this.password.value);
    this.router.navigateByUrl('/login');
  }

  getErrorMessage() {

    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';

  }
  onSubmit(){
    // empty
  }

}
