import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import api from '../lib/axios';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-nyx-blue/30 border-t-nyx-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!stats) return null;

  // Chart Data Preparation (Mock progression if DB is empty or mock)
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Total Scans',
        data: stats.isMock ? [1200, 1900, 1500, 2200, 1800, 2400, 2900] : [10, 15, 8, 12, 20, 25, stats.totalScans],
        fill: true,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        tension: 0.4,
      }
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false } }
    }
  };

  const safeCount = stats.totalScans - stats.threatsDetected;
  
  const pieChartData = {
    labels: ['Safe', 'Threats Detected'],
    datasets: [
      {
        data: [safeCount, stats.threatsDetected],
        backgroundColor: ['#10b981', '#f43f5e'],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  };

  const pieOptions = {
    cutout: '75%',
    plugins: {
      legend: { position: 'bottom', labels: { color: '#cbd5e1', padding: 20 } }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
          <Network className="w-8 h-8 text-nyx-blue" /> System Analytics
        </h1>
        <p className="text-slate-400 mt-2">Real-time metrics and global threat intelligence overview.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute top-4 right-4 bg-nyx-blue/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
             <Activity className="w-6 h-6 text-nyx-blue" />
          </div>
          <h3 className="text-slate-400 font-medium mb-1">Total Scans Performed</h3>
          <p className="text-4xl font-bold text-white">{stats.totalScans.toLocaleString()}</p>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute top-4 right-4 bg-red-500/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
             <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-slate-400 font-medium mb-1">Threats Intercepted</h3>
          <p className="text-4xl font-bold text-white">{stats.threatsDetected.toLocaleString()}</p>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group flex flex-col justify-center">
           <h3 className="text-slate-400 font-medium mb-1">System Health</h3>
           <div className="flex items-center gap-3 mt-2">
             <ShieldCheck className="w-8 h-8 text-emerald-400" />
             <span className="text-2xl font-bold text-emerald-400">Optimal</span>
           </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="md:col-span-2 bg-nyx-dark/50 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
          <h3 className="text-lg font-semibold text-white mb-6">Traffic Analysis</h3>
          <div className="h-[300px]">
            <Line data={lineChartData} options={lineOptions} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-nyx-dark/50 border border-white/5 rounded-2xl p-6 backdrop-blur-md flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Threat Distribution</h3>
          <div className="flex-grow flex items-center justify-center relative">
            <div className="h-[250px] w-full flex items-center justify-center relative">
               <Doughnut data={pieChartData} options={pieOptions} />
               <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none pb-8">
                  <span className="text-3xl font-bold text-white">{stats.isMock ? "3.4%" : ((stats.threatsDetected / stats.totalScans) * 100).toFixed(1) + "%"}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-widest">Risk Index</span>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
