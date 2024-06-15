import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpenseCategoryService } from '../../../../Core/Service/expense-category.service';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button'; // Import ButtonModule for the stepper buttons
import { TransactionService } from '../../../../Core/Service/transaction.service';
import { RecurrenceService } from '../../../../Core/Service/recurrence.service';
import { AuthService } from '../../../../Core/Service/auth.service';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StepperModule, ButtonModule],
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'], // Ensure styleUrls is plural
})
export class expenseFormComponent implements OnInit {
  showContent: boolean = false;
  categoryID: number = -1;
  userId: number = 0;

  constructor(
    private _expenseCategoryService: ExpenseCategoryService,
    private _TransactionService: TransactionService,
    private _RecurrenceService: RecurrenceService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this._AuthService.userID;
    this._expenseCategoryService.categoryId.subscribe((id) => {
      if (id !== -1) {
        const categoryName = this._expenseCategoryService.getCategoryNameById(id);
        this.expenseForm.patchValue({ category: categoryName });
      }
    });

    this.expenseForm.get('type')?.valueChanges.subscribe((value) => {
      this.showContent = value === 'recurrence';
    });
  }

  expenseForm: FormGroup = new FormGroup({
    category: new FormControl({ value: '', disabled: true }),
    amount: new FormControl(''),
    type: new FormControl(''),
    duration: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
  });

  handleSubmit(): void {
    const type = this.getEnumValue(this.expenseForm.value.type);
    const categoryId = this._expenseCategoryService.getCategoryId();

    if (categoryId === null) {
      console.error('No category selected');
      return;
    }

    const formData: any = {
      ...this.expenseForm.value,
      type: 1,
      categoryId: categoryId,
      category: this._expenseCategoryService.getCategoryNameById(categoryId),
    };
    if (type === 0) {
      formData.date = this.getCurrentDate();

      this._TransactionService.createTransaction(formData).subscribe(
        (response) => {
          console.log('Transaction submitted successfully:', response);
          this.expenseForm.reset();
          this._TransactionService.addTransaction({
            ...formData,
            date: this.formatDateToShow(formData.date),
          });
          this._TransactionService.updateTransactions(this.userId);
          this.expenseForm.reset();
        },
        (error) => {
          console.error('Error submitting transaction:', error);
        }
      );
    } else {
      formData.date = this.formatDateToSend(this.expenseForm.value.date);

      this._RecurrenceService.createRecurrence(formData).subscribe(
        (response) => {
          console.log('Recurrence submitted successfully:', response);
          this.expenseForm.reset();
          this._RecurrenceService.addRecurrence({
            ...formData,
            date: this.formatDateToShow(formData.date),
          });
          // this._TransactionService.updateTransactions(this.userId);
          // this.incomeForm.reset();
        },
        (error) => {
          console.error('Error submitting Recurrence:', error);
        }
      );
    }
  }


  getEnumValue(type: string): any {
    switch (type) {
      case 'fixed':
        return 0;
      case 'recurrence':
        return 1;
      default:
        return null;
    }
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2); 
    const day = ('0' + today.getDate()).slice(-2); 
    return `${year}-${month}-${day}`;
  }

  formatDateToSend(date: string): string {
    if (date) {
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = ('0' + (dateObj.getMonth() + 1)).slice(-2); 
      const day = ('0' + dateObj.getDate()).slice(-2); 
      return `${year}-${month}-${day}`;
    }
    return '';
  }

  formatDateToShow(date: string): string {
    if (date) {
      const dateObj = new Date(date);
      const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
      return formattedDate;
    }
    return '';
  }
}
