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
  styleUrls: ['./income-card.component.css'],
})
export class IncomeCardComponent implements OnInit {
  transactions: any[] = [];
  categories: any[] = [];

  constructor(
    private _TransactionService: TransactionService,
    private _IncomeCategoryService: IncomeCategoryService
  ) {}

  ngOnInit(): void {
    this._IncomeCategoryService.getCategories().subscribe((response) => {
      this.categories = response.result;
      this._TransactionService.transactions$.subscribe((transactions) => {
        this.transactions = transactions.map((transaction) => {
          const typeName = this.getTypeName(transaction.type);
          const categoryName = this.getCategoryNameById(transaction.categoryId);
          return { ...transaction, typeName, categoryName };
        });
      });
      this._TransactionService.updateTransactions();
    });
  }

  getTypeName(type: number): string {
    return type === 0 ? 'Fixed' : 'Recurrence';
  }

  getCategoryNameById(id: number): string {
    const category = this.categories.find((category) => category.id === id);
    return category ? category.name : 'Unknown';
  }
}
