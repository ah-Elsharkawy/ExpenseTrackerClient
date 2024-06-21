import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../../../Core/Interface/category';
import { CategoryService } from '../../../../Core/Service/category.service';

@Component({
  selector: 'app-income-categories',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './income-categories.component.html',
  styleUrls: ['./income-categories.component.css'],
})
export class IncomeCategoriesComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number | null = null;

  @Output() categorySelected = new EventEmitter<{ id: number, name: string }>();

  selectCategory(category: { id: number; name: string }): void {
    this.categorySelected.emit(category);
  }
  
  constructor(private _CategoryService: CategoryService) {}

  ngOnInit(): void {
    this._CategoryService.getCategoriesByType(0).subscribe((res) => {
      this.categories = res.result;
      const initialCategoryId = this._CategoryService.getSelectedCategoryId();
      if (initialCategoryId !== null) {
        this.selectedCategoryId = initialCategoryId;
        const initialCategory = this.categories.find(category => category.id === initialCategoryId);
        if (initialCategory) {
          this.categorySelected.emit({ id: initialCategoryId, name: initialCategory.name });
        }
      }
    });
  }

  categoryClick(id: number): void {
    this.selectedCategoryId = id;
    const selectedCategory = this.categories.find(category => category.id === id);
    if (selectedCategory) {
      this._CategoryService.setCategoryId(id);
      this.categorySelected.emit({ id: id, name: selectedCategory.name });
    }
  }
}