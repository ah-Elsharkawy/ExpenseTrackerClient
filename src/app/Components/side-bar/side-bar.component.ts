import { Component, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule ,RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e:any): void {
      this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;
}
