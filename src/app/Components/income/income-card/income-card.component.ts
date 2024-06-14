import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TransactionService } from '../../../../Core/Service/transaction.service';
import { IncomeCategoryService } from '../../../../Core/Service/income-category.service';

@Component({
  selector: 'app-income-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './income-card.component.html',
  styleUrls: ['./income-card.component.css']
})
export class IncomeCardComponent implements OnInit {
  transactions: any[] = [];

  constructor(
    private _TransactionService: TransactionService,
    private _IncomeCategoryService: IncomeCategoryService
  ) {}

  ngOnInit(): void {
    this._TransactionService.transactions$.subscribe(transactions => {
      this.transactions = transactions.map(transaction => {
        const categoryName = this._IncomeCategoryService.getCategoryNameById(transaction.categoryId);
        const typeName = this.getTypeName(transaction.type);
        return { ...transaction, categoryName, typeName };
      });
    });

    // Fetch transactions when the component initializes
    this._TransactionService.updateTransactions();
  }

  getTypeName(type: number): string {
    return type === 0 ? 'Fixed' : 'Recurrence';
  }
}
