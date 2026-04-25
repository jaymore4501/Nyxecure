import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldAlert, Link as LinkIcon, Loader2, CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
import api from '../lib/axios';
import { toast } from 'sonner';

const UrlScanner = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) {
      toast.error('Please enter a URL to scan.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await api.post('/scan/url', { url });
      setResult(res.data);
      toast.success('Analysis complete');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to scan URL');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Safe') return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10';
    if (status === 'Suspicious') return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
    if (status === 'Dangerous') return 'text-red-500 border-red-500/30 bg-red-500/10';
    return 'text-white border-white/20 bg-white/5';
  };

  const getStatusIcon = (status) => {
    if (status === 'Safe') return <CheckCircle className="w-8 h-8 text-emerald-400" />;
    if (status === 'Suspicious') return <AlertTriangle className="w-8 h-8 text-yellow-400" />;
    if (status === 'Dangerous') return <AlertOctagon className="w-8 h-8 text-red-500" />;
    return null;
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 flex flex-col items-center">
      <div className="text-center mb-10 w-full">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <ShieldAlert className="w-10 h-10 text-nyx-blue" />
          Phishing URL Detector
        </h1>
        <p className="text-slate-400">Analyze any link for malicious patterns, missing encryption, and suspicious heuristics.</p>
      </div>

      <motion.form 
        onSubmit={handleScan}
        className="w-full relative group mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <LinkIcon className="w-6 h-6 text-slate-500 group-focus-within:text-nyx-blue transition-colors" />
        </div>
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/login"
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-40 text-lg text-white placeholder-slate-500 focus:outline-none focus:border-nyx-blue/50 focus:ring-1 focus:ring-nyx-blue/50 backdrop-blur-xl shadow-xl transition-all"
        />
        <button 
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 bg-nyx-blue hover:bg-blue-600 text-white px-6 rounded-xl font-semibold flex items-center gap-2 transition-all disabled:opacity-50 disabled:hover:scale-100 hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          {loading ? 'Analyzing...' : 'Analyze URL'}
        </button>
      </motion.form>

      {result && (
        <motion.div 
          className={`w-full p-8 rounded-2xl border backdrop-blur-xl ${getStatusColor(result.status)} shadow-2xl relative overflow-hidden`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-current opacity-5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 border-b border-current pb-8 border-opacity-20">
            <div className="flex items-center gap-4">
              {getStatusIcon(result.status)}
              <div>
                <h3 className="text-3xl font-bold uppercase tracking-wide">{result.status}</h3>
                <p className="opacity-80 mt-1">Target URL Risk Assessment</p>
              </div>
            </div>
            <div className="text-center relative">
               <div className="text-5xl font-black">{result.score}<span className="text-xl opacity-70">/100</span></div>
               <div className="text-sm tracking-widest uppercase opacity-70 mt-1">Risk Score</div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" /> Detailed Analysis Flags:
            </h4>
            <ul className="space-y-3">
              {result.reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-nyx-dark/40 p-4 rounded-xl border border-white/5">
                  <div className="mt-1 flex-shrink-0">
                     {result.status === 'Safe' ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-current opacity-80" />}
                  </div>
                  <span className="text-slate-200">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UrlScanner;
