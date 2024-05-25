import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Core/Service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private _Router: Router,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService
  ) {}

  isShowPassword: boolean = false;
  isShowRePassword: boolean = false;

  handlePass(inputId: string) {
    if (inputId === 'password') {
      this.isShowPassword = !this.isShowPassword;
    } else if (inputId === 'repassword') {
      this.isShowRePassword = !this.isShowRePassword;
    }
  }

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/),
      ]),
      rePassword: new FormControl(''),
    },
    { validators: this.confirmPassword } as FormControlOptions
  );
  
  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if (rePassword?.value == '') {
      rePassword?.setErrors({ required: true });
    } else if (password?.value !== rePassword?.value) {
      rePassword?.setErrors({ mismatch: true });
    }
  }

  handleForm() {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this._AuthService
        .register(this.registerForm.value)
        .subscribe({
          next: (response) => {
              if(response.success===true){ 
                this._ToastrService.success('You have successfully registered' , "" , {
                  timeOut: 2500,
                });
                console.log(response);
                this.registerForm.reset();
                setTimeout(() => {
                  this._Router.navigate(['/login']);
                }, 3000);
              }
          },
          error: (error) => {
            this._ToastrService.error('This Email is already registered', 'Error');
          },
        });
    }
  }
}
