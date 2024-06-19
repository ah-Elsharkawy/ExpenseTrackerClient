import { Component } from '@angular/core';
import { InsightsComponent } from '../insights/insights.component';
import { IncomeDTComponent } from '../income-dt/income-dt.component';
import { ExpenseDTComponent } from '../expense-dt/expense-dt.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InsightsComponent,IncomeDTComponent,ExpenseDTComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
