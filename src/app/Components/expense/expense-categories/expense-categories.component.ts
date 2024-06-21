import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../../../Core/Interface/category';
import { CategoryService } from '../../../../Core/Service/category.service';

@Component({
  selector: 'app-expense-categories',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './expense-categories.component.html',
  styleUrls: ['./expense-categories.component.css'],
})
export class ExpenseCategoriesComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number | null = null;

  @Output() categorySelected = new EventEmitter<{id: number, name: string}>();

  constructor(private _CategoryService: CategoryService) {}

  ngOnInit(): void {
    this._CategoryService.getCategoriesByType(1).subscribe((res) => {
      this.categories = res.result;
      console.log(this.categories);
    });

    this.selectedCategoryId = this._CategoryService.getSelectedCategoryId();
  }

  categoryClick(id: number) {
    this.selectedCategoryId = id;
    const selectedCategory = this.categories.find(category => category.id === id);
    if (selectedCategory) {
      this._CategoryService.setCategoryId(id);
      this.categorySelected.emit({ id: id, name: selectedCategory.name });
    }
  }
}