import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { Transactions } from 'src/app/models/transactions.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  data$: Observable<Transactions>;
  totalAmount = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.data$ = this.dataService.getTransactions().pipe(
      tap(t => {
        this.totalAmount = t.transactions.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
      }),
      share()
    );
  }

}
