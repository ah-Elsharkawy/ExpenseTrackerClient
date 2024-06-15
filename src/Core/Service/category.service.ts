import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: any;
  constructor(private _HttpClirent : HttpClient, private _AuthService : AuthService ) { }
  // getCategoriesByType(type : number){
  //   let params = new HttpParams().set('type', type);
  //   this._HttpClirent.get(`${environment.apiUrl}/services/app/Category/GetCategoriesByType`, {params}).pipe(
  //     map((response: any) => {
  //       this.categories = response.result;
  //       return response;
  //     })
  //   );
  // }
  getCategories(): Observable<any> {
    return this._HttpClirent.get(`${environment.apiUrl}/services/app/Category/GetCategoriesByType?type=1`).pipe(
      map((response: any) => {
        this.categories = response.result;
        return response;
      })
    );
  }
  getCategoryNameById(id : number){
    let params = new HttpParams().set('id', id);
    return this._HttpClirent.get(`${environment.apiUrl}/services/app/Category/GetCategoryNameById?id=${id}`);
    
  }
}

