
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  FileEdit, 
  Wallet, 
  RotateCcw, 
  BookOpen, 
  BarChart3, 
  Settings, 
  LogOut, 
  TrendingUp, 
  CreditCard,
  PlusCircle,
  Sparkles
} from 'lucide-react';
import { Transaction, DashboardStats, View } from './types';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import TransactionTable from './components/TransactionTable';
import SalesEntryForm from './components/SalesEntryForm';
import { getBusinessInsights } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('Dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', date: '26 Oct 2024', billNo: '#B1045', customer: 'Rajesh Kumar', amount: 5500.00, status: 'Paid' },
    { id: '2', date: '26 Oct 2024', billNo: '#B1044', customer: 'Anita Singh', amount: 1200.00, status: 'Pending' },
    { id: '3', date: '25 Oct 2024', billNo: '#R1002', customer: 'Mukesh Sharma', amount: -450.00, status: 'Returned' },
    { id: '4', date: '25 Oct 2024', billNo: '#B1043', customer: 'Priya Verma', amount: 8000.00, status: 'Paid' },
  ]);

  const [insights, setInsights] = useState<any[]>([]);
  const [isInsightLoading, setIsInsightLoading] = useState(false);

  const stats: DashboardStats = useMemo(() => {
    const today = '26 Oct 2024';
    const daily = transactions
      .filter(t => t.date === today && t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    const returns = Math.abs(transactions
      .filter(t => t.status === 'Returned')
      .reduce((sum, t) => sum + t.amount, 0));
    const cash = 112500.00 + daily - returns; // Base balance simulation

    return { dailySales: daily, totalCash: cash, salesReturns: returns };
  }, [transactions]);

  const fetchInsights = async () => {
    setIsInsightLoading(true);
    const result = await getBusinessInsights(stats, transactions);
    setInsights(result);
    setIsInsightLoading(false);
  };

  useEffect(() => {
    fetchInsights();
  }, [stats]);

  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const tx = { ...newTx, id: Math.random().toString(36).substr(2, 9) };
    setTransactions([tx, ...transactions]);
    setCurrentView('Dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'Dashboard':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                title="Daily Sales" 
                value={`₹ ${stats.dailySales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                subtitle="Today's Transactions"
                icon={<TrendingUp className="w-8 h-8 text-blue-500" />}
                variant="blue"
              />
              <StatCard 
                title="Total Cash in Hand" 
                value={`₹ ${stats.totalCash.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                subtitle="Current Balance"
                icon={<CreditCard className="w-8 h-8 text-blue-500" />}
                variant="green"
              />
              <StatCard 
                title="Sales Returns" 
                value={`₹ ${stats.salesReturns.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                subtitle="This Month"
                icon={<RotateCcw className="w-8 h-8 text-blue-500" />}
                variant="red"
              />
            </div>

            {/* AI Insights Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Business Insights
                </h3>
                <button 
                  onClick={fetchInsights}
                  disabled={isInsightLoading}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {isInsightLoading ? 'Analyzing...' : 'Refresh Insights'}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {insights.length > 0 ? insights.map((insight, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border ${
                    insight.type === 'warning' ? 'bg-amber-50 border-amber-100' : 
                    insight.type === 'success' ? 'bg-emerald-50 border-emerald-100' : 'bg-blue-50 border-blue-100'
                  }`}>
                    <h4 className="font-medium text-slate-800 text-sm mb-1">{insight.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{insight.description}</p>
                  </div>
                )) : (
                  <div className="col-span-3 text-center py-4 text-slate-400 text-sm">
                    {isInsightLoading ? 'Generating smart insights for your business...' : 'No insights available yet.'}
                  </div>
                )}
              </div>
            </div>

            {/* Transactions Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Recent Transactions</h3>
                <button 
                  onClick={() => setCurrentView('Sales Entry')}
                  className="flex items-center gap-1.5 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                >
                  <PlusCircle className="w-4 h-4" />
                  New Entry
                </button>
              </div>
              <TransactionTable transactions={transactions.slice(0, 5)} />
              <div className="px-6 py-4 bg-slate-50 flex justify-end">
                <button className="text-blue-600 text-sm font-medium hover:underline">View All Transactions</button>
              </div>
            </div>
          </div>
        );
      case 'Sales Entry':
        return <SalesEntryForm onSave={handleAddTransaction} onCancel={() => setCurrentView('Dashboard')} />;
      default:
        return (
          <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-400 font-medium">{currentView} Content - Work in Progress</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">CSC Center Dashboard</h1>
              <p className="text-slate-500 font-medium">October 26, 2024</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-200">
                <Settings className="w-5 h-5 text-slate-600" />
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">JD</div>
                <span className="text-sm font-semibold text-slate-700">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default App;
