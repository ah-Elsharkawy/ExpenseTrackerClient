import { Component, OnInit, ViewChild } from '@angular/core';
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

  ngOnInit(): void {
    
  }

  
}
