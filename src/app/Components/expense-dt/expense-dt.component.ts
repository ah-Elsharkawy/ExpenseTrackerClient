import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-expense-dt',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './expense-dt.component.html',
  styleUrl: './expense-dt.component.css'
})
export class ExpenseDTComponent implements OnInit {
  dtOptions: Config = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }

}

