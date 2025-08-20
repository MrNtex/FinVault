export interface Asset {
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