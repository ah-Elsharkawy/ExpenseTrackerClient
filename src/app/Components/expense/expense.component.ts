import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExpenseCardComponent } from './expense-card/expense-card.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { expenseCategoriesComponent } from './expense-categories/expense-categories.component';
import { expenseFormComponent } from './expense-form/expense-form.component';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { ExpenseService } from '../../../Core/Service/expense.service';
import { AuthService } from '../../../Core/Service/auth.service';
import { ExpenseCategoryService } from '../../../Core/Service/expense-category.service';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    ExpenseCardComponent,
    CommonModule,
    MatButton,
    expenseCategoriesComponent,
    expenseFormComponent,
    StepperModule,
    ButtonModule,
    MatStepper,
    MatStepperModule
  ],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css',
})
export class expenseComponent  {
  transactions: any[] = [];

  constructor(
    public _ExpenseCategoryService: ExpenseCategoryService,
    private _ExpenseService: ExpenseService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this._AuthService.userID;
    this._ExpenseService.getExpenses(userId).subscribe((response: any) => {
      this.transactions = response.result;
    });
  }
}
