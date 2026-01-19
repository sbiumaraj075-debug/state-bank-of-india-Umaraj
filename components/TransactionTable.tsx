
import React from 'react';
import { Transaction } from '../types';

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Returned':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-100">
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Bill No</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-slate-600">{tx.date}</td>
              <td className="px-6 py-4 text-sm font-semibold text-slate-800">{tx.billNo}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{tx.customer}</td>
              <td className={`px-6 py-4 text-sm font-bold ${tx.amount < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                ₹ {tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(tx.status)}`}>
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
