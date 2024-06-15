import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClirent : HttpClient) { }

  getCategoryById(id : number){
    let params = new HttpParams().set('id', id);
    return this._HttpClirent.get(`${environment}/Category/GetCategoryById`, {params});
  }
}

