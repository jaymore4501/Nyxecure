import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full mt-20 border-t border-white/10 bg-white/5 backdrop-blur-md">
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-center gap-2">
        <p className="text-sm text-slate-400">
          &copy; 2026 Nyxecure. All rights reserved. Built for educational purposes.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
