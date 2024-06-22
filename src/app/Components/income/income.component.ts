import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { IncomeCardComponent } from './income-card/income-card.component';
import { IncomeCategoriesComponent } from './income-categories/income-categories.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { TransactionService } from '../../../Core/Service/transaction.service';
import { AuthService } from '../../../Core/Service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    IncomeCardComponent,
    IncomeCategoriesComponent,
    IncomeFormComponent
  ],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  transactions: any[] = [];
  userId: any = 0;
  selectedCategory: { id: number, name: string } | null = null;

  constructor(
    private _TransactionService: TransactionService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this._AuthService.getUserId();
    this._TransactionService.getTransactions(this.userId).subscribe((response) => {
      this.transactions = response.result;
    });
  }



  handleCategorySelected(category: { id: number, name: string }): void {
    this.selectedCategory = category;
  }
}
