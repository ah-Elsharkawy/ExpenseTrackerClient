import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [ChartModule, MatCardModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {
  @Input() LineDate: any;
  basicOptions: any;
  constructor(){
    this.basicOptions = { 
      legend: {
        labels: {
          fontColor: '#495057'
        },
      
      }
  
    }
  }
}
