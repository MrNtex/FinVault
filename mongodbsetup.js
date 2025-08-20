use('bankAppDB');

db.getCollection('bankAssets').insertMany([
  {
    type: 'gold',
    assetId: 'GOLD-001',
    quantityKg: 250,
    pricePerKgUSD: 63000,
    totalValueUSD: 250 * 63000,
    location: 'Vault A',
    lastUpdated: new Date()
  },
  {
    type: 'cryptocurrency',
    assetId: 'BTC-001',
    name: 'Bitcoin',
    quantity: 120,
    pricePerUnitUSD: 67000,
    totalValueUSD: 120 * 67000,
    walletAddress: '1BankBTCWalletAddrXYZ',
    lastUpdated: new Date()
  },
  {
    type: 'stock',
    assetId: 'AAPL-001',
    symbol: 'AAPL',
    quantity: 5000,
    pricePerUnitUSD: 185,
    totalValueUSD: 5000 * 185,
    exchange: 'NASDAQ',
    lastUpdated: new Date()
  },
  {
    type: 'bond',
    assetId: 'BOND-2025-001',
    issuer: 'US Treasury',
    faceValueUSD: 1000000,
    interestRate: 0.032,
    maturityDate: new Date('2025-12-31'),
    purchaseDate: new Date('2020-01-01'),
    lastUpdated: new Date()
  },
  {
    type: 'real_estate',
    assetId: 'RE-001',
    address: '123 Bank St, Finance City, NY',
    estimatedValueUSD: 4000000,
    acquiredDate: new Date('2018-06-01'),
    lastUpdated: new Date()
  }
]);
