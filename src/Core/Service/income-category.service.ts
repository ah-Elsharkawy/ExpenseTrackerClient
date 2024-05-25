import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../Interface/category';

@Injectable({
  providedIn: 'root'
})
export class IncomeCategoryService {

  constructor() { }

  isVisible: boolean = true;
  // categoryId: number = -1;

  
  categories: Category[] = [
    {icon:'attach_money', name:'Salary', id:1},
    {icon:'card_giftcard', name:'Gifts', id:2},
    {icon:'business', name:'Business', id:3},
    { icon: 'restaurant', name: 'Food & Drink' ,id:4},
    { icon: 'shopping_cart', name: 'Shopping' ,id:5},
    { icon: 'directions_bus', name: 'Transport' ,id:6 },
    { icon: 'receipt', name: 'Bills & Fees' ,id:7 },
    { icon: 'theaters', name: 'Entertainment',id:8 },
    { icon: 'directions_car', name: 'Car' ,id:9 },
    { icon: 'flight', name: 'Travel' ,id:10 },
    { icon: 'people', name: 'Family' ,id:11 },
    { icon: 'local_hospital', name: 'Healthcare' ,id:12 },
    { icon: 'school', name: 'Education' ,id:13 },
    { icon: 'local_grocery_store', name: 'Groceries' ,id:14 },
    { icon: 'sports_soccer', name: 'Sports' ,id:15 },
    { icon: 'local_florist', name: 'Gifts' ,id:16 },
    // Add more categories as needed
  ];

  private categoryIdSource = new BehaviorSubject<number | null>(null);
  currentCategoryId = this.categoryIdSource.asObservable();

  setCategoryId(id: number) {
    this.categoryIdSource.next(id);
  }

  getCategoryNameById(id: number): string {
    const category = this.categories.find(cat => cat.id === id);
    return category ? category.name : '';
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
}
