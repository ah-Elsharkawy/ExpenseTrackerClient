import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ExpenseCategoryService } from '../../../../Core/Service/expense-category.service';
import { Category } from '../../../../Core/Interface/category';

@Component({
  selector: 'app-expense-categories',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './expense-categories.component.html',
  styleUrls: ['./expense-categories.component.css'],
})
export class expenseCategoriesComponent {
  constructor(public expenseCategoryService: ExpenseCategoryService) {
    this.selectedCategoryId = this.expenseCategoryService.getCategoryId();
  }

  categories: Category[] = this.expenseCategoryService.expenseCategories;
  selectedCategoryId: number | null = null;

  categoryClick(id: number) {
    this.selectedCategoryId = id;
    this.expenseCategoryService.categoryId.next(id);

  }

}
