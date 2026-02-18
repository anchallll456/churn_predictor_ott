import React from 'react';
import { FileCode, Server, Database, GitBranch, Terminal } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      <div className="bg-netflix-gray/30 p-8 rounded-xl border border-white/5 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-white mb-4">Project Documentation</h2>
        <div className="prose prose-invert max-w-none">
          <h3 className="text-xl font-bold text-netflix-red">Business Problem</h3>
          <p className="text-gray-300">
            The OTT platform faces a high churn rate of approximately 15%, leading to significant monthly revenue leakage. 
            The goal of this project is to identify at-risk users early using machine learning and provide actionable 
            retention strategies to the marketing team, ultimately aiming to reduce churn by 5%.
          </p>

          <h3 className="text-xl font-bold text-netflix-red mt-6">Technical Architecture</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="bg-black/40 p-4 rounded border border-white/10">
              <h4 className="flex items-center gap-2 font-bold text-white mb-2"><Database size={16}/> Data Layer</h4>
              <p className="text-sm text-gray-400">Generated 10,000+ row synthetic dataset with realistic correlations (Watch time vs Churn, Price sensitivity).</p>
            </div>
            <div className="bg-black/40 p-4 rounded border border-white/10">
              <h4 className="flex items-center gap-2 font-bold text-white mb-2"><GitBranch size={16}/> ML Pipeline</h4>
              <p className="text-sm text-gray-400">Logistic Regression/Random Forest Hybrid. Key features: Engagement Score, Support Calls, Tenure.</p>
            </div>
            <div className="bg-black/40 p-4 rounded border border-white/10">
              <h4 className="flex items-center gap-2 font-bold text-white mb-2"><FileCode size={16}/> Frontend</h4>
              <p className="text-sm text-gray-400">React 18, TypeScript, Tailwind CSS, Recharts. Component-based architecture with Client-Side inference.</p>
            </div>
            <div className="bg-black/40 p-4 rounded border border-white/10">
              <h4 className="flex items-center gap-2 font-bold text-white mb-2"><Server size={16}/> AI Integration</h4>
              <p className="text-sm text-gray-400">Google Gemini API acting as a semantic reasoning layer for executive summary generation.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-netflix-gray/30 p-8 rounded-xl border border-white/5 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-6">Deployment Guide</h2>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-white">1</div>
            <div>
              <h4 className="text-lg font-bold text-white">Prerequisites</h4>
              <p className="text-gray-400 text-sm mt-1">Node.js v16+, NPM, and a Google Gemini API Key.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-white">2</div>
            <div>
              <h4 className="text-lg font-bold text-white">Local Setup</h4>
              <div className="bg-black p-4 rounded mt-2 font-mono text-sm text-green-400 flex items-center gap-2">
                <Terminal size={14} />
                <span>npm install && npm start</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-white">3</div>
            <div>
              <h4 className="text-lg font-bold text-white">Production Build</h4>
              <p className="text-gray-400 text-sm mt-1">Create optimized static assets.</p>
              <div className="bg-black p-4 rounded mt-2 font-mono text-sm text-green-400">
                npm run build
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-white">4</div>
            <div>
              <h4 className="text-lg font-bold text-white">Deploy to Vercel/Netlify</h4>
              <p className="text-gray-400 text-sm mt-1">
                Push code to GitHub. Connect repository to Vercel. 
                <br/><strong>Important:</strong> Add `REACT_APP_GEMINI_API_KEY` to Environment Variables in Vercel settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;