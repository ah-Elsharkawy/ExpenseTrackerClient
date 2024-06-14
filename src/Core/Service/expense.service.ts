import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<any> {
    let userId = 16;
    let params = new HttpParams().set('userId', userId);
    return this.http.get<any>(`${environment.apiUrl}/services/app/Transaction/GetTransactionsByUserId`, {params});
  }
}
