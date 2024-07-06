import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserCategory } from "../Interface/UserCategory";

@Injectable({
    providedIn: 'root'
  })
export class UserCategoryService{
    private apiUrl = environment.apiUrl;
 
    constructor(private _HttpClient: HttpClient) { }
    getUserCategories():Observable<any> {
        return this._HttpClient.get(`${this.apiUrl}/services/app/Budget/getAllAvailableCategories`);
    }
    createBudgetLimit(data: UserCategory | undefined):Observable<any> {
        return this._HttpClient.post(`${this.apiUrl}/services/app/Budget/CreateBudget`, data);
    }
    getBudgets():Observable<any> {
        return this._HttpClient.get(`${this.apiUrl}/services/app/Budget/getBudgets`);
    }
    updateBudgetLimit(data: UserCategory | undefined):Observable<any> {
        return this._HttpClient.post(`${this.apiUrl}/services/app/Budget/EditBudget`, data);
    }
    getUserCategory(id:number):Observable<any> {
        return this._HttpClient.get(`${this.apiUrl}/services/app/Budget/getUserCategory/?id=${id}`);
    }
    deleteBudget(id:number):Observable<any> {
        return this._HttpClient.delete(`${this.apiUrl}/services/app/Budget/DeleteBudget/?id=${id}`);
    }

    

}