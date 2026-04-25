import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'URL Scanner', path: '/scan' },
    { name: 'Password Analyzer', path: '/password' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <nav className="relative flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="w-8 h-8 text-nyx-blue transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-nyx-blue/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-xl font-bold tracking-wider text-white">Nyxecure</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-white ${
                      location.pathname === link.path ? 'text-nyx-blue' : 'text-slate-300'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/scan"
              className="px-5 py-2 text-sm font-medium text-white bg-nyx-blue hover:bg-blue-600 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all duration-300 hover:scale-105"
            >
              Scan Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-4 right-4 bg-nyx-dark/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl overflow-hidden md:hidden"
            >
              <ul className="flex flex-col p-4 gap-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2 rounded-lg transition-colors ${
                        location.pathname === link.path ? 'bg-nyx-blue/20 text-nyx-blue' : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/scan"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center mt-2 px-5 py-3 text-sm font-medium text-white bg-nyx-blue rounded-lg shadow-lg hover:bg-blue-600"
                  >
                    Scan Now
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
