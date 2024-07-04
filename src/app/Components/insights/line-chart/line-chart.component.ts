import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartModule } from 'primeng/chart';
import { GetTotalService } from '../../../../Core/Service/get-total.service';
import { AuthService } from '../../../../Core/Service/auth.service';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [ChartModule, MatCardModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {
  constructor(private getTotal : GetTotalService ,  private auth : AuthService) { }
  userId : any = 0;
  balance : number = 0;
  totalIncome : number = 0;
  totalExpense : number = 0;
  ngOnInit(): void {
    this.userId = this.auth.getUserId();
    console.log(this.userId);
    this.getTotal.getTotalBalance(this.userId).subscribe((data) => {
      console.log(data);
      this.balance = data.result.balance;
    })
    this.getTotal.getTotalIncome(this.userId).subscribe((data) => {
      console.log(data);
      this.totalIncome = data.result.totalIncome;
    })

    this.getTotal.getTotalExpense(this.userId).subscribe((data) => {
      console.log(data);
      this.totalExpense = data.result.totalExpense;
    })

  }
}
