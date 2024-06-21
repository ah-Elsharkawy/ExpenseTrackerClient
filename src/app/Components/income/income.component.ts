import { Component, OnInit } from '@angular/core';
import { IncomeCardComponent } from './income-card/income-card.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { IncomeCategoriesComponent } from './income-categories/income-categories.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { IncomeCategoryService } from '../../../Core/Service/income-category.service';
import { TransactionService } from '../../../Core/Service/transaction.service';
import { AuthService } from '../../../Core/Service/auth.service';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [
    IncomeCardComponent,
    CommonModule,
    MatButton,
    IncomeCategoriesComponent,
    IncomeFormComponent,
    StepperModule,
    ButtonModule,
    MatStepperModule
  ],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css',
})
export class IncomeComponent implements OnInit {
  transactions: any[] = [];

  constructor(
    public _IncomeCategoryService: IncomeCategoryService,
    private _TransactionService: TransactionService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {  
    const userId = this._AuthService.userID;
    this._TransactionService.fetchTransactionsByUserId(userId).subscribe((response: any) => {
      this.transactions = response.result;
    });
  }
}
