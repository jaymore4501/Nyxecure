import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText/DecryptedText';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <motion.section 
        className="w-full min-h-[70vh] flex flex-col justify-center items-center text-center py-20 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-nyx-purple/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute inset-0 top-1/3 left-1/3 w-[400px] h-[400px] bg-nyx-blue/20 rounded-full blur-[100px] -z-10"></div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-nyx-blue to-nyx-purple">
            <DecryptedText text="Nyxecure" speed={60} maxIterations={15} />
          </span>
        </h1>
        
        <div className="text-xl md:text-2xl text-slate-300 font-light mb-10 max-w-2xl">
          <DecryptedText text="Detect Threats. Strengthen Security." speed={40} maxIterations={12} animateOn="view" />
          <p className="mt-4 text-base md:text-lg text-slate-400">
            Advanced heuristics and AI-driven analysis to protect your digital presence against modern attacks.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link to="/scan" className="px-8 py-4 bg-nyx-blue/90 hover:bg-nyx-blue text-white rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] font-semibold transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group">
            <ShieldCheck className="w-5 h-5 group-hover:animate-pulse" />
            Scan URL
          </Link>
          <Link to="/password" className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 text-white rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group">
            <Lock className="w-5 h-5" />
            Check Password
          </Link>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="w-full py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-3xl font-bold text-center mb-16 text-white">
          <DecryptedText text="Core Capabilities" speed={50} animateOn="view" />
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-nyx-blue/50 transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-nyx-blue/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7 text-nyx-blue" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Phishing Detection</h3>
            <p className="text-slate-400">Instantly analyze suspicious links with our advanced heuristics engine detecting dangerous patterns.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-nyx-purple/50 transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-nyx-purple/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lock className="w-7 h-7 text-nyx-purple" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Password Analyzer</h3>
            <p className="text-slate-400">Real-time strength checking and crack time estimation utilizing industry-standard zxcvbn algorithms.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Global Dashboard</h3>
            <p className="text-slate-400">Monitor system-wide metrics and view analytical visualisations of recent threats detected globally.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* How it Works */}
      <section className="w-full py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-white">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-[15%] left-[20%] w-[60%] h-[2px] bg-gradient-to-r from-nyx-blue/20 via-nyx-purple/50 to-nyx-blue/20 -z-10"></div>
          
          <div className="text-center relative">
            <div className="w-12 h-12 rounded-full border-2 border-nyx-blue bg-nyx-dark flex items-center justify-center mx-auto mb-6 text-xl font-bold text-nyx-blue">1</div>
            <h4 className="text-lg font-semibold text-white mb-2">Input Target</h4>
            <p className="text-slate-400 text-sm">Provide the URL or Password you want to analyze.</p>
          </div>
          <div className="text-center relative">
            <div className="w-12 h-12 rounded-full border-2 border-nyx-purple bg-nyx-dark flex items-center justify-center mx-auto mb-6 text-xl font-bold text-nyx-purple">2</div>
            <h4 className="text-lg font-semibold text-white mb-2">Deep Scan</h4>
            <p className="text-slate-400 text-sm">Our backend engine cross-references and computes the risk score.</p>
          </div>
          <div className="text-center relative">
            <div className="w-12 h-12 rounded-full border-2 border-emerald-500 bg-nyx-dark flex items-center justify-center mx-auto mb-6 text-xl font-bold text-emerald-500">3</div>
            <h4 className="text-lg font-semibold text-white mb-2">Get Report</h4>
            <p className="text-slate-400 text-sm">Receive instant, actionable feedback and crack-time metrics.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
