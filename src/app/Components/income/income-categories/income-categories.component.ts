import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IncomeCategoryService } from '../../../../Core/Service/income-category.service';
import { Category } from '../../../../Core/Interface/category';

@Component({
  selector: 'app-income-categories',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './income-categories.component.html',
  styleUrls: ['./income-categories.component.css'],
})
export class IncomeCategoriesComponent {
  constructor(public incomeCategoryService: IncomeCategoryService) {}

  categories: Category[] = this.incomeCategoryService.categories;

  categoryClick(id: number) {
    this.incomeCategoryService.setCategoryId(id);
    this.incomeCategoryService.toggleVisibility();
  }
}
