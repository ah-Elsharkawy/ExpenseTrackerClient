import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpenseCategoryService } from '../../../../Core/Service/expense-category.service';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button'; // Import ButtonModule for the stepper buttons

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

  constructor(private _expenseCategoryService: ExpenseCategoryService) {}

  expenseForm: FormGroup = new FormGroup({
    category: new FormControl(''),
    amount: new FormControl(''),
    type: new FormControl(''),
    duration: new FormControl(''),
    date: new FormControl(''),
  });

  handleSubmit(): void {
    console.log(this.expenseForm.value);
    this.expenseForm.reset();
  }

  ngOnInit(): void {
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
}
