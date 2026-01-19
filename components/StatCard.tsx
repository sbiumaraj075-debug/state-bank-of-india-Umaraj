
import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  variant?: 'blue' | 'green' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, variant = 'blue' }) => {
  const getHeaderStyle = () => {
    switch(variant) {
      case 'green': return 'bg-gradient-to-r from-emerald-500 to-teal-600';
      case 'red': return 'bg-gradient-to-r from-rose-500 to-red-600';
      default: return 'bg-gradient-to-r from-blue-600 to-indigo-600';
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className={`px-5 py-3 text-white text-sm font-semibold ${getHeaderStyle()}`}>
        {title}
      </div>
      <div className="p-6 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-slate-800 tracking-tight">{value}</p>
          <p className="text-sm text-slate-400 font-medium">{subtitle}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
