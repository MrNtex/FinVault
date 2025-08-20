import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, TransactionType } from '../models/transaction.model';
import { TransactionPageResponse } from '../models/transaction-page-response.model';
import { environment } from '../../../environments/environment';
import { CreateTransactionRequest } from '../models/create-transaction-request';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = `${environment.apiUrl}/transactions`;

  constructor(private _httpClient: HttpClient) {}

  getTransactions(
    page: number = 1,
    size: number = 10,
    sortBy: string = 'date',
    direction: string = 'desc',
    startDate?: string,
    endDate?: string,
    category?: string,
    type?: TransactionType,
    minAmount?: number,
    maxAmount?: number,
    description?: string,
    isFlagged?: boolean,
    accountId?: string
  ): Observable<TransactionPageResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
    if (category) {
      params = params.set('category', category);
    }
    if (type) {
      params = params.set('type', type);
    }
    if (minAmount) {
      params = params.set('minAmount', minAmount.toString());
    }
    if (maxAmount) {
      params = params.set('maxAmount', maxAmount.toString());
    }
    if (description) {
      params = params.set('description', description);
    }
    if (isFlagged !== undefined && isFlagged) {
      params = params.set('isFlagged', true);
    }
    if (accountId) {
      params = params.set('accountId', accountId);
    }

    return this._httpClient.get<TransactionPageResponse>(`${this.apiUrl}`, { params });
  }

  createTransaction(transaction: CreateTransactionRequest): Observable<CreateTransactionRequest> {
    return this._httpClient.post<CreateTransactionRequest>(`${this.apiUrl}`, transaction);
  }
} 