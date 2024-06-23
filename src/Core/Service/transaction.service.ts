import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apiUrl;

  constructor(private _HttpClient: HttpClient , private _AuthService: AuthService) { }

  getTransactions(id:number): Observable<any> {
    return this._HttpClient.get<any>(`${this.apiUrl}/services/app/Transaction/GetTransactionByType?type=0&userId=${id}`);
  }

  deleteTransaction(id: number): Observable<any> {
    return this._HttpClient.delete<any>(`${this.apiUrl}/services/app/Transaction/DeleteTransaction?id=${id}`);
  }

  addTransaction(data: any): Observable<any> {
    const token = this._AuthService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
      return this._HttpClient.post<any>(`${this.apiUrl}/services/app/Transaction/CreateTransaction`, data , { headers });
  }

  updateTransaction(data: any): Observable<any> {
    const token = this._AuthService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
      return this._HttpClient.put<any>(`${this.apiUrl}/services/app/Transaction/UpdateTransaction`, data , { headers });
  }

  getTransactionByType(userId: number, type:number): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}/services/app/Transaction/GetTransactionByType?type=${type}&userId=${userId}`);
  }
}
