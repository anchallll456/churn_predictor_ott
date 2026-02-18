import React from 'react';
import { LayoutDashboard, Activity, Search, BrainCircuit, FileText } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Data Analytics', icon: Activity },
    { id: 'predict', label: 'Churn Predictor', icon: Search },
    { id: 'agent', label: 'AI Business Agent', icon: BrainCircuit },
    { id: 'report', label: 'Project Report', icon: FileText },
  ];

  return (
    <div className="w-64 h-screen bg-netflix-black border-r border-netflix-gray flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6">
        <h1 className="text-netflix-red text-2xl font-bold tracking-tighter">STREAMGUARD</h1>
        <p className="text-gray-500 text-xs mt-1">OTT ANALYTICS SUITE</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                isActive 
                  ? 'bg-netflix-red text-white font-medium shadow-lg shadow-red-900/20' 
                  : 'text-gray-400 hover:bg-netflix-gray hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-netflix-gray">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600"></div>
          <div>
            <p className="text-sm text-white font-medium">Admin User</p>
            <p className="text-xs text-gray-500">Lead Data Scientist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;