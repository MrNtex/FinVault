import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AssetsService, BankAsset } from '../../core/services/assets.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule
  ]
})
export class AssetsComponent implements OnInit {
  assets: BankAsset[] = [];
  totalValue: number = 0;
  isLoading: boolean = true;
  displayedColumns: string[] = ['type', 'assetId', 'details', 'totalValueUSD', 'lastUpdated'];

  constructor(private assetsService: AssetsService) {}

  ngOnInit() {
    this.loadAssets();
  }

  private loadAssets() {
    this.isLoading = true;
    this.assetsService.getAssets().subscribe({
      next: (assets) => {
        this.assets = assets;
        this.totalValue = assets.reduce((sum, asset) => sum + asset.totalValueUSD, 0);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading assets:', error);
        this.isLoading = false;
      }
    });
  }

  getAssetDetails(asset: BankAsset): string {
    switch (asset.type) {
      case 'gold':
        return `${asset.quantityKg} kg at $${asset.pricePerKgUSD}/kg`;
      case 'cryptocurrency':
        return `${asset.quantity} ${asset.symbol} at $${asset.pricePerUnitUSD}/unit`;
      case 'stock':
        return `${asset.quantity} shares at $${asset.pricePerUnitUSD}/share`;
      case 'bond':
        return `${asset.issuer} - ${asset.interestRate}% interest`;
      case 'real_estate':
        return asset.address || 'No address provided';
      default:
        return 'No details available';
    }
  }

  getAssetIcon(type: string): string {
    switch (type) {
      case 'gold':
        return 'monetization_on';
      case 'cryptocurrency':
        return 'currency_bitcoin';
      case 'stock':
        return 'show_chart';
      case 'bond':
        return 'savings';
      case 'real_estate':
        return 'home';
      default:
        return 'account_balance';
    }
  }
} 