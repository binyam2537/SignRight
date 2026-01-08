import React from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <header className="md:hidden w-full p-4 flex justify-between items-center bg-gray-900 border-b border-gray-800 shrink-0">
       <div className="flex items-center gap-2 text-white">
          <span className="material-symbols-outlined text-2xl text-accent-primary drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]">sign_language</span>
          <span className="font-bold tracking-wider">Learn2Sign</span>
       </div>
       <Link to="/dojo" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
          Practice
       </Link>
    </header>
  );
};

export default Nav;