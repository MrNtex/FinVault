import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { Transaction, TransactionType } from '../../models/transaction.model';
import { DecimalPipe, DatePipe, NgClass } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {merge, Observable, of as observableOf, Subject} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TransactionService } from '../../services/transaction.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TransactionDialogComponent } from '../../../features/transactions/transaction-dialog/transaction-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FilterService } from '../../services/filter.service';

interface TransactionFilters {
  showOnlyFlagged: boolean;
  showOnlyRecent: boolean;
  transactionType: TransactionType | '';
  minAmount: number | undefined;
  maxAmount: number | undefined;
  accountId?: string;
}

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css'],
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    DecimalPipe,
    MatDialogModule,
    NgClass,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})

export class TransactionsTableComponent implements AfterViewInit {
  filters: TransactionFilters;

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private filterService: FilterService,
    private transactionService: TransactionService
  ) {
    this.filters = this.filterService.getCurrentFilters();
  }

  private _httpClient = inject(HttpClient);
  
  displayedColumns: string[] = ['date', 'account', 'recipientIBAN', 'description', 'amount'];
  data: Transaction[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private formatDateForAPI(date: Date): string {
    return date.toISOString().replace('Z', ''); // Remove 'Z' to match LocalDateTime format
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.filterService.filters$
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.filters = this.filterService.getCurrentFilters();
          const now = new Date();
          const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
          
          return this.transactionService!.getTransactions(
            this.paginator.pageIndex,
            10,
            this.sort.active,
            this.sort.direction,
            this.filters.showOnlyRecent ? this.formatDateForAPI(thirtyDaysAgo) : undefined, // startDate
            undefined, // endDate
            undefined, // category
            this.filters.transactionType || undefined, // type
            this.filters.minAmount || undefined, // minAmount
            this.filters.maxAmount || undefined, // maxAmount
            undefined, // description
            this.filters.showOnlyFlagged || undefined, // isFlagged
            this.filters.accountId || undefined // accountId
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          this.resultsLength = data.totalElements;
          return data.transactions;
        }),
      )
      .subscribe({
        next: (data) => {
          this.data = data;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading transactions:', error);
          this.isLoadingResults = false;
          this.cdr.detectChanges();
        }
      });
  }

  openTransactionDialog(transaction: Transaction) {
    this.dialog.open(TransactionDialogComponent, {
      data: transaction,
      width: '600px'
    });
  }
}
