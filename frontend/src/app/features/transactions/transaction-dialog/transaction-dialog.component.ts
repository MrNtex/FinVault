import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { Transaction } from '../../../core/models/transaction.model';
import { TransactionInfoComponent } from './transaction-info/transaction-info.component';
import { TransactionFlagComponent } from './transaction-flag/transaction-flag.component';

@Component({
  selector: 'app-transaction-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule, 
    MatTabsModule,
    TransactionInfoComponent,
    TransactionFlagComponent
  ],
  templateUrl: './transaction-dialog.component.html',
  styleUrl: './transaction-dialog.component.css'
})
export class TransactionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Required<Transaction>) {
    if (!data) {
      throw new Error('Transaction data is required');
    }
  }
}
