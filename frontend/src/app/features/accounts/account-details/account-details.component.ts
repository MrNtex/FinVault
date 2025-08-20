import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Account } from '../../../core/models/account.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TransactionsTableComponent } from '../../../core/components/transactions-table/transactions-table.component';
import { TransactionsFilterComponent } from '../../../core/components/transactions-filter/transactions-filter.component';
import { FilterService } from '../../../core/services/filter.service';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    TransactionsTableComponent,
    TransactionsFilterComponent
  ]
})
export class AccountDetailsComponent implements OnInit {
  account!: Account;
  balance: number = 0;
  isLoadingBalance: boolean = false;
  filters$;
  
  constructor(public filterService: FilterService, public accountService: AccountService, private route: ActivatedRoute) {
    this.filters$ = this.filterService.filters$;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const accountId = params['id'];
      this.loadAccountDetails(accountId);
      this.fetchBalance(accountId);
      this.filterService.updateFilters({ accountId: accountId });
    });
  }

  private loadAccountDetails(accountId: string) {
    this.accountService.getAccount(accountId).subscribe(
      (account: Account) => {
        this.account = account;
        console.log('Account details loaded:', this.account);
      }
    );
  }

  private fetchBalance(accountId: string) {
    
    this.isLoadingBalance = true;
    
    this.accountService.getBalance(accountId).subscribe(
      (balance: number) => {
        this.balance = balance;
        console.log('Balance fetched:', this.balance);
      }
    );

    this.isLoadingBalance = false;
  }
} 