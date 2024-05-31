import { Component,Input } from '@angular/core';
import { Chart } from 'chart.js/dist';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {
@Input () pieData: { labels: string[]; datasets: { data: number[]; backgroundColor: string[]; }[]}
  constructor(){
    this.pieData = { labels: [], datasets: [{ data: [], backgroundColor: ['#36A2EB', '#FF6384'] }]}
  }

}
