import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../Components/footer/footer.component';
import { NavAuthComponent } from '../../Components/nav-auth/nav-auth.component';
import { RouterOutlet } from '@angular/router';
import { NgxSpinner, NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-layout-auth',
  standalone: true,
  imports: [CommonModule , FooterComponent , NavAuthComponent , RouterOutlet ,NgxSpinnerComponent],
  templateUrl: './layout-auth.component.html',
  styleUrl: './layout-auth.component.css'
})
export class LayoutAuthComponent implements OnInit{

  isLoading: boolean = true;

  constructor(private _NgxSpinnerService : NgxSpinnerService) {}
  ngOnInit(): void {
    this._NgxSpinnerService.show();
    setTimeout(() => {
      this._NgxSpinnerService.hide();
      this.isLoading = false;
    }, 2000);
  }

}
