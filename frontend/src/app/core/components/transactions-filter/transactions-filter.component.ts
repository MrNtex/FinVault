import { Component } from '@angular/core';
import { TransactionType } from '../../models/transaction.model';
import { FilterService } from '../../services/filter.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-filter',
  standalone: true,
  templateUrl: './transactions-filter.component.html',
  styleUrls: ['./transactions-filter.component.css'],
  imports: [
    CommonModule,
    AsyncPipe,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class TransactionsFilterComponent {
  TransactionType = TransactionType;
  filters$;

  constructor(public filterService: FilterService) {
    this.filters$ = this.filterService.filters$;
  }

  updateFilter(key: keyof typeof this.filterService['filtersSubject']['value'], value: any) {
    this.filterService.updateFilters({ [key]: value });
  }

  clearFilters() {
    this.filterService.resetFilters();
  }
}
