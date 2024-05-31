import { Injectable } from '@angular/core';
import { Transaction } from '../Interface/transaction';
@Injectable({
  providedIn: 'root'
})
export class InsightsService {
//inject HttpClient
  transactions = new Array<Transaction>();
  constructor() {
       // only 20 transactions in 2024 year
        this.transactions = [
        { id: 1, amount: 100.00, categoryId: 1, type: 1, date: new Date('2024-05-20'), description: 'Groceries' },
        { id: 2, amount: 250.00, categoryId: 2, type: 0, date: new Date('2024-05-21'), description: 'Electronics' },
        { id: 3, amount: 75.00, categoryId: 3, type: 1, date: new Date('2024-05-22'), description: 'Dining Out' },
        { id: 4, amount: 60.00, categoryId: 4, type: 0, date: new Date('2024-05-23'), description: 'Fuel' },
        { id: 5, amount: 150.00, categoryId: 5, type: 1, date: new Date('2024-05-24'), description: 'Clothing' },
        { id: 6, amount: 200.00, categoryId: 6, type: 0, date: new Date('2024-05-25'), description: 'Books' },
        { id: 7, amount: 180.00, categoryId: 7, type: 1, date: new Date('2024-05-26'), description: 'Utilities' },
        { id: 8, amount: 320.00, categoryId: 8, type: 0, date: new Date('2024-05-27'), description: 'Travel' },
        { id: 9, amount: 40.00, categoryId: 9, type: 1, date: new Date('2024-05-28'), description: 'Entertainment' },
        { id: 10, amount: 50.00, categoryId: 10, type: 0, date: new Date('2024-05-29'), description: 'Healthcare' },
        { id: 11, amount: 30.00, categoryId: 11, type: 1, date: new Date('2024-05-30'), description: 'Snacks' },
        { id: 12, amount: 45.00, categoryId: 12, type: 0, date: new Date('2024-05-31'), description: 'Subscriptions' },
        { id: 13, amount: 400.00, categoryId: 13, type: 1, date: new Date('2024-05-20'), description: 'Rent' },
        { id: 14, amount: 20.00, categoryId: 14, type: 0, date: new Date('2024-05-21'), description: 'Parking' },
        { id: 15, amount: 250.00, categoryId: 15, type: 1, date: new Date('2024-05-22'), description: 'Gym Membership' },
        { id: 16, amount: 85.00, categoryId: 16, type: 0, date: new Date('2024-05-23'), description: 'Pet Supplies' },
        { id: 17, amount: 120.00, categoryId: 17, type: 1, date: new Date('2024-05-24'), description: 'Home Improvement' },
        { id: 18, amount: 95.00, categoryId: 18, type: 0, date: new Date('2024-05-25'), description: 'Gifts' },
        { id: 19, amount: 130.00, categoryId: 19, type: 1, date: new Date('2024-05-26'), description: 'Insurance' },
        { id: 20, amount: 220.00, categoryId: 20, type: 0, date: new Date('2024-05-27'), description: 'Loan Payment' }
    ];



    }

    GetAllExpenseTransactions_GroupedByMonth_InCurrentYear() {
        // i need only an array conatining the total expense for each month in the current year
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
        // i need only an array conatining the total income for each month in the current year
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
