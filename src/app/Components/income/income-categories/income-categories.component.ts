import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class IncomeCategoriesComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number | null = null;

  constructor(public incomeCategoryService: IncomeCategoryService) {}

  ngOnInit(): void {
    this.incomeCategoryService.getCategories().subscribe((res) => {
      console.log(res.result);
      this.categories = res.result;
    });

    this.selectedCategoryId = this.incomeCategoryService.getCategoryId();
  }

  categoryClick(id: number) {
    this.selectedCategoryId = id;
    this.incomeCategoryService.categoryId.next(id);
  }

}
