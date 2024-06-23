import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { TransactionService } from '../../../Core/Service/transaction.service';
import { AuthService } from '../../../Core/Service/auth.service';
import { Config } from 'datatables.net';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-income-dt',
  standalone: true,
  imports: [CommonModule, DataTablesModule], // Added CommonModule
  templateUrl: './income-dt.component.html',
  styleUrls: ['./income-dt.component.css'], // corrected styleUrl to styleUrls
})
export class IncomeDTComponent implements OnInit {
  allTransactions: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private _TransactionService: TransactionService,
    private _AuthService: AuthService
  ) {}

  dtOptions: Config = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    };

    const userId = this._AuthService.userID;
    this._TransactionService
      .getTransactionsByUserId(userId)
      .subscribe((response) => {
        this.allTransactions = response.result;
        this.dtTrigger.next(null);
        console.log(this.allTransactions);
      });
  }
}
