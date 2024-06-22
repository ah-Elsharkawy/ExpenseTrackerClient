import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TransactionService } from '../../../../Core/Service/transaction.service';
import Swal from 'sweetalert2';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../Core/Service/auth.service';
import { CategoryService } from '../../../../Core/Service/category.service';

@Component({
  selector: 'app-income-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    StepperModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './income-card.component.html',
  styleUrls: ['./income-card.component.css'],
})
export class IncomeCardComponent implements OnInit {
  transactions: any[] = [];
  categories: any[] = [];
  userId: number = 0;
  constructor(
    private _TransactionService: TransactionService,
    private _AuthService: AuthService,
    private _CategoryService: CategoryService
  ) {}

  selectedTransaction: any; // Declare a property to hold the selected transaction
  selectedType: string = '';

  updateForm = new FormGroup({
    category: new FormControl({ value: '', disabled: true }),
    amount: new FormControl(''),
    type: new FormControl(''),
    duration: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
  });

  openUpdateModal(transaction: any) {
    this.selectedTransaction = transaction;
    this.selectedType = transaction.typeName;
    this.updateForm.patchValue({
      category: transaction.categoryName,
      amount: transaction.amount,
      type: transaction.typeName,
      duration: transaction.duration,
      date: transaction.date,
      description: transaction.description,
    });
  }
  onTypeChange(event: any) {
    this.selectedType = event.target.value;
    if (this.selectedType === 'Fixed') {
      this.updateForm.get('duration')?.setValue('');
      this.updateForm.get('date')?.setValue('');
    }
  }
  ngOnInit(): void {
    this.userId = this._AuthService.userID;

    // Fetch categories first
    this._CategoryService.getCategoriesByType(0).subscribe({
      next: (categoryResponse) => {
        this.categories = categoryResponse.result;

        // Fetch transactions after fetching categories
        this._TransactionService.getTransactions(this.userId).subscribe({
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
        this._TransactionService.deleteTransaction(id).subscribe(
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
