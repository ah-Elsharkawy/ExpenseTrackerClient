import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IncomeFormComponent } from '../income/income-form/income-form.component';
import { IncomeCategoriesComponent } from '../income/income-categories/income-categories.component';
import { IncomeCategoryService } from '../../../Core/Service/income-category.service';
import { StepperHeader, StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule , RouterLink , IncomeFormComponent,IncomeCategoriesComponent,StepperModule,ButtonModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  constructor(public incomeCategoryServive:IncomeCategoryService) {}

  handleBackId(){
    console.log("Back Button Clicked");
  }

}
