import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-income-dt',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './income-dt.component.html',
  styleUrl: './income-dt.component.css'
})
export class IncomeDTComponent implements OnInit {
  dtOptions: Config = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }
}
