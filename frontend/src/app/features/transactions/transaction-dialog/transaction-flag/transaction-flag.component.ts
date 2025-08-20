import { Component, input, inject, OnInit } from '@angular/core';
import { Transaction } from '../../../../core/models/transaction.model';
import { FlaggedStatus } from '../../../../core/models/flagged-transaction.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction-flag',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './transaction-flag.component.html',
  styleUrl: './transaction-flag.component.css'
})
export class TransactionFlagComponent implements OnInit {
  data = input<Transaction>();
  private snackBar = inject(MatSnackBar);
  
  FlaggedStatus = FlaggedStatus; // Make enum available in template
  isEditing = false;
  editedFlag = {
    reason: '',
    status: FlaggedStatus.PENDING,
    resolutionNotes: ''
  };

  ngOnInit() {
    // Initialize editedFlag with current values if they exist
    const transaction = this.data();
    if (transaction?.flagged) {
      this.editedFlag = {
        reason: transaction.flagged.reason,
        status: transaction.flagged.status,
        resolutionNotes: transaction.flagged.resolutionNotes || ''
      };
    }
  }

  onReasonChange() {
    this.isEditing = true;
  }

  onStatusChange() {
    this.isEditing = true;
  }

  onNotesChange() {
    this.isEditing = true;
  }

  saveChanges() {
    // TODO: Implement API call to save changes
    const transaction = this.data();
    if (transaction?.flagged) {
      // Update existing flag
      console.log('Updating flag:', this.editedFlag);
    } else {
      // Create new flag
      console.log('Creating new flag:', this.editedFlag);
    }
    
    this.isEditing = false;
    this.snackBar.open(
      transaction?.flagged ? 'Flag updated successfully' : 'Flag created successfully',
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      }
    );
  }
}
