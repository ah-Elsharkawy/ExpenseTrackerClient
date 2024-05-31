import { Injectable } from '@angular/core';
import { Category } from '../Interface/category';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService {

  constructor() {}

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
  ];

  expenseCategories: Category[] = [ 
    {icon:'money_off', name:'Bills', id:1},
    {icon:'card_giftcard', name:'Gifts', id:2},
    {icon:'account_balance', name:'Business', id:3},
    {icon: 'fastfood', name:'Food & Drink', id:4},
    {icon: 'shopping_basket', name:'Shopping', id:5},
    {icon: 'commute', name:'Transport', id:6},
    {icon: 'receipt_long', name:'Bills & Fees', id:7},
    {icon: 'local_movies', name:'Entertainment', id:8},
    {icon: 'directions_car', name:'Car', id:9},
    {icon: 'flight_takeoff', name:'Travel', id:10},
    {icon: 'group', name:'Family', id:11},
    {icon: 'local_pharmacy', name:'Healthcare', id:12},
];

  categoryId : BehaviorSubject<number> = new BehaviorSubject(-1);
  
  getCategoryNameById(id: number): string {
    return this.categories.find((category) => category.id === id)?.name || '';
  }

  getCategoryId(): number | null {
    return this.categoryId.getValue();
  }
}
