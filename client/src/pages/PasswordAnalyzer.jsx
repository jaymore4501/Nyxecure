import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, KeyRound, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import api from '../lib/axios';
import { toast } from 'sonner';

const PasswordAnalyzer = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!password) {
      setResult(null);
      return;
    }

    const timer = setTimeout(() => {
      analyzePassword(password);
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [password]);

  const analyzePassword = async (pass) => {
    setLoading(true);
    try {
      const res = await api.post('/scan/password', { password: pass });
      setResult(res.data);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to analyze password');
    } finally {
      setLoading(false);
    }
  };

  const strengthColors = [
    'from-red-500 to-red-600',
    'from-orange-500 to-orange-600',
    'from-yellow-400 to-yellow-500',
    'from-emerald-400 to-emerald-500',
    'from-nyx-blue to-nyx-purple'
  ];

  const getPercentage = (score) => {
    return ((score + 1) / 5) * 100;
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 flex flex-col items-center">
      <div className="text-center mb-10 w-full">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <KeyRound className="w-10 h-10 text-nyx-purple" />
          Password Analyzer
        </h1>
        <p className="text-slate-400">Real-time strength checking and advanced crack time estimation.</p>
      </div>

      <motion.div 
        className="w-full relative group mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Lock className="w-6 h-6 text-slate-500 group-focus-within:text-nyx-purple transition-colors" />
        </div>
        <input 
          type={showPassword ? "text" : "password"} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a secure password..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-16 text-xl text-white placeholder-slate-500 focus:outline-none focus:border-nyx-purple/50 focus:ring-1 focus:ring-nyx-purple/50 backdrop-blur-xl shadow-xl transition-all font-mono"
        />
        <button 
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
        </button>
      </motion.div>

      {/* Progress Bar Container */}
      <div className="w-full h-3 bg-nyx-dark/50 rounded-full mb-8 overflow-hidden border border-white/5">
        <motion.div 
          className={`h-full rounded-full bg-gradient-to-r ${result ? strengthColors[result.score] : 'from-transparent to-transparent'}`}
          initial={{ width: 0 }}
          animate={{ width: result ? `${getPercentage(result.score)}%` : '0%' }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {loading && !result && (
        <div className="flex items-center gap-2 text-slate-400 mb-8">
          <Loader2 className="w-5 h-5 animate-spin text-nyx-purple" />
          Analyzing encryption matrix...
        </div>
      )}

      {result && (
        <motion.div 
          className="w-full grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Main Stats Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-nyx-purple/10 rounded-full blur-[50px] transition-all group-hover:bg-nyx-purple/20"></div>
            <h3 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Overall Strength</h3>
            <div className="text-3xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
               {result.strength}
            </div>
            
            <h3 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Estimated Crack Time</h3>
            <div className="text-xl font-mono text-nyx-purple flex items-center gap-2">
               {result.crackTime === "centuries" ? "Centuries 🛡️" : result.crackTime}
            </div>
          </div>

          {/* Feedback Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl flex flex-col justify-center">
            <h3 className="text-sm text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> AI Diagnostics
            </h3>
            
            {result.feedback && result.feedback.warning ? (
              <div className="text-yellow-400/90 text-lg mb-2 font-medium">
                {result.feedback.warning}
              </div>
            ) : (
                <div className="text-emerald-400/90 text-lg mb-2 font-medium flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Excellent composition
                </div>
            )}
            
            {result.feedback && result.feedback.suggestions && result.feedback.suggestions.length > 0 && (
              <ul className="text-slate-300 text-sm space-y-2 mt-4 list-disc pl-4">
                {result.feedback.suggestions.map((sug, i) => (
                  <li key={i}>{sug}</li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PasswordAnalyzer;
