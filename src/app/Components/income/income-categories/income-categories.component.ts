import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() categorySelected = new EventEmitter<{id: number, name: string}>();

  constructor(private incomeCategoryService: IncomeCategoryService) {}

  ngOnInit(): void {
    this.incomeCategoryService.getCategories().subscribe((res) => {
      this.categories = res.result;
      console.log(this.categories);
    });

    this.selectedCategoryId = this.incomeCategoryService.getCategoryId();
  }

  categoryClick(id: number) {
    this.selectedCategoryId = id;
    const selectedCategory = this.categories.find(category => category.id === id);
    if (selectedCategory) {
      this.incomeCategoryService.categoryId.next(id);
      this.categorySelected.emit({ id: id, name: selectedCategory.name });
    }
  }
}
