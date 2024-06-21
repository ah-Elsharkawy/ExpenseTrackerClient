import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Category } from '../Interface/category';

@Injectable({
  providedIn: 'root',
})
export class ExpenseCategoryService {
  private categories: Category[] = [];
  private apiUrl = environment.apiUrl;

  categoryId: BehaviorSubject<number> = new BehaviorSubject(-1);

  constructor(private _HttpClient: HttpClient) {}

  getCategories(): Observable<any> {
    return this._HttpClient
      .get(`${this.apiUrl}/services/app/Category/GetCategoriesByType?type=1`)
      .pipe(
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

  getCategoryNameById(id: number): string | null {
    const category = this.categories.find((category) => category.id === id);
    return category ? category.name : null;
  }
}
