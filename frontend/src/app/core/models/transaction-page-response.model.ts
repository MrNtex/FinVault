import { Transaction } from './transaction.model';

export interface TransactionPageResponse {
    transactions: Transaction[];
    currentPage: number;
    pageSize: number;
    totalElements: number;
} 