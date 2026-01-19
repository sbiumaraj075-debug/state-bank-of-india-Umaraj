
import React from 'react';
import { 
  LayoutDashboard, 
  FileEdit, 
  Wallet, 
  RotateCcw, 
  BookOpen, 
  BarChart3, 
  Settings, 
  LogOut,
  Monitor
} from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  activeView: View;
  onNavigate: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Sales Entry', icon: FileEdit },
    { label: 'Payments & Receipts', icon: Wallet },
    { label: 'Sales Returns', icon: RotateCcw },
    { label: 'Cashbook', icon: BookOpen },
    { label: 'Reports', icon: BarChart3 },
    { label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#1E5BB1] text-white flex flex-col shadow-2xl z-50 hidden lg:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-white rounded-lg p-2">
          <Monitor className="w-6 h-6 text-[#1E5BB1]" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">CSC Center</h2>
      </div>

      <nav className="flex-1 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.label;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.label as View)}
              className={`w-full flex items-center gap-3 px-6 py-3.5 transition-all duration-200 group ${
                isActive 
                  ? 'bg-white/15 border-r-4 border-white font-semibold' 
                  : 'hover:bg-white/10 text-white/80'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-white/70'}`} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center justify-center gap-2 border border-white/30 rounded-lg py-2.5 text-sm hover:bg-white/10 transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
