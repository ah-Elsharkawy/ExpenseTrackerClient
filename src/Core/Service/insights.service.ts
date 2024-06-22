import { Injectable } from '@angular/core';
import { Transaction } from '../Interface/transaction';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsightsService {
  transactions = new Array<Transaction>();
  private apiUrl = environment.apiUrl+'/services/app/Transaction/GetTransactionsByUserId';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTransactions(): Observable<any[]> {
    const userId = this.authService.getUserId(); 
    const params = new HttpParams().set('userId', userId);

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        if (response && response.success) {
          return response.result || []; 
        } else {
          throw new Error('Failed to fetch transactions');
        }
      })
    );
  }
    GetAllExpenseTransactions_GroupedByMonth_InCurrentYear() {
        // i need only an array conatining the total expense for each month in the current year
        
      this.getTransactions().subscribe(transactions => {
        this.transactions = transactions;
      })
        
        let totalExpense = 0;
        let currentYear = new Date().getFullYear();
        let months = new Array(12).fill(0);
        this.transactions.forEach(transaction => {
          let year = new Date(transaction.date).getFullYear();
          if (year === currentYear) {
            if (transaction.type === 1) {
              let month = new Date(transaction.date).getMonth();
              months[month] += transaction.amount;
            }
          }
        });
        console.log("GetAllExpenseTransactions_GroupedByMonth", months);
        return months;
    }
    GetAllIncomeTransactions_GroupedByMonth_InCurrentYear() {
      this.getTransactions().subscribe(transactions => {
        this.transactions = transactions;
      });
      let totalIncome = 0;
        let currentYear = new Date().getFullYear();
        let months = new Array(12).fill(0);
        this.transactions.forEach(transaction => {
          let year = new Date(transaction.date).getFullYear();
          if (year === currentYear) {
            if (transaction.type === 0) {
              let month = new Date(transaction.date).getMonth();
              months[month] += transaction.amount;
            }
          }
        });
        console.log("GetAllincomeTransactions_GroupedByMonth", months);

        return months;

    }
    
    
    GetAllIncomeTransactions_GroupedByDays_InCurrentMonth() {
      this.getTransactions().subscribe(transactions => {
        this.transactions = transactions;
      });
        let currentMonth = new Date().getMonth();
                // i need the percise number of days in the current month
        let currentYear = new Date().getFullYear();
        let days = new Date(currentYear, currentMonth + 1, 0).getDate();
        let daysIncome = new Array(days).fill(0);
        this.transactions.forEach(transaction => {
          let month = new Date(transaction.date).getMonth();
          if (month === currentMonth) {
            if (transaction.type === 0) {
              let day = new Date(transaction.date).getDate();
              daysIncome[day - 1] += transaction.amount;
            }
          }
        });
        console.log("GetAllIncomeTransactions_GroupedByDays_InCurrentMonth", daysIncome);
        return daysIncome;

      
    }
    GetAllExpenseTransactions_GroupedByDays_InCurrentMonth() {
      this.getTransactions().subscribe(transactions => {
        this.transactions = transactions;
      }) 
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        let days = new Date(currentYear, currentMonth + 1, 0).getDate();
        let daysExpense = new Array(days).fill(0);
        this.transactions.forEach(transaction => {
          let month = new Date(transaction.date).getMonth();
          if (month === currentMonth) {
            if (transaction.type === 1) {
              let day = new Date(transaction.date).getDate();
              daysExpense[day - 1] += transaction.amount;
            }
          }
        });
        console.log("GetAllExpenseTransactions_GroupedByDays", daysExpense);
        return daysExpense;

      
    }
    // total income and expense for the current month returned in an array of 2 elements
    getMonthlyTotalofExpenseAndIncome(){
      this.getTransactions().subscribe(transactions => {
        this.transactions = transactions;
      })
      let totalIncome = 0;
      let totalExpense = 0;
      let currentMonth = new Date().getMonth();
      this.transactions.forEach(transaction => {
        let month = new Date(transaction.date).getMonth();
        if (month === currentMonth) {
          if (transaction.type === 0) {
            totalIncome += transaction.amount;
          } else {
            totalExpense += transaction.amount;
          }
        }
      });
      return [totalIncome, totalExpense];

    }
        // total income and expense for the current year returned in an array of 2 elements
    getYearlyTotalofExpenseAndIncome(){
      this.getTransactions().subscribe(transactions => {
        this.transactions = transactions;
      })
        let totalIncome = 0;
        let totalExpense = 0;
        let currentYear = new Date().getFullYear();
        this.transactions.forEach(transaction => {
          let year = new Date(transaction.date).getFullYear();
          if (year === currentYear) {
            if (transaction.type === 0) {
              totalIncome += transaction.amount;
            } else {
              totalExpense += transaction.amount;
            }
          }
        });
        return [totalIncome, totalExpense];
    }


}
