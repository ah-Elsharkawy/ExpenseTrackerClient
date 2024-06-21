import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import Swal from 'sweetalert2';
import { ExpenseService } from '../../../../Core/Service/expense.service';
import { AuthService } from '../../../../Core/Service/auth.service';
import { ExpenseCategoryService } from '../../../../Core/Service/expense-category.service';
@Component({
  selector: 'app-expense-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    CommonModule,
    MatIcon,
  ],
  templateUrl: './expense-card.component.html',
  styleUrl: './expense-card.component.css',
})
export class ExpenseCardComponent {
  transactions: any[] = [];
  categories: any[] = [];
  userId: number = -1;

  constructor(
    private expenseService: ExpenseService,
    private authService: AuthService,
    private expenseCategoryService: ExpenseCategoryService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.userID;

    // Fetch categories first
    this.expenseCategoryService.getCategories().subscribe({
      next: (categoryResponse) => {
        this.categories = categoryResponse.result;

        // Fetch transactions after fetching categories
        this.expenseService.getExpenses(this.userId).subscribe({
          next: (transactionResponse) => {
            this.transactions = transactionResponse.result.map(
              (transaction: any) => {
                const categoryName = this.getCategoryNameById(
                  transaction.categoryId
                );
                return { ...transaction, categoryName };
              }
            );
          },
          error: (err) => {
            console.error('Failed to fetch transactions', err);
          },
        });
      },
      error: (err) => {
        console.error('Failed to fetch categories', err);
      },
    });
    this.expenseService.updateExpense(this.userId);
  }

  getTypeName(type: number): string {
    return type === 0 ? 'Fixed' : 'Recurrence';
  }

  getCategoryNameById(id: number): string {
    const category = this.categories.find((category) => category.id === id);
    return category ? category.name : 'Unknown';
  }

  deleteTransaction(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this transaction!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.expenseService.deleteExpense(id).subscribe(
          () => {
            this.transactions = this.transactions.filter(transaction => transaction.id !== id);
            Swal.fire(
              'Deleted!',
              'Your transaction has been deleted.',
              'success'
            );
          },
          (error) => {
            console.error('Error deleting transaction:', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the transaction.',
              'error'
            );
          }
        );
      }
    });
  }


}
