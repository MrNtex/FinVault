import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TransactionType } from '../models/transaction.model';

export interface TransactionFilters {
  showOnlyFlagged: boolean;
  showOnlyRecent: boolean;
  transactionType: TransactionType | '';
  minAmount: number | undefined;
  maxAmount: number | undefined;
  accountId: string | undefined; 
}

@Injectable({ providedIn: 'root' })
export class FilterService {
  private filtersSubject = new BehaviorSubject<TransactionFilters>({
    showOnlyFlagged: false,
    showOnlyRecent: false,
    transactionType: '',
    minAmount: undefined,
    maxAmount: undefined,
    accountId: undefined,
  });

  filters$ = this.filtersSubject.asObservable();

  getCurrentFilters(): TransactionFilters {
    return this.filtersSubject.value;
  }

  updateFilters(patch: Partial<TransactionFilters>) {
    const current = this.filtersSubject.value;
    this.filtersSubject.next({ ...current, ...patch });
  }

  resetFilters() {
    this.filtersSubject.next({
      showOnlyFlagged: false,
      showOnlyRecent: false,
      transactionType: '',
      minAmount: undefined,
      maxAmount: undefined,
      accountId: undefined,
    });
  }
}
