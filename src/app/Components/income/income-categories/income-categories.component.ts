import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IncomeCategoryService } from '../../../../Core/Service/income-category.service';

interface Category {
  icon: string;
  name: string;
  id: number;
}

@Component({
  selector: 'app-income-categories',
  standalone: true,
  imports: [MatIcon,CommonModule],
  templateUrl: './income-categories.component.html',
  styleUrl: './income-categories.component.css',
})
export class IncomeCategoriesComponent {
  constructor(public incomeCategoryServive:IncomeCategoryService) {}
  categories: Category[] = [
    {icon:'attach_money', name:'Salary', id:1},
    {icon:'card_giftcard', name:'Gifts', id:2},
    {icon:'business', name:'Business', id:3},
    // { icon: 'restaurant', name: 'Food & Drink' },
    // { icon: 'shopping_cart', name: 'Shopping' },
    // { icon: 'directions_bus', name: 'Transport' },
    // { icon: 'home', name: 'Home' },
    // { icon: 'receipt', name: 'Bills & Fees' },
    // { icon: 'theaters', name: 'Entertainment' },
    // { icon: 'directions_car', name: 'Car' },
    // { icon: 'flight', name: 'Travel' },
    // { icon: 'people', name: 'Family' },
    // { icon: 'local_hospital', name: 'Healthcare' },
    // { icon: 'school', name: 'Education' },
    // { icon: 'local_grocery_store', name: 'Groceries' },
    // { icon: 'sports_soccer', name: 'Sports' },
    // { icon: 'local_florist', name: 'Gifts' },
    // Add more categories as needed
  ];
  categoryClick(id:number) {
    this.incomeCategoryServive.toggleVisibility();
    this.incomeCategoryServive.categoryId = id;
    console.log(this.incomeCategoryServive.categoryId);
    
  }
}
