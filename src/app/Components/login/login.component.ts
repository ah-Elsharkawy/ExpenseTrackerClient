import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Core/Service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  

  public loginForm!: FormGroup;
  emailField = 'false';
  passwordField = 'true';
  errorMsg : string = '';

  constructor(private formBuilder: FormBuilder , private _AuthService : AuthService ,private _Router : Router, private _ToastrService : ToastrService) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userNameOrEmailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });
  }
  onSubmit() {
    Object.values(this.loginForm.controls).forEach((control) => {
      control.markAsTouched();
      control.markAsDirty();
    });
    if (this.loginForm.valid) {
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (data) => {
          if(data.success==true){
            localStorage.setItem('token',data.result.accessToken);
            this._ToastrService.success('You have LoggedIn Successfully' , "" , {
              timeOut: 2500,
            });
            this.loginForm.reset();
            setTimeout(() => {
              this._Router.navigate(['/home']);
            }, 3000);
          }
        },
        error: (error) => {
          console.log(error.error.error.details);
          this.errorMsg = error.error.error.details;
        },
      });
    }
  }

  isShowPassword: boolean = false;
  isShowRePassword: boolean = false;

  handlePass(inputId: string) {
    if (inputId === 'password') {
      this.isShowPassword = !this.isShowPassword;
    }
  }
}
