import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TransactionType } from '../../../core/models/transaction.model';
import { AccountType } from '../../../core/models/account.model';
import { CreateTransactionRequest } from '../../../core/models/create-transaction-request';

@Component({
  selector: 'app-create-transaction-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './create-transaction-dialog.component.html',
  styleUrls: ['./create-transaction-dialog.component.css']
})
export class CreateTransactionDialogComponent {
  transactionForm: FormGroup;
  TransactionType = TransactionType;
  AccountType = AccountType;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateTransactionDialogComponent>
  ) {
    this.transactionForm = this.fb.group({
      accountId: ['101', [Validators.required]],
      accountType: [AccountType.PERSONAL, Validators.required],
      recipientIBAN: ['DE89370400440532013001', [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$')]],
      description: ['Monthly Salary Payment', Validators.required],
      amount: [2500.00, [Validators.required, Validators.min(0.01)]],
      transactionType: [TransactionType.TRANSFER, Validators.required],
      date: [new Date(), Validators.required]
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const formValue = this.transactionForm.value;
      const transaction: CreateTransactionRequest = {
        accountId: parseInt(formValue.accountId),
        recipientIBAN: formValue.recipientIBAN,
        description: formValue.description,
        amount: parseFloat(formValue.amount),
        transactionType: formValue.transactionType,
        date: formValue.date.toISOString()
      };
      
      this.dialogRef.close(transaction);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
} 