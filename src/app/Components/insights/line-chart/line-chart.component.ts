import { Component, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [ChartModule],
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
