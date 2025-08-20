import { Component, input } from '@angular/core';
import { Transaction } from '../../../../core/models/transaction.model';
import { DecimalPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-info',
  standalone: true,
  imports: [DecimalPipe, DatePipe],
  templateUrl: './transaction-info.component.html',
  styleUrl: './transaction-info.component.css'
})
export class TransactionInfoComponent {
  data = input.required<Transaction>();
}
