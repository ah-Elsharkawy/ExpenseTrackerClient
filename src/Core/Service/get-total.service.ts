import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetTotalService {
  private ApiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getTotalBalance(id:any) : Observable<any> {
    return this.http.get(`${this.ApiUrl}/services/app/Transaction/GetBalance?id=${id}`); 
  }
  getTotalIncome(id:any) : Observable<any> {
    return this.http.get(`${this.ApiUrl}/services/app/Transaction/GetTotalIncomeByMonth?id=${id}`); 
  }
  getTotalExpense(id:any) : Observable<any> {
    return this.http.get(`${this.ApiUrl}/services/app/Transaction/GetTotalExpenseByMonth?id=${id}`); 
  }
}
