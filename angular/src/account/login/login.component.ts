import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  handleLogin() {
    console.log(this.loginForm.value);
  }

  isShowPassword: boolean = false;

  handlePass(inputId: string) {
    if (inputId === 'password') {
      this.isShowPassword = !this.isShowPassword;
    }
  }
}
