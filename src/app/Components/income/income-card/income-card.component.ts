import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TransactionService } from '../../../../Core/Service/transaction.service';
import { IncomeCategoryService } from '../../../../Core/Service/income-category.service';
import Swal from 'sweetalert2';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule
  ],
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

  selectedTransaction: any; // Declare a property to hold the selected transaction
  selectedType: string = "";


  updateForm = new FormGroup({
    category: new FormControl({value: '', disabled: true}),
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
      description: transaction.description
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

  handleSubmit() {
    const transactionType = this.updateForm.get('type')?.value === 'Fixed' ? 0 : 1; 
    this.updateForm.get('type')?.setValue(transactionType.toString());
    this._TransactionService.updateTransaction(this.updateForm.value).subscribe(
      (response) => {
        this._TransactionService.updateTransactions();
        Swal.fire('Success!', 'Transaction updated successfully.', 'success');
      },
      (error) => {
        console.error('Error updating transaction:', error);
        Swal.fire('Error!', 'There was an error updating the transaction.', 'error');
      }
    );
    
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
            this._TransactionService.removeTransaction(id);
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
