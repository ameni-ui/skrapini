import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthanticated!: boolean;

  authenticate(email:string, password:string) {

    var user = JSON.parse(localStorage.getItem("User")|| '{}');
    console.log(user);

    if (email==user.email && password==user.password){
        console.log("login service");
        this.isAuthanticated = true;
        return true;
    } else {
        this.isAuthanticated = false;
        return false;
    }

  }

  signup(name:string, email:string, password:string) {
    localStorage.setItem("User", JSON.stringify({"name": name, "email": email, "password": password}));

  }

  verify(): boolean {
    return this.isAuthanticated;
  }
}