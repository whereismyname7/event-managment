import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.constants';
import { TranslateService } from '@ngx-translate/core';


interface user {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  constructor(public translate: TranslateService, private router: Router) {}

  submitted = false;

  loginForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._-]{1,}$/)
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

  get showErrorMessage3(): boolean {
    return this.loginForm.controls.username.errors?.['pattern']
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
  switchLang() {
    const currentLang = this.translate.currentLang;
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    this.translate.use(newLang);
    document.documentElement.setAttribute('lang',newLang) 
   }


}
