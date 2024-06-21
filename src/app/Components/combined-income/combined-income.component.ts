import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { AuthService } from '../../../Core/Service/auth.service';
import { TransactionService } from '../../../Core/Service/transaction.service';
import { MatStepperModule } from '@angular/material/stepper';
import { CategoryService } from '../../../Core/Service/category.service';
import { Category } from '../../../Core/Interface/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-combined-income',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    StepperModule,
    ButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
  ],
  templateUrl: './combined-income.component.html',
  styleUrls: ['./combined-income.component.css'],
})
export class CombinedIncomeComponent implements OnInit {
  transactions: any[] = [];
  userId: any = 0;
  categories: Category[] = [];
  selectedCategory: Category | undefined = undefined;
  showContent: boolean = false;
  selectedCategoryId: number | null = null;
  selectedCategoryName: string = '';
  selectedCategoryIcon: string = '';

  constructor(
    private _AuthService: AuthService,
    private _TransactionService: TransactionService,
    private _CategoryService: CategoryService
  ) {}

  incomeForm: FormGroup = new FormGroup({
    category: new FormControl({ value: '', disabled: true }),
    amount: new FormControl(''),
    type: new FormControl(0),
    duration: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
  });

  updateForm = new FormGroup({
    category: new FormControl({ value: '', disabled: true }),
    amount: new FormControl(''),
    type: new FormControl(''),
    duration: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
  });

  selectedTransaction: any;
  selectedType: string = '';

  openUpdateModal(transaction: any) {
    this.selectedTransaction = transaction;
    this.selectedType = transaction.typeName;
    const category = this.categories.find(cat => cat.id === transaction.categoryId);
    this.selectedCategory = category;
    this.selectedCategoryId = category?.id || null;
    this.selectedCategoryName = category?.name || '';
    
    console.log('Selected Transaction:', transaction);
    console.log('Selected Type:', this.selectedType);
    console.log('Selected Category:', this.selectedCategory);

    this.updateForm.patchValue({
      category: this.selectedCategoryName,
      amount: transaction.amount,
      type: transaction.typeName,
      duration: transaction.duration,
      date: transaction.date,
      description: transaction.description,
    });
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
            this.loadTransactions();
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

  ngOnInit(): void {
    this.loadCategories();
    this.loadTransactions();
    this.incomeForm.get('type')?.valueChanges.subscribe((value) => {
      this.showContent = value === 'recurrence';
    });
  }

  loadCategories() {
    this._CategoryService.getCategoriesByType(0).subscribe((res) => {
      this.categories = res.result;
    });
  }

  loadTransactions() {
    this.userId = this._AuthService.getUserId();
    this._TransactionService.getTransactions(this.userId).subscribe((data) => {
      this.transactions = data.result.map((transaction: any) => {
        const category = this.categories.find(cat => cat.id === transaction.categoryId);
        return {
          ...transaction,
          categoryName: category ? category.name : 'Unknown Category',
        };
      });
    });
  }

  categoryClick(id: number): void {
    this.selectedCategoryId = id;
    const selectedCategory = this.categories.find(
      (category) => category.id === id
    );
    this.selectedCategoryName = selectedCategory?.name || '';

    if (selectedCategory) {
      this._CategoryService.setCategoryId(id);
    }
  }

  handleSubmit() {
    const formValue = this.incomeForm.value;
    formValue.type = this.getEnumValue(formValue.type);
    formValue.date = new Date().toISOString();
    formValue.categoryId = this.selectedCategoryId;

    this._TransactionService.addTransaction(formValue).subscribe({
      next: (res) => {
        console.log('Transaction added', res);
        this.loadTransactions();
        this.incomeForm.reset();
        this.selectedCategoryName = '';
        this.selectedCategoryId = null;
        this.showContent = false;
      },
      error: (err) => {
        console.error('Error adding transaction', err);
      },
    });
  }

  getEnumValue(type: string): any {
    switch (type) {
      case 'fixed':
        return 0;
      case 'recurrence':
        return 1;
      default:
        return -1;
    }
  }

  updateTransaction() {
    this.selectedTransaction.categoryId = this.selectedCategoryId;
    this.selectedTransaction.categoryName = this.selectedCategoryName;
    this.selectedTransaction.amount = this.updateForm.get('amount')?.value;
    this.selectedTransaction.description = this.updateForm.get('description')?.value;
    this.selectedTransaction.date = this.updateForm.get('date')?.value;
    
    this._TransactionService.updateTransaction(this.selectedTransaction).subscribe({
      next: (res) => {
        console.log('Transaction updated', res);
        Swal.fire({
          title: "Good job!",
          text: "You have been updated income successfully!",
          icon: "success"
        });
        this.loadTransactions();
        this.updateForm.reset();
        this.selectedCategoryName = '';
        this.selectedCategoryId = null;
      },
      error: (err) => {
        console.error('Error updating transaction', err);
      },
    });    
  }

  getTypeName(type: number): string {
    return type === 0 ? 'Fixed' : 'Recurrence';
  }
}
