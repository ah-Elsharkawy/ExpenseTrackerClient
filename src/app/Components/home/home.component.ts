import { Component } from '@angular/core';
import { InsightsComponent } from '../insights/insights.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InsightsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
