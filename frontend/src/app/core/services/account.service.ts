import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, TransactionType } from '../models/transaction.model';
import { TransactionPageResponse } from '../models/transaction-page-response.model';
import { environment } from '../../../environments/environment';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}/accounts`;

  constructor(private _httpClient: HttpClient) {}

  getAccount(
    id: string | number,
  ): Observable<Account> {
    return this._httpClient.get<Account>(`${this.apiUrl}/${id}`);
  }

  getBalance(
    id: string | number,
  ): Observable<number> {
    return this._httpClient.get<number>(`${this.apiUrl}/${id}/balance`);
  }
} 