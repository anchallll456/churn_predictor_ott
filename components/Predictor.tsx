import React, { useState } from 'react';
import { analyzeCustomer } from '../services/mlEngine';
import { CustomerData, PredictionResult, SubscriptionType } from '../types';
import { AlertTriangle, CheckCircle, AlertOctagon, RefreshCw } from 'lucide-react';

const Predictor: React.FC = () => {
  const [formData, setFormData] = useState<Partial<CustomerData>>({
    age: 30,
    subscriptionType: SubscriptionType.Standard,
    tenureMonths: 12,
    watchTimeHrsPerWeek: 10,
    supportCalls: 0,
    lastLoginDaysAgo: 2,
    monthlyCost: 14.99,
    engagementScore: 75
  });

  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'subscriptionType' ? value : Number(value)
    }));
  };

  const handlePredict = () => {
    // Recalculate basic engagement score for the simulation
    const engagement = Math.min(100, Math.max(0, 
      ((formData.watchTimeHrsPerWeek || 0) * 1.5) - ((formData.lastLoginDaysAgo || 0) * 2) + 50
    ));
    
    const dataToPredict = { ...formData, engagementScore: engagement };
    const prediction = analyzeCustomer(dataToPredict);
    setResult(prediction);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* INPUT FORM */}
      <div className="bg-netflix-gray/30 p-8 rounded-xl border border-white/5 backdrop-blur-sm h-fit">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <RefreshCw className="text-netflix-red" /> Live Churn Simulator
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Age</label>
            <input 
              type="number" name="age" value={formData.age} onChange={handleInputChange}
              className="w-full bg-netflix-black border border-netflix-gray rounded-md p-3 text-white focus:border-netflix-red outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Subscription Plan</label>
            <select 
              name="subscriptionType" value={formData.subscriptionType} onChange={handleInputChange}
              className="w-full bg-netflix-black border border-netflix-gray rounded-md p-3 text-white focus:border-netflix-red outline-none transition-colors"
            >
              <option value={SubscriptionType.Basic}>Basic ($9.99)</option>
              <option value={SubscriptionType.Standard}>Standard ($14.99)</option>
              <option value={SubscriptionType.Premium}>Premium ($19.99)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Tenure (Months)</label>
            <input 
              type="number" name="tenureMonths" value={formData.tenureMonths} onChange={handleInputChange}
              className="w-full bg-netflix-black border border-netflix-gray rounded-md p-3 text-white focus:border-netflix-red outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Weekly Watch Time (Hours)</label>
            <input 
              type="number" name="watchTimeHrsPerWeek" value={formData.watchTimeHrsPerWeek} onChange={handleInputChange}
              className="w-full bg-netflix-black border border-netflix-gray rounded-md p-3 text-white focus:border-netflix-red outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Customer Support Calls (Lifetime)</label>
            <input 
              type="number" name="supportCalls" value={formData.supportCalls} onChange={handleInputChange}
              className="w-full bg-netflix-black border border-netflix-gray rounded-md p-3 text-white focus:border-netflix-red outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Days Since Last Login</label>
            <input 
              type="number" name="lastLoginDaysAgo" value={formData.lastLoginDaysAgo} onChange={handleInputChange}
              className="w-full bg-netflix-black border border-netflix-gray rounded-md p-3 text-white focus:border-netflix-red outline-none transition-colors"
            />
          </div>
        </div>

        <button 
          onClick={handlePredict}
          className="w-full mt-8 bg-netflix-red hover:bg-red-700 text-white font-bold py-4 rounded-md transition-all shadow-lg shadow-red-900/40"
        >
          PREDICT CHURN PROBABILITY
        </button>
      </div>

      {/* RESULTS */}
      <div className="flex flex-col justify-center">
        {result ? (
          <div className="bg-netflix-gray/30 p-8 rounded-xl border border-white/5 backdrop-blur-sm animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Analysis Result</h3>
              <RiskBadge level={result.riskLevel} />
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle cx="64" cy="64" r="60" stroke="#333" strokeWidth="8" fill="transparent" />
                  <circle cx="64" cy="64" r="60" stroke={getRiskColor(result.riskLevel)} strokeWidth="8" fill="transparent" strokeDasharray={377} strokeDashoffset={377 - (377 * result.probability)} className="transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute text-2xl font-bold text-white">{(result.probability * 100).toFixed(0)}%</div>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Probability of Churn</p>
                <p className="text-white text-lg leading-tight mt-1">
                  This user is <span className="font-bold text-white">{result.riskLevel} Risk</span>.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Key Risk Factors</h4>
                <ul className="space-y-2">
                  {result.factors.length > 0 ? result.factors.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/90 text-sm">
                      <AlertTriangle size={16} className="text-yellow-500 mt-0.5 shrink-0" /> {f}
                    </li>
                  )) : (
                    <li className="flex items-start gap-2 text-white/90 text-sm">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" /> User shows healthy engagement patterns.
                    </li>
                  )}
                </ul>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-netflix-red">
                <h4 className="text-sm font-bold text-white mb-1">Recommended Strategy</h4>
                <p className="text-gray-300 text-sm">{result.recommendation}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500 border-2 border-dashed border-gray-800 rounded-xl">
            <RefreshCw size={48} className="mb-4 opacity-50" />
            <p className="text-lg">Enter customer details to simulate ML inference.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const getRiskColor = (level: string) => {
  switch (level) {
    case 'Critical': return '#E50914';
    case 'High': return '#F97316';
    case 'Medium': return '#EAB308';
    default: return '#22C55E';
  }
};

const RiskBadge = ({ level }: { level: string }) => {
  const colorClass = 
    level === 'Critical' ? 'bg-red-500/20 text-red-500 border-red-500/50' :
    level === 'High' ? 'bg-orange-500/20 text-orange-500 border-orange-500/50' :
    level === 'Medium' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' :
    'bg-green-500/20 text-green-500 border-green-500/50';

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colorClass} flex items-center gap-1`}>
      {level === 'Critical' && <AlertOctagon size={12} />}
      {level.toUpperCase()}
    </span>
  );
};

export default Predictor;