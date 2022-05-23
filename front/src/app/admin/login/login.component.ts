import {FormControl, Validators} from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);


  constructor(private serviceAuth: AuthService, private router: Router) { }

  onLogin() {
    console.log(this.email.value);
    console.log(this.password.value);
    console.log( this.serviceAuth.authenticate(this.email.value, this.password.value));
    this.serviceAuth.authenticate(this.email.value, this.password.value);
    
    this.router.navigateByUrl('/admin');
  }

  onSignup() {
    
    this.router.navigateByUrl('/signup');
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
