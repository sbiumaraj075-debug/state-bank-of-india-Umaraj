
import React, { useState } from 'react';
import { Transaction, TransactionStatus } from '../types';
import { ArrowLeft, Save, X } from 'lucide-react';

interface SalesEntryFormProps {
  onSave: (tx: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
}

const SalesEntryForm: React.FC<SalesEntryFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    customer: '',
    amount: '',
    status: 'Paid' as TransactionStatus,
    billNo: `#B${Math.floor(1000 + Math.random() * 9000)}`
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer || !formData.amount) return;

    onSave({
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      billNo: formData.billNo,
      customer: formData.customer,
      amount: parseFloat(formData.amount),
      status: formData.status
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 max-w-2xl mx-auto overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-3">
        <button onClick={onCancel} className="p-1 hover:bg-slate-200 rounded-md transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h2 className="text-lg font-bold text-slate-800">New Sales Entry</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Bill Number</label>
            <input 
              type="text" 
              value={formData.billNo} 
              readOnly
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Date</label>
            <input 
              type="text" 
              value={new Date().toLocaleDateString()} 
              readOnly
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Customer Name</label>
          <input 
            type="text" 
            placeholder="Enter customer name"
            required
            value={formData.customer}
            onChange={e => setFormData({ ...formData, customer: e.target.value })}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Amount (₹)</label>
            <input 
              type="number" 
              step="0.01"
              required
              placeholder="0.00"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Status</label>
            <select 
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value as TransactionStatus })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button 
            type="submit"
            className="flex-1 bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Transaction
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalesEntryForm;
