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

  private expensesSource = new BehaviorSubject<any[]>([]);
  expenses$ = this.expensesSource.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) { }

  createExpense(data: any): Observable<any> {
    const token = this.authService.getToken();    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/services/app/Transaction/CreateTransaction`, data, { headers });
  }

  addExpense(expense: any) {
    const currentExpenses = this.expensesSource.value;
    if (!currentExpenses.some(e => e.id === expense.id)) {
      this.expensesSource.next([...currentExpenses, expense]);
    }
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/services/app/Transaction/DeleteTransaction?id=${id}`);
  }

  removeExpense(id: number) {
    const currentExpenses = this.expensesSource.value.filter(e => e.id !== id);
    this.expensesSource.next(currentExpenses);
  }

  loadExpenses(expenses: any[]) {
    this.expensesSource.next(expenses);
  }

  fetchExpensesByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/services/app/Transaction/GetTransactionsByUserId?userId=${userId}`);
  }

  updateExpenses(userId: number) {
    this.fetchExpensesByUserId(userId).subscribe((response: any) => {
      this.loadExpenses(response.result);
    });
  }

  updateExpense(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/services/app/Transaction/UpdateTransaction`, data);
  }

  getExpenses(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/services/app/Transaction/GetTransactionByType?type=1&userId=${id}`);
  }
}
