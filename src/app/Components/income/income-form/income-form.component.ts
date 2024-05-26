import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IncomeCategoryService } from '../../../../Core/Service/income-category.service';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button'; // Import ButtonModule for the stepper buttons

@Component({
  selector: 'app-income-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StepperModule, ButtonModule],
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css'], // Ensure styleUrls is plural
})
export class IncomeFormComponent implements OnInit {
  showContent: boolean = false;
  categoryID: number = -1;

  constructor(private _IncomeCategoryService: IncomeCategoryService) {}

  incomeForm: FormGroup = new FormGroup({
    category: new FormControl(''),
    amount: new FormControl(''),
    type: new FormControl(''),
    duration: new FormControl(''),
    date: new FormControl(''),
  });

  handleSubmit(): void {
    console.log(this.incomeForm.value);
    this.incomeForm.reset();
  }

  ngOnInit(): void {
    this._IncomeCategoryService.currentCategoryId.subscribe((id) => {
      if (id !== null) {
        const categoryName =
          this._IncomeCategoryService.getCategoryNameById(id);
        this.incomeForm.patchValue({ category: categoryName });
      }
    });

    this.incomeForm.get('type')?.valueChanges.subscribe((value) => {
      this.showContent = value === 'recurrence';
    });
  }
}
