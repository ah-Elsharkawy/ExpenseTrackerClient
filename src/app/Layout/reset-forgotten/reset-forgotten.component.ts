import { Component } from '@angular/core';
import { AuthService } from '../../../Core/Service/auth.service';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import{ MessagesModule} from 'primeng/messages'
import { FloatLabelModule } from 'primeng/floatlabel';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-forgotten',
  standalone: true,
  imports: [ButtonModule, PasswordModule, CommonModule, FormsModule,FloatLabelModule],
  templateUrl: './reset-forgotten.component.html',
  styles: [
 
    
  ]
})
export class ResetForgottenComponent {


  Password: string = "";
  passwordConfirm: string = "";
  loading: boolean = false;
  email: string = "";
  token: string = "";
  passwordMatch: boolean = false;
  passwordLengthMinLength: boolean = false;
  passwordCapitalLitters: boolean = false;
  passwordSmallLitters: boolean = false;
  passwordSpecialCharacters: boolean = false;
  passwordNumbers: boolean = false;
  messages:string[] = [];
  constructor(private authService: AuthService,private route : ActivatedRoute,private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
    });

  }
  ResetPassword(){
    this.loading = true;
    this.authService.ResetPassword({Email:this.email,Token:this.token,NewPassword:this.Password}).subscribe(
      (data) => {
        this.loading = false;
        if(data.result){
          Swal.fire({
            icon: 'success',
            title: 'Password Reset',
            text: 'Password has been reset successfully',

          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            }
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Token Expired or Invalid',
          })
        }
      }
    );
  }
  Passwordchanged() {
    if (this.Password.length < 8) {
      this.passwordLengthMinLength = false;
    } else {
      this.passwordLengthMinLength = true;
    }
    if (this.Password.match(/[A-Z]/)) {
      this.passwordCapitalLitters = true;
    } else {
      this.passwordCapitalLitters = false;
    }
    if (this.Password.match(/[a-z]/)) {
      this.passwordSmallLitters = true;
    } else {
      this.passwordSmallLitters = false;
    }
    if (this.Password.match(/[0-9]/)) {
      this.passwordNumbers = true;
    } else {
      this.passwordNumbers = false;
    }
    if (this.Password.match(/[!@#$%^&*]/)) {
      this.passwordSpecialCharacters = true;
    } else {
      this.passwordSpecialCharacters = false;
    }
  }  
  ConfirmPasswordchanged() {
    if (this.Password == this.passwordConfirm) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  }

}
