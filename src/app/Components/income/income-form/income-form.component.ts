import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IncomeCategoryService } from '../../../../Core/Service/income-category.service';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { TransactionService } from '../../../../Core/Service/transaction.service';

@Component({
  selector: 'app-income-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StepperModule, ButtonModule],
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css'],
})
export class IncomeFormComponent implements OnInit {
  showContent: boolean = false;
  categoryID: number = -1;

  constructor(private _IncomeCategoryService: IncomeCategoryService, private _TransactionService: TransactionService) {}

  incomeForm: FormGroup = new FormGroup({
    category: new FormControl({ value: '', disabled: true }),
    amount: new FormControl(''),
    type: new FormControl(''),
    duration: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
  });

  handleSubmit(): void {
    const type = this.getEnumValue(this.incomeForm.value.type);
    const categoryId = this._IncomeCategoryService.getCategoryId();
    const formData: any = {
      ...this.incomeForm.value,
      type: type,
      categoryId: categoryId,
    };

    // Set date to today's date if type is 'fixed'
    if (type === 0) {
      formData.date = this.getCurrentDate();
    } else {
      formData.date = this.formatDateToSend(this.incomeForm.value.date);
    }

    console.log('Submitting transaction:', formData);

    this._TransactionService.createTransaction(formData).subscribe(
      (response) => {
        console.log('Transaction submitted successfully:', response);
        this.incomeForm.reset();
        this._TransactionService.addTransaction({
          ...formData,
          date: this.formatDateToShow(formData.date),
        });
      },
      (error) => {
        console.error('Error submitting transaction:', error);
      }
    );
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
    const month = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero
    const day = ('0' + today.getDate()).slice(-2); // Add leading zero
    return `${year}-${month}-${day}`;
  }

  formatDateToSend(date: string): string {
    if (date) {
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Add leading zero
      const day = ('0' + dateObj.getDate()).slice(-2); // Add leading zero
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

  ngOnInit(): void {
    this._IncomeCategoryService.categoryId.subscribe((id) => {
      if (id !== -1) {
        const categoryName = this._IncomeCategoryService.getCategoryNameById(id);
        this.incomeForm.patchValue({ category: categoryName });
      }
    });

    this.incomeForm.get('type')?.valueChanges.subscribe((value) => {
      this.showContent = value === 'recurrence';
    });
  }
}
