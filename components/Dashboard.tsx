import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell
} from 'recharts';
import { BusinessMetrics, CustomerData, ModelMetrics, SubscriptionType } from '../types';
import { ArrowDown, ArrowUp, DollarSign, Users, UserMinus, Activity } from 'lucide-react';

interface DashboardProps {
  data: CustomerData[];
  businessMetrics: BusinessMetrics;
  modelMetrics: ModelMetrics;
}

const Dashboard: React.FC<DashboardProps> = ({ data, businessMetrics, modelMetrics }) => {
  
  // Prepare Chart Data
  const churnByPlan = [
    { name: 'Basic', churn: data.filter(d => d.subscriptionType === SubscriptionType.Basic && d.churned).length },
    { name: 'Standard', churn: data.filter(d => d.subscriptionType === SubscriptionType.Standard && d.churned).length },
    { name: 'Premium', churn: data.filter(d => d.subscriptionType === SubscriptionType.Premium && d.churned).length },
  ];

  const trendData = [
    { month: 'Jan', rate: 12 },
    { month: 'Feb', rate: 13 },
    { month: 'Mar', rate: 12.5 },
    { month: 'Apr', rate: 14 },
    { month: 'May', rate: 15.2 }, // Spike simulated
    { month: 'Jun', rate: businessMetrics.churnRate },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white">Executive Overview</h2>
          <p className="text-gray-400 mt-1">Real-time churn monitoring and revenue impact.</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Model Accuracy</span>
          <div className="text-xl font-bold text-green-500">{(modelMetrics.accuracy * 100).toFixed(1)}%</div>
        </div>
      </header>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Total Users" 
          value={businessMetrics.totalUsers.toLocaleString()} 
          icon={Users}
          trend="+2.4%"
          trendUp={true}
        />
        <KpiCard 
          title="Churn Rate" 
          value={`${businessMetrics.churnRate}%`} 
          icon={UserMinus}
          trend="+1.2%"
          trendUp={false} // Bad trend
          color="text-netflix-red"
        />
        <KpiCard 
          title="Revenue Loss (Mo)" 
          value={`$${businessMetrics.revenueLoss.toLocaleString()}`} 
          icon={DollarSign}
          trend="-$12k"
          trendUp={false}
          color="text-orange-500"
        />
        <KpiCard 
          title="Avg CLV" 
          value={`$${businessMetrics.clv.toFixed(0)}`} 
          icon={Activity}
          trend="+5%"
          trendUp={true}
          color="text-blue-500"
        />
      </div>

      {/* CHARTS ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        <div className="lg:col-span-2 bg-netflix-gray/30 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4">Churn Rate Trend (6 Months)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E50914" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#E50914" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#141414', border: '1px solid #333' }}
                itemStyle={{ color: '#E50914' }}
              />
              <Area type="monotone" dataKey="rate" stroke="#E50914" fillOpacity={1} fill="url(#colorRate)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-netflix-gray/30 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4">Churn by Plan</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={churnByPlan}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
              <XAxis dataKey="name" stroke="#888" />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ backgroundColor: '#141414', border: '1px solid #333' }}
              />
              <Bar dataKey="churn" radius={[4, 4, 0, 0]}>
                {churnByPlan.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#E50914' : '#FCA5A5'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Helper Component for KPI Cards
const KpiCard = ({ title, value, icon: Icon, trend, trendUp, color = "text-white" }: any) => (
  <div className="bg-netflix-gray/30 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-all backdrop-blur-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg bg-white/5 ${color}`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${trendUp ? 'text-green-500' : 'text-netflix-red'}`}>
        {trendUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        {trend}
      </div>
    </div>
    <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold text-white mt-1">{value}</p>
  </div>
);

export default Dashboard;