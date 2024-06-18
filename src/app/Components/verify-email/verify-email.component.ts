import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../Core/Service/auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent {
  constructor(private _ActivatedRoute : ActivatedRoute,private _AuthService : AuthService){}

  email : string = '';
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe({
      next :(params) => {
        this.email = params['email'];
      }
    })

    this._AuthService.activateAccount(this.email).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
