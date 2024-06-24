import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  Router, RouterLink } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { AuthService } from '../../../Core/Service/auth.service';
import { DialogModule } from 'primeng/dialog';

//import * as bootstrap from "bootstrap";


@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [CommonModule , RouterLink ,SideBarComponent,DialogModule],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css'
})
export class NavMainComponent {
  constructor(private _Router : Router , private _AuthService : AuthService) {
  }

  userEmail : string = "";
  notifications : any[] = [];

  ngOnInit(): void {
    this._AuthService.decodeUser();
    this.userEmail = this._AuthService.userInfo["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    this._AuthService.getNotifications().subscribe(
      (data) => {
        this.notifications = data.result; // Assuming the response has a 'result' property that contains the notifications array
        console.log('Notifications fetched successfully', this.notifications);
      },
      (error) => {
        console.error('Error fetching notifications', error);
      }
    );
  }
  handleLogout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this._Router.navigate(['/login']);

    }
  }

  
  // openIncomeModal() {
  //   const modal = new bootstrap.Modal(document.getElementById('incomeModal1')!);
  //   modal.show();

  // }
}
