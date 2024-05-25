import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavMainComponent } from '../../Components/nav-main/nav-main.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../Components/footer/footer.component';
import { SideMenuComponent } from '../../Components/side-menu/side-menu.component';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [
    CommonModule,
    NavMainComponent,
    RouterOutlet,
    FooterComponent,
    SideMenuComponent,
  ],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.css',
})
export class LayoutMainComponent {}
