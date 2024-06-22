import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { TransactionService } from '../../../../Core/Service/transaction.service';
import { AuthService } from '../../../../Core/Service/auth.service';
import { CategoryService } from '../../../../Core/Service/category.service';

@Component({
  selector: 'app-income-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StepperModule, ButtonModule],
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css'],
})
export class IncomeFormComponent implements OnInit {
  showContent: boolean = false;
  userId: any = 0;

  @Input() selectedCategory: { id: number; name: string } | null = null;

  incomeForm: FormGroup = new FormGroup({
    category: new FormControl({ value: '', disabled: true }),
    amount: new FormControl(''),
    type: new FormControl(0),
    duration: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private _TransactionService: TransactionService,
    private _AuthService: AuthService,
    private _CategoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.userId = this._AuthService.getUserId();
    if (this.selectedCategory) {
      this.incomeForm.patchValue({ category: this.selectedCategory.name });
    }
  }

  ngOnChanges(): void {
    if (this.selectedCategory) {
      this.incomeForm.patchValue({ category: this.selectedCategory.name });
    }
  }

  handleSubmit(): void {
    const formValue = this.incomeForm.value;
    formValue.type = this.getEnumValue(formValue.type);
    formValue.date = new Date().toISOString();
    formValue.categoryId = this.selectedCategory?.id; 
    this._TransactionService.addTransaction(formValue).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
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

}
