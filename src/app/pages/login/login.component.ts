import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
      // this.router.navigate([ROUTES.DASHBOARD]);
    }
  }

  get showErrorMessage(): boolean {
    return this.loginForm.controls.username.errors?.['required']
      || this.loginForm.controls.password.errors?.['required']
  }

  get showErrorMessage2(): boolean {
    return this.loginForm.controls.password.errors?.['minlength']
  }


}
