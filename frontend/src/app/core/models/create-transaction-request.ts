import { TransactionType } from './transaction.model';

export interface CreateTransactionRequest {
    accountId: number;
    recipientIBAN: string;
    amount: number;
    date: string;
    description: string;
    transactionType: TransactionType;
} 