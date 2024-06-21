import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { AuthService } from '../../../Core/Service/auth.service';
import { TransactionService } from '../../../Core/Service/transaction.service';
import { CategoryService } from '../../../Core/Service/category.service';
import { Category } from '../../../Core/Interface/category';
import Swal from 'sweetalert2';
import { ExpenseService } from '../../../Core/Service/expense.service';

@Component({
  selector: 'app-combined-expense',
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
  templateUrl: './combined-expense.component.html',
  styleUrl: './combined-expense.component.css',
})
export class CombinedExpenseComponent {
  transactions: any[] = [];
  userId: any = 0;
  categories: Category[] = [];
  selectedCategory: Category | undefined = undefined;
  showContent: boolean = false;
  selectedCategoryId: number | null = null;
  selectedCategoryName: string = '';
  selectedTransaction: any;
  selectedType: string = '';

  constructor(
    private _AuthService: AuthService,
    private _ExpenseService: ExpenseService,
    private _CategoryService: CategoryService
  ) {}

  expenseForm: FormGroup = new FormGroup({
    category: new FormControl({ value: '', disabled: true }),
    amount: new FormControl(''),
    type: new FormControl(1),
    duration: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
  });

  updateForm: FormGroup = new FormGroup({
    category: new FormControl({ value: '', disabled: true }),
    amount: new FormControl(''),
    type: new FormControl(1),
    duration: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
  });


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
        this._ExpenseService.deleteExpenses(id).subscribe(
          () => {
            this.loadExpense();
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

  openUpdateModal(transaction: any): void {
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
      category: transaction.categoryName,
      amount: transaction.amount,
      type: 1,
      duration: transaction.duration,
      date: transaction.date,
      description: transaction.description,
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadExpense();
    this.expenseForm.get('type')?.valueChanges.subscribe((value) => {
      this.showContent = value === 'recurrence';
    });
  }

  loadCategories() {
    this._CategoryService.getCategoriesByType(1).subscribe((res) => {
      this.categories = res.result;
    });
  }

  loadExpense() {
    this.userId = this._AuthService.getUserId();
    this._ExpenseService.getExpenses(this.userId).subscribe((data) => {
      this.transactions = data.result.map((transaction : any) => {
        const category = this.categories.find(cat => cat.id === transaction.categoryId);
        return {
          ...transaction,
          categoryName: category ? category.name : 'Unknown Category'
        };
      });
    });
  }

  handleUpdate(): void {
    this.selectedTransaction.categoryId = this.selectedCategoryId;
    this.selectedTransaction.categoryName = this.selectedCategoryName;
    this.selectedTransaction.amount = this.updateForm.get('amount')?.value;
    this.selectedTransaction.description = this.updateForm.get('description')?.value;
    this.selectedTransaction.date = this.updateForm.get('date')?.value;

    this._ExpenseService.updateExpense(this.selectedTransaction).subscribe(() => {
      Swal.fire({
        title: "Good job!",
        text: "You have been updated expense successfully!",
        icon: "success"
      });
      this.loadExpense();
      this.updateForm.reset();
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
    const formValue = this.expenseForm.value;
    formValue.type = 1;
    formValue.date = new Date().toISOString();
    formValue.categoryId = this.selectedCategoryId;
    formValue.categoryName = this.selectedCategoryName;

    this._ExpenseService.addExpense(formValue).subscribe({
      next: (res) => {
        console.log('Transaction added', res);
        this.loadExpense();
        this.expenseForm.reset();
        this.selectedCategoryName = '';
        this.selectedCategoryId = null;
        this.showContent = false;
      },
      error: (err) => {
        console.error('Error adding transaction', err);
      },
    });
  }
//   getEnumValue(type: string): any {
//     switch (type) {
//       case 'fixed':
//         return 0;
//       case 'recurrence':
//         return 1;
//       default:
//         return -1;
//     }
// }
}
