import { Component, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Core/Service/auth.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule ,RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  userEmail : string = "";
  constructor(private _AuthService : AuthService) {}
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e:any): void {
      this.sidebarRef.close(e);
  }

  ngOnInit(): void {
    this._AuthService.decodeUser();
    this.userEmail = this._AuthService.userInfo["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
  }
  sidebarVisible: boolean = false;
}
