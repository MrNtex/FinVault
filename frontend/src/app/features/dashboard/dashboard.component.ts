import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TransactionService } from '../../core/services/transaction.service';
import { Transaction, TransactionType } from '../../core/models/transaction.model';
import { FlaggedStatus } from '../../core/models/flagged-transaction.model';
import { TransactionDialogComponent } from '../transactions/transaction-dialog/transaction-dialog.component';
import { AssetsService } from '../../core/services/assets.service';

interface Alert {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
  transaction?: Transaction;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatDialogModule
  ],
  providers: [TransactionService, AssetsService]
})
export class DashboardComponent implements OnInit {
  // Key metrics
  totalAssets = 1500000;
  assetsTrend = 14.51;
  riskScore = 0;
  riskTrend = 33;
  suspiciousActivities = 0;
  suspiciousTrend = 0;
  complianceScore = 0;
  complianceTrend = 0;

  // Risk analysis
  highRiskTransactions = 0;
  unusualPatterns = 0;
  regulatoryViolations = 0;

  // Alerts
  recentAlerts: Alert[] = [];
  
  // Loading states
  isLoading = true;

  constructor(
    private transactionService: TransactionService,
    private dialog: MatDialog,
    private assetsService: AssetsService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
    this.getAssetsValue();
  }

  private getAssetsValue() {
    this.assetsService.getAssets().subscribe({
      next: (assets) => {
        this.totalAssets = assets.reduce((sum, asset) => sum + asset.totalValueUSD, 0);
      },
      error: (error) => {
        console.error('Error loading assets:', error);
      }
    });
  }

  private loadDashboardData() {

    this.transactionService.getTransactions(
      0, // page
      100, // size
      'date', // sortBy
      'desc', // direction
      undefined, // startDate
      undefined, // endDate
      undefined, // category
      undefined, // type
      undefined, // minAmount
      undefined, // maxAmount
      undefined, // description
      true // isFlagged
    ).subscribe({
      next: (response) => {
        const flaggedTransactions = response.transactions;
        
        // Calculate metrics
        this.suspiciousActivities = flaggedTransactions.length;
        
        // Calculate risk score based on flagged transactions
        const pendingFlags = flaggedTransactions.filter(t => t.flagged?.status === FlaggedStatus.PENDING).length;
        const resolvedFlags = flaggedTransactions.filter(t => t.flagged?.status === FlaggedStatus.RESOLVED).length;
        this.riskScore = Math.round((pendingFlags / (pendingFlags + resolvedFlags)) * 100) || 0;

        // Generate alerts from flagged transactions
        this.recentAlerts = flaggedTransactions
          .filter(t => t.flagged?.status === FlaggedStatus.PENDING)
          .map(t => ({
            id: t.id,
            title: t.flagged?.reason || 'Suspicious Activity Detected',
            priority: this.getAlertPriority(t),
            timestamp: new Date(t.date),
            transaction: t
          }))
          .slice(0, 5); // Show only 5 most recent alerts

        // Calculate high risk transactions
        this.highRiskTransactions = flaggedTransactions.filter(t => 
          t.flagged?.status === FlaggedStatus.PENDING && 
          this.getAlertPriority(t) === 'high'
        ).length;

        this.unusualPatterns = flaggedTransactions.filter(t => 
          t.flagged?.reason?.toLowerCase().includes('unusual') ||
          t.flagged?.reason?.toLowerCase().includes('pattern')
        ).length;

        this.regulatoryViolations = flaggedTransactions.filter(t => 
          t.flagged?.reason?.toLowerCase().includes('compliance') ||
          t.flagged?.reason?.toLowerCase().includes('regulation')
        ).length;

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.isLoading = false;
      }
    });
  }

  private getAlertPriority(transaction: Transaction): 'high' | 'medium' | 'low' {
    const reason = transaction.flagged?.reason?.toLowerCase() || '';
    
    if (reason.includes('unusual amount') || 
        reason.includes('multiple transactions') || 
        reason.includes('high risk')) {
      return 'high';
    }
    
    if (reason.includes('pattern') || 
        reason.includes('suspicious') || 
        reason.includes('unusual')) {
      return 'medium';
    }
    
    return 'low';
  }

  openTransactionDialog(alert: Alert) {
    if (alert.transaction) {
      this.dialog.open(TransactionDialogComponent, {
        data: alert.transaction,
        width: '600px'
      });
    }
  }
} 