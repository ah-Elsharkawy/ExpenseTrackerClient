import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = environment.apiUrl;

  constructor(private _HttpClient: HttpClient , private _AuthService: AuthService) { }

  getExpenses(id:number): Observable<any> {
    return this._HttpClient.get<any>(`${this.apiUrl}/services/app/Transaction/GetTransactionByType?type=1&userId=${id}`);
  }

  deleteExpenses(id: number): Observable<any> {
    return this._HttpClient.delete<any>(`${this.apiUrl}/services/app/Transaction/DeleteTransaction?id=${id}`);
  }

  addExpense(data: any): Observable<any> {
    const token = this._AuthService.getToken();    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
      return this._HttpClient.post<any>(`${this.apiUrl}/services/app/Transaction/CreateTransaction`, data , { headers });
  }
}
