import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , FormsModule , CommonModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm!: FormGroup;
  emailField="false";
  passwordField="true";
  constructor( private formBuilder: FormBuilder ) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group ({
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required,Validators.minLength(6)])
  });
  }
  onSubmit(){

    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
    }
  }

  isShowPassword: boolean = false;
  isShowRePassword: boolean = false;

  handlePass(inputId: string) {
    if (inputId === "password") {
      this.isShowPassword = !this.isShowPassword;
    }
  }




}
