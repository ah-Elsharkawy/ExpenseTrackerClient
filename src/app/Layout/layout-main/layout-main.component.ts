import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavMainComponent } from '../../Components/nav-main/nav-main.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../Components/footer/footer.component';
import { SideMenuComponent } from '../../Components/side-menu/side-menu.component';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [
    CommonModule,
    NavMainComponent,
    RouterOutlet,
    FooterComponent,
    SideMenuComponent,
    NgxSpinnerComponent
  ],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.css',
})
export class LayoutMainComponent implements OnInit {
  constructor(private _NgxSpinnerService : NgxSpinnerService) {}
  
  isLoading: boolean = true;


  ngOnInit(): void {
    this._NgxSpinnerService.show();
    setTimeout(() => {
      this._NgxSpinnerService.hide();
      this.isLoading = false;
    }, 2000);
  }


}
