import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  Router, RouterLink } from '@angular/router';
import { IncomeFormComponent } from '../income/income-form/income-form.component';
//import * as bootstrap from "bootstrap";


@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [CommonModule , RouterLink ,IncomeFormComponent],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css'
})
export class NavMainComponent {

  constructor(private _Router : Router) {}

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
