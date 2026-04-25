import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import UrlScanner from './pages/UrlScanner';
import PasswordAnalyzer from './pages/PasswordAnalyzer';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col pt-24">
        <Navbar />
        <main className="flex-grow container mx-auto px-4">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/scan" element={<UrlScanner />} />
            <Route path="/password" element={<PasswordAnalyzer />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
