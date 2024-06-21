import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { TransactionService } from '../../../Core/Service/transaction.service';
import { AuthService } from '../../../Core/Service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-dt',
  standalone: true,
  imports: [CommonModule, DataTablesModule],  // Added CommonModule
  templateUrl: './expense-dt.component.html',
  styleUrl: './expense-dt.component.css'
})
export class ExpenseDTComponent implements OnInit {
  dtOptions: Config = {};
  expensesTransactions: any[] = [];
  expense: number = 1;

  constructor(
    private _TransactionService: TransactionService,
    private _AuthService: AuthService
  ) {}


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    const userId = this._AuthService.userID;
    this._TransactionService.getTransactionByType(userId, this.expense).subscribe((response: any) => {
      this.expensesTransactions = response.result;
    });

  }
}

