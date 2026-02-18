import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Predictor from './components/Predictor';
import AiAgent from './components/AiAgent';
import Reports from './components/Reports';
import { trainModel } from './services/mlEngine';
import { loadChurnDatasets } from './services/datasetLoader';
import { CustomerData, BusinessMetrics, ModelMetrics, FeatureImportance } from './types';
import { Database, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [data, setData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics | null>(null);
  const [features, setFeatures] = useState<FeatureImportance[]>([]);
  
  // Initialize data and train model on mount
  useEffect(() => {
    const initialize = async () => {
      try {
        const loadedData = await loadChurnDatasets();
        setData(loadedData);

        const { metrics, features: impFeatures } = trainModel(loadedData);
        setModelMetrics(metrics);
        setFeatures(impFeatures);
      } catch (error) {
        console.error('Dataset loading failed:', error);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  // Calculate Aggregated Business Metrics
  const businessMetrics: BusinessMetrics = useMemo(() => {
    if (data.length === 0) return { totalUsers: 0, churnRate: 0, monthlyRevenue: 0, revenueLoss: 0, clv: 0 };
    
    const totalUsers = data.length;
    const churners = data.filter(u => u.churned === 1).length;
    const churnRate = parseFloat(((churners / totalUsers) * 100).toFixed(2));
    
    const monthlyRevenue = data.reduce((acc, curr) => acc + curr.monthlyCost, 0);
    const revenueLoss = data.filter(u => u.churned).reduce((acc, curr) => acc + curr.monthlyCost, 0);
    
    // Simple CLV formula: (Avg Monthly Revenue * Gross Margin) / Churn Rate
    // Assuming 70% gross margin
    const avgRevenue = monthlyRevenue / totalUsers;
    const clv = churnRate > 0 ? (avgRevenue * 0.7) / (churnRate / 100) : 0;

    return {
      totalUsers,
      churnRate,
      monthlyRevenue,
      revenueLoss: Math.round(revenueLoss),
      clv
    };
  }, [data]);

  if (loading) {
    return (
      <div className="bg-netflix-black h-screen w-full flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 size={48} className="animate-spin text-netflix-red" />
        <h2 className="text-xl font-bold tracking-widest">INITIALIZING STREAMGUARD</h2>
        <p className="text-gray-500 text-sm">Loading provided datasets and training ML models...</p>
      </div>
    );
  }

  return (
    <div className="bg-netflix-black min-h-screen text-gray-200 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="ml-64 p-8 min-h-screen">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <Database size={12} />
            <span>Dataset: {data.length.toLocaleString()} Records Loaded</span>
          </div>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-xs text-green-500 uppercase font-bold tracking-wider">System Operational</span>
          </div>
        </div>

        {currentView === 'dashboard' && modelMetrics && (
          <Dashboard 
            data={data} 
            businessMetrics={businessMetrics} 
            modelMetrics={modelMetrics} 
          />
        )}

        {currentView === 'analytics' && (
           <div className="h-full flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl p-20">
             <p>Advanced EDA Section (To be implemented - see Dashboard for primary visualizations)</p>
           </div>
        )}

        {currentView === 'predict' && <Predictor />}

        {currentView === 'agent' && modelMetrics && (
          <AiAgent 
            businessMetrics={businessMetrics} 
            modelMetrics={modelMetrics} 
            features={features}
          />
        )}

        {currentView === 'report' && <Reports />}
      </main>
    </div>
  );
};

export default App;
