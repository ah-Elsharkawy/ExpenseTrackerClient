import { Component } from '@angular/core';
import { InsightsComponent } from '../insights/insights.component';
import { IncomeDTComponent } from '../income-dt/income-dt.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InsightsComponent,IncomeDTComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
