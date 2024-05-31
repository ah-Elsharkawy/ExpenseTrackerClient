import { CommonModule } from '@angular/common';
import { Component,OnChanges,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { InsightsService } from '../../../Core/Service/insights.service';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [ChartModule,CommonModule,FormsModule,LineChartComponent,PieChartComponent],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css'
})
export class InsightsComponent  implements OnInit{


      LineDate:any
      pieData: { labels: string[]; datasets: { data: number[]; backgroundColor: string[]; }[]}
      mode = ['Yearly', 'Monthly']
      selectedMode:string = 'Yearly';

      Lables: string[] = [];
      expenseData: number[] = [];
      incomeData: number[] = [];
      constructor(private insightsService: InsightsService) { 
this.LineDate = {
    labels: [], // Add your labels here
    datasets: [
        {
            label: 'Income',
            data: [], // Add your data here
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue background color for the area under the curve
            borderColor: '#36A2EB', // Blue color for the line
            borderWidth: 2,
            fill: true,
            tension: 0.4, // Makes the line curvy
            pointRadius: 0 // Removes points on the line
        },
        {
            label: 'Expense',
            data: [], // Add your data here
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light red background color for the area under the curve
            borderColor: '#FF6384', // Red color for the line
            borderWidth: 2,
            fill: true,
            tension: 0.4, // Makes the line curvy
            pointRadius: 0 // Removes points on the line
        }
    ],

};
        this.pieData = { labels: [], datasets: [{ data: [], backgroundColor: ['#36A2EB', '#FF6384'] }]}
  
      }
    
      ngOnInit() {

        this.pieData.labels = ['Income', 'Expense'];
        this.updateChart()       

      }
      updateChart(){
        if(this.selectedMode == 'Monthly'){
          this.assignMonthlyData()
        }else if(this.selectedMode == 'Yearly'){
          this.assingYearlyData()
        
        }
      
      }
      assignMonthlyData() {
        let income = this.insightsService.GetAllIncomeTransactions_GroupedByDays_InCurrentMonth();
        let expense = this.insightsService.GetAllExpenseTransactions_GroupedByDays_InCurrentMonth();
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        let days = new Date(currentYear, currentMonth + 1, 0).getDate();
      
        let labels = [];
        let incomeData = [];
        let expenseData = [];
      
        for (let i = 0; i < days; i++) {
          labels.push(`${i+1}`);
          incomeData.push(income[i]);
          expenseData.push(expense[i]);
        }
      
        this.LineDate = {
          labels: labels,
          datasets: [
            { ...this.LineDate.datasets[0], data: incomeData  },
            {  ...this.LineDate.datasets[1], data: expenseData}
          ]
        };
      }
      
      assingYearlyData() {
        let income = this.insightsService.GetAllIncomeTransactions_GroupedByMonth_InCurrentYear();
        let expense = this.insightsService.GetAllExpenseTransactions_GroupedByMonth_InCurrentYear();
      
        let labels = [];
        let incomeData = [];
        let expenseData = [];
      
        for (let i = 0; i < 12; i++) {
          labels.push(`${i+1}`);
          incomeData.push(income[i]);
          expenseData.push(expense[i]);
        }
      
        this.LineDate = {
          labels: labels,
          datasets: [
            { ...this.LineDate.datasets[0], data: incomeData  },
            {  ...this.LineDate.datasets[1], data: expenseData}
          ]
        };
      }      
}
