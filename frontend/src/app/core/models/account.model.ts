export enum AccountType {
  PERSONAL = 'personal',
  BUSINESS = 'business',
  SAVINGS = 'savings',
}

export interface Account {
  id: number;
  user_id: number;
  accountNumber: string;
  type: AccountType;
  currency: string;
}
