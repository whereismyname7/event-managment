import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private router: Router) {}

  submitted = false;

  loginForm = new FormGroup({
    username: new FormControl("", [
      Validators.required
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]),
  });

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.submitted = false;
      this.router.navigate([AppRoutes.DASHBOARD]);
    }
  }

  get showErrorMessage(): boolean {
    return this.loginForm.controls.username.errors?.['required']
      || this.loginForm.controls.password.errors?.['required']
  }

  get showErrorMessage2(): boolean {
    return this.loginForm.controls.password.errors?.['minlength']
  }

  get isUsernameValid(): boolean {
    const usernameFormControl = this.loginForm.controls.username;
    return (
      (this.submitted) ||
      (usernameFormControl.touched && usernameFormControl.invalid)
    );
  }
  
  get isPasswordValid(): boolean {
    const passwordFormControl = this.loginForm.controls.password;
    return (
      (this.submitted) ||
      (passwordFormControl.touched && passwordFormControl.invalid)
    );
  }
  
  get isUsernameInvalid(): boolean {
    const usernameFormControl = this.loginForm.controls.username;
    return this.submitted && usernameFormControl.invalid;
  }
  
  get isPasswordInvalid(): boolean {
    const passwordFormControl = this.loginForm.controls.password;
    return this.submitted && passwordFormControl.invalid;
  }


}
