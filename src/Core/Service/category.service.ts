import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl;
  categoryId: BehaviorSubject<number> = new BehaviorSubject(-1);
  constructor(private _HttpClirent : HttpClient) { }


  getCategoriesByType(type : number):Observable<any>{
    return this._HttpClirent.get(`${this.apiUrl}/services/app/Category/GetCategoriesByType?type=${type}`);
  }

  getCategoryNameById(id : number):Observable<any>{
    return this._HttpClirent.get(`${this.apiUrl}/services/app/Category/GetCategoryNameById?id=${id}`);    
  }

  getCategoryById(id : number):Observable<any>{
    return this._HttpClirent.get(`${this.apiUrl}/services/app/Category/GetCategoryById?id=${id}`);
  }
  setCategoryId(id: number): void {
    this.categoryId.next(id);
  }

  getSelectedCategoryId(): number | null {
    return this.categoryId.value;
  }


}

