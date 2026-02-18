import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { getGeminiInsights } from '../services/geminiService';
import { BusinessMetrics, ModelMetrics, FeatureImportance } from '../types';

interface AiAgentProps {
  businessMetrics: BusinessMetrics;
  modelMetrics: ModelMetrics;
  features: FeatureImportance[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AiAgent: React.FC<AiAgentProps> = ({ businessMetrics, modelMetrics, features }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello. I am the StreamGuard Business Intelligence Agent. I have analyzed your 5,000+ user dataset. Ask me about churn trends, high-risk segments, or retention strategies." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const response = await getGeminiInsights(businessMetrics, modelMetrics, features, userMsg);

    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "Why is churn increasing this month?",
    "What is the most critical risk factor?",
    "Suggest a strategy for Premium users.",
    "How can we improve CLV?"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px] bg-netflix-gray/30 rounded-xl border border-white/5 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-netflix-gray bg-netflix-black/50 flex items-center gap-3">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
          <Bot size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-white font-bold">Business Intelligence Agent</h3>
          <p className="text-xs text-gray-400">Powered by Gemini AI • Real-time Data Context</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'assistant' ? 'bg-indigo-600' : 'bg-gray-600'
            }`}>
              {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'assistant' 
                ? 'bg-netflix-gray text-gray-100 rounded-tl-none' 
                : 'bg-netflix-red text-white rounded-tr-none'
            }`}>
              <div className="prose prose-invert text-sm whitespace-pre-line leading-relaxed">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-netflix-gray p-4 rounded-2xl rounded-tl-none">
              <Loader2 className="animate-spin text-gray-400" size={20} />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Suggestions */}
      {messages.length < 3 && (
        <div className="px-6 py-2 overflow-x-auto flex gap-2 no-scrollbar">
          {suggestedQuestions.map((q, i) => (
            <button 
              key={i} 
              onClick={() => setInput(q)}
              className="whitespace-nowrap bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-300 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-netflix-gray bg-netflix-black/50">
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask specific questions about churn drivers or revenue..."
            className="w-full bg-netflix-black border border-netflix-gray rounded-xl pl-4 pr-12 py-4 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute right-2 top-2 p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white rounded-lg transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-600 mt-2">
          AI can make mistakes. Consider checking important info.
        </p>
      </div>
    </div>
  );
};

export default AiAgent;