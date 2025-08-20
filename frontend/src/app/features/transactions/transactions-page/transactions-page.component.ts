import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { TransactionsTableComponent } from '../../../core/components/transactions-table/transactions-table.component';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { TransactionsFilterComponent } from '../../../core/components/transactions-filter/transactions-filter.component';
import { CreateTransactionDialogComponent } from '../create-transaction-dialog/create-transaction-dialog.component';
import { TransactionService } from '../../../core/services/transaction.service';
import { FilterService } from '../../../core/services/filter.service';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [
    TransactionsTableComponent,
    TransactionsFilterComponent,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.css'
})
export default class TransactionsPage {
  constructor(
    private dialog: MatDialog, 
    private transactionService: TransactionService,
    private filterService: FilterService
  ) {}

  openCreateTransactionDialog() {
    const dialogRef = this.dialog.open(CreateTransactionDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionService.createTransaction(result).subscribe({
          next: (response) => {
            console.log('Transaction created successfully:', response);
            // Trigger a refresh by updating the filters with current values
            const currentFilters = this.filterService.getCurrentFilters();
            this.filterService.updateFilters(currentFilters);
          },
          error: (error) => {
            console.error('Error creating transaction:', error);
          }
        });
      }
    });
  }
}
