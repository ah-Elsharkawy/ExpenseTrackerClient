import { Component, OnInit } from '@angular/core';
import { IncomeCardComponent } from './income-card/income-card.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { IncomeCategoriesComponent } from './income-categories/income-categories.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { IncomeCategoryService } from '../../../Core/Service/income-category.service';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [IncomeCardComponent,CommonModule,
    MatButton,IncomeCategoriesComponent,
    IncomeFormComponent,StepperModule,ButtonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit{

  constructor(public _IncomeCategoryService: IncomeCategoryService) {}

  budgets = [
    { name: 'Technology Infrastructure', allocated: 78000, spent: 132000},
    { name: 'Online Subscription', allocated: 60000, spent: 65000  },
    { name: 'Online Subscription', allocated: 60000, spent: 45000,  },
    { name: 'Online Subscription', allocated: 60000, spent: 55000,  },
    { name: 'Online Subscription', allocated: 60000, spent: 35000,  },
    { name: 'Online Subscription', allocated: 60000, spent: 25000,  },
    // Add other budget items here...
  ];
  addNewCard() {
    // Logic to add a new budget card
    const newBudget = { /* new budget object */ };
    this.budgets.push();
  }

  updateCard() {
    // Logic to update the budget card
    console.log('Update card');
  }

  deleteCard() {
    // Logic to delete the budget card
    console.log('Delete card');
  }

  ngOnInit(): void {
  }

}
