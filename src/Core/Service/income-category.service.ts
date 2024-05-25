import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IncomeCategoryService {

  constructor() { }

  isVisible: boolean = true;
  categoryId: number = -1;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
}
