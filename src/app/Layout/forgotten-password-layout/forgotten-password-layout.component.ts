import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../Core/Service/auth.service';
import { ButtonModule } from 'primeng/button';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotten-password-layout',
  standalone: true,
  imports: [PasswordModule,FormsModule,CommonModule,ButtonModule],
  templateUrl: './forgotten-password-layout.component.html',
  styleUrl: './forgotten-password-layout.component.css'
})
export class ForgottenPasswordLayoutComponent {

  Step: number = 1;
  Email: string = "";
  loading: boolean = false;
  constructor(private authService: AuthService){
  }
  SendEmail(){
    this.loading = true;
    this.authService.generateToken(this.Email).subscribe(
      (data) => {
        if(data.result){

          this.Step = 2;
            Swal.fire({
              icon: 'success',
              title: 'Email Sent',
              text: 'Please check your email for further instructions',
            })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Email not found',
          })
        }
        this.loading = false;

      }
    );
  }

}
