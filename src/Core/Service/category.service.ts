import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClirent : HttpClient, private _AuthService : AuthService ) { }
  getCategoriesByType(type : number):Observable<any>{
    let params = new HttpParams().set('type', type);
    return this._HttpClirent.get(`${environment.apiUrl}/services/app/Category/GetCategoriesByType`, {params});
  }
  getCategoryNameById(id : number){
    let params = new HttpParams().set('id', id);
    return this._HttpClirent.get(`${environment.apiUrl}/services/app/Category/GetCategoryNameById?id=${id}`);
    
  }
}

