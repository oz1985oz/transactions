import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginIdentifier } from '../models/login-identifier.model';
import { Transactions } from '../models/transactions.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  login(loginIdentifier: LoginIdentifier): Observable<User> {
    return this.http.post<User>(`${environment.endPoint}/Authenticate`, loginIdentifier)
      .pipe(tap(user => this.setToken(user.token)));
  }

  getTransactions(): Observable<Transactions> {
    return this.http.get<Transactions>(`${environment.endPoint}/Transactions/GetTransactions`);
  }

  // saveMonthlyTransactions(): Observable<Transactions> {
  //   return this.http.post<Transactions>(`${environment.endPoint}/Transactions/SaveMonthlyTransactions`);
  // }
}
