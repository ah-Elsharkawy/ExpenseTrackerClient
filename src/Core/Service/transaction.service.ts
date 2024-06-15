import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apiUrl;

  private transactionsSource = new BehaviorSubject<any[]>([]);
  transactions$ = this.transactionsSource.asObservable();

  constructor(private _HttpClient: HttpClient) {}

  createTransaction(data: any): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}/services/app/Transaction/CreateTransaction`, data);
  }

  addTransaction(transaction: any) {
    const currentTransactions = this.transactionsSource.value;
    if (!currentTransactions.some(t => t.id === transaction.id)) { // Assuming each transaction has a unique 'id'
      this.transactionsSource.next([...currentTransactions, transaction]);
    }
  }

  deleteTransaction(id: number): Observable<any> {
    return this._HttpClient.delete(`${this.apiUrl}/services/app/Transaction/DeleteTransaction?id=${id}`);
  }

  removeTransaction(id: number) {
    const currentTransactions = this.transactionsSource.value.filter(t => t.id !== id);
    this.transactionsSource.next(currentTransactions);
  }



  loadTransactions(transactions: any[]) {
    this.transactionsSource.next(transactions);
  }

  fetchTransactions(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}/services/app/Transaction/GetTransactions`);
  }

  updateTransactions() {
    this.fetchTransactions().subscribe((response: any) => {
      this.loadTransactions(response.result);
    });
  }

  updateTransaction(data: any): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}/services/app/Transaction/UpdateTransaction`, data);
  }



}
