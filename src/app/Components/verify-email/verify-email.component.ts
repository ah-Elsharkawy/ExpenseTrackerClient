import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../Core/Service/auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']  // Note the change from 'styleUrl' to 'styleUrls'
})
export class VerifyEmailComponent implements OnInit {
  email: string = '';
  token: string = '';

  constructor(private _ActivatedRoute: ActivatedRoute, private _AuthService: AuthService) {}

  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe({
      next: (queryParams) => {
        this.email = queryParams['Email'];
        this.token = queryParams['token'];
      }
    });

    console.log(this.email);
    console.log('======================================');
    console.log(this.token);

    this._AuthService.activateAccount(this.email, this.token).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
