import { Account } from "./account.model";
import { FlaggedTransaction } from "./flagged-transaction.model";

export enum TransactionType {
  CARD = 'card',
  TRANSFER = 'transfer',
  RECURRING = 'recurring',
}

export interface Transaction {
  id: number;
  account: Account;
  recipientIBAN: string;
  date: string;
  description: string;
  amount: number;
  transactionType: TransactionType;
  flagged?: FlaggedTransaction;
}
