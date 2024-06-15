import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
export class expenseCategoriesComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number | null = null;

  @Output() categorySelected = new EventEmitter<{id: number, name: string}>();

  constructor(private expenseCategoryService: ExpenseCategoryService) {}

  ngOnInit(): void {
    this.expenseCategoryService.getCategories().subscribe((res) => {
      this.categories = res.result;
      console.log(this.categories);
    });

    this.selectedCategoryId = this.expenseCategoryService.getCategoryId();
  }

  categoryClick(id: number) {
    this.selectedCategoryId = id;
    const selectedCategory = this.categories.find(category => category.id === id);
    if (selectedCategory) {
      this.expenseCategoryService.categoryId.next(id);
      this.categorySelected.emit({ id: id, name: selectedCategory.name });
    }
  }



  // constructor(public expenseCategoryService: ExpenseCategoryService) {
  //   this.selectedCategoryId = this.expenseCategoryService.getCategoryId();
  // }

  // categories: Category[] = this.expenseCategoryService.getCategories();
  // selectedCategoryId: number | null = null;

  // categoryClick(id: number) {
  //   this.selectedCategoryId = id;
  //   this.expenseCategoryService.categoryId.next(id);

  // }

}
