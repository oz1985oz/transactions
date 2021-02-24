import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction, Transactions } from 'src/app/models/transactions.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  dataSource = new MatTableDataSource<Transaction>();
  displayedColumns: string[] = [
    'merchantName',
    'merchantAddress',
    'numOfPayments',
    'purchaseDate',
    'amount',
  ];

  @Input() set data(val: Transactions) {
    if (val) {
      this.dataSource = new MatTableDataSource(val.transactions);
    }
  }

 ngOnInit(): void {
   if (window.screen.width < 600) {
    this.displayedColumns = [
      'merchantName',
      'amount',
    ];
   }
 }

}
