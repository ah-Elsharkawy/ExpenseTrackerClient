import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { TransactionService } from '../../../Core/Service/transaction.service';
import { AuthService } from '../../../Core/Service/auth.service';
import { Config } from 'datatables.net';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-income-dt',
  standalone: true,
  imports: [CommonModule, DataTablesModule],  // Added CommonModule
  templateUrl: './income-dt.component.html',
  styleUrls: ['./income-dt.component.css']  // corrected styleUrl to styleUrls
})
export class IncomeDTComponent implements OnInit {
  IncomeTransactions: any[] = [];
  income: number = 0;

  constructor(
    private _TransactionService: TransactionService,
    private _AuthService: AuthService
  ) {}

  dtOptions: Config = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

    const userId = this._AuthService.userID;
    this._TransactionService.getTransactionByType(userId, this.income).subscribe((response: any) => {
      this.IncomeTransactions = response.result;
      console.log(response.result);
    });
  }
}
