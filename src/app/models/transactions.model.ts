export interface Transaction {
  id: string;
  merchantName: string;
  purchaseDate: string;
  amount: number;
  symbol: string;
  debitDate: string;
  merchantAddress: string;
  numOfPayments: number;
  transTypeComment: string;
  transactionType: string;
  insertDate: string;
}

export interface Transactions {
  transactions: Transaction[];
}
