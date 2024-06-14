import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../Interface/category';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncomeCategoryService {
  private categories: Category[] = [];
  categoryId: BehaviorSubject<number> = new BehaviorSubject(-1);

  constructor(private _HttpClient: HttpClient) {}

  getCategories(): Observable<any> {
    return this._HttpClient.get("https://localhost:44311/api/services/app/Category/GetCategories").pipe(
      map((response: any) => {
        this.categories = response.result;
        return response;
      })
    );
  }

  getCategoryId(): number | null {
    return this.categoryId.getValue();
  }

  isCategoryChoosen(): boolean {
    return this.getCategoryId() == -1;
  }

  getCategoryNameById(id: number): string | null{
    const category = this.categories.find(category => category.id === id);
    return category ? category.name : null;
  }
}
