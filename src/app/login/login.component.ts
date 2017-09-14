import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService,ApiService,RolesService } from "../core/services";
import { MdSnackBar } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const Passwod = "admin";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;
  isLoading: boolean;
  res: any;
  ErrorMsg: string;

  emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);

  passwordFormControl = new FormControl('', [Validators.required,Validators.pattern(Passwod)]);

  constructor(
    private router: Router,
    private authService: AuthService,
    private api: ApiService,
    private rolesService: RolesService,
    private snackbar: MdSnackBar) { }


  onLogin() {

    const loginRequest = {
      email: this.email,
      password: this.password
    };

    this.isLoading = true;
    this.authService
      .login(loginRequest)
      .subscribe(authResponse => {
        //console.log("In Login Component : ",authResponse);
        this.isLoading = false;
        const route = this.rolesService.getDefaultRoute(authResponse.role.name);
        //console.log("Inside login:route value",route);
        console.log("Inside login:Role",authResponse.role.name);
        this.router.navigate([route]);
        console.log("Inside login:authResponse",authResponse.token);
      }, errors => {

        this.snackbar.open(errors.errors.email_or_password, 'Please Enter Valid Email and Password', {
          duration: 1000
        });

        this.isLoading = false;
      });

  }
}
