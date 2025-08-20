import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface BankAsset {
  type: string;
  assetId: string;
  quantityKg?: number;
  quantity?: number;
  pricePerKgUSD?: number;
  pricePerUnitUSD?: number;
  totalValueUSD: number;
  location?: string;
  walletAddress?: string;
  symbol?: string;
  exchange?: string;
  issuer?: string;
  faceValueUSD?: number;
  interestRate?: number;
  maturityDate?: Date;
  purchaseDate?: Date;
  address?: string;
  estimatedValueUSD?: number;
  acquiredDate?: Date;
  lastUpdated: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private apiUrl = `${environment.apiUrl}/assets`;

  constructor(private http: HttpClient) {}

  getAssets(): Observable<BankAsset[]> {
    return this.http.get<BankAsset[]>(this.apiUrl);
  }

  getTotalAssetsValue(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-value`);
  }
} 