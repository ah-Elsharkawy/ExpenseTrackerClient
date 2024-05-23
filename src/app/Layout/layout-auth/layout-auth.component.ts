import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../../Components/footer/footer.component';
import { NavAuthComponent } from '../../Components/nav-auth/nav-auth.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-auth',
  standalone: true,
  imports: [CommonModule , FooterComponent , NavAuthComponent , RouterOutlet],
  templateUrl: './layout-auth.component.html',
  styleUrl: './layout-auth.component.css'
})
export class LayoutAuthComponent {

}
