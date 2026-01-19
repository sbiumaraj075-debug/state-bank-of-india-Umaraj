
export type TransactionStatus = 'Paid' | 'Pending' | 'Returned';

export interface Transaction {
  id: string;
  date: string;
  billNo: string;
  customer: string;
  amount: number;
  status: TransactionStatus;
}

export interface DashboardStats {
  dailySales: number;
  totalCash: number;
  salesReturns: number;
}

export type View = 'Dashboard' | 'Sales Entry' | 'Payments & Receipts' | 'Sales Returns' | 'Cashbook' | 'Reports' | 'Settings';
