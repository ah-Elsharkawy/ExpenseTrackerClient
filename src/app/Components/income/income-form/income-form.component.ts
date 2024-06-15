import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IncomeCategoryService } from '../../../../Core/Service/income-category.service';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { TransactionService } from '../../../../Core/Service/transaction.service';
import { AuthService } from '../../../../Core/Service/auth.service';
import { MatStepper } from '@angular/material/stepper';
import { RecurrenceService } from '../../../../Core/Service/recurrence.service';

@Component({
  selector: 'app-income-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StepperModule, ButtonModule],
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css'],
})
export class IncomeFormComponent implements OnInit {
  showContent: boolean = false;
  userId: number = 0;
  incomeForm: FormGroup = new FormGroup({
    category: new FormControl({ value: '', disabled: true }),
    amount: new FormControl(''),
    type: new FormControl(''),
    duration: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private _IncomeCategoryService: IncomeCategoryService,
    private _TransactionService: TransactionService,
    private _RecurrenceService: RecurrenceService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this._AuthService.userID;
    this._IncomeCategoryService.categoryId.subscribe((id) => {
      if (id !== -1) {
        const categoryName = this._IncomeCategoryService.getCategoryNameById(id);
        this.incomeForm.patchValue({ category: categoryName });
      }
    });

    this._IncomeCategoryService.getCategories().subscribe();

    this.incomeForm.get('type')?.valueChanges.subscribe((value) => {
      this.showContent = value === 'recurrence';
    });
  }

  handleSubmit(): void {
    const type = this.getEnumValue(this.incomeForm.value.type);
    const categoryId = this._IncomeCategoryService.getCategoryId();

    if (categoryId === null) {
      console.error('No category selected');
      return;
    }

    const formData: any = {
      ...this.incomeForm.value,
      type: type,
      categoryId: categoryId,
      category: this._IncomeCategoryService.getCategoryNameById(categoryId),
    };
    if (type === 0) {
      formData.date = this.getCurrentDate();

      this._TransactionService.createTransaction(formData).subscribe(
        (response) => {
          console.log('Transaction submitted successfully:', response);
          this.incomeForm.reset();
          this._TransactionService.addTransaction({
            ...formData,
            date: this.formatDateToShow(formData.date),
          });
          this._TransactionService.updateTransactions(this.userId);
          this.incomeForm.reset();
        },
        (error) => {
          console.error('Error submitting transaction:', error);
        }
      );
    } else {
      formData.date = this.formatDateToSend(this.incomeForm.value.date);

      this._RcurrenceService.createRecurrence(formData).subscribe(

      this._RecurrenceService.createRecurrence(formData).subscribe(
        (response) => {
          console.log('Recurrence submitted successfully:', response);
          this.incomeForm.reset();
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

    console.log('Submitting transaction:', formData);

    // this._TransactionService.createTransaction(formData).subscribe(
    //   (response) => {
    //     console.log('Transaction submitted successfully:', response);
    //     this.incomeForm.reset();
    //     this._TransactionService.addTransaction({
    //       ...formData,
    //       date: this.formatDateToShow(formData.date),
    //     });
    //     this._TransactionService.updateTransactions(this.userId);
    //     this.incomeForm.reset();
    //   },
    //   (error) => {
    //     console.error('Error submitting transaction:', error);
    //   }
    // );
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
