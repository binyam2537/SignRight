import React from 'react';
import { Target, Trophy, Faders, Student, ChatCenteredText } from 'phosphor-react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useUser();
  const isActive = (path: string) => location.pathname === path;

  // Learn is active on / or /learn
  const isLearnActive = isActive('/learn') || isActive('/');

  return (
    <nav className="hidden md:flex flex-col w-20 lg:w-64 h-full bg-[#101c22] border-r border-gray-800 p-4 shrink-0 z-50 transition-all font-sans">
      
      {/* 1. Logo Section */}
      <Link to="/learn" className="px-2 py-4 mb-0 flex items-end gap-2 justify-center lg:justify-start group cursor-pointer block">
        <span 
          className="material-symbols-outlined text-4xl text-accent-primary drop-shadow-[0_2px_0_rgba(0,0,0,0.5)] group-hover:rotate-12 transition-transform" 
          style={{
            color: '#37BBF5',
            fontSize: '1.65rem',
          }}
        >
          sign_language
        </span>
        <h1 
            className="hidden lg:block font-black text-xl mb-1 tracking-tighter text-white select-none" 
            style={{ 
                fontFamily: 'monospace', 
                fontWeight: 600, 
                letterSpacing: '0.75px', 
                fontSize: '1.5rem', 
                color: '#FFFFFF' 
            }}
        >
          SignRight
        </h1>
      </Link>

      {/* 2. Primary Navigation Button (LEARN) */}
      <div className="mb-4 mt-6">
        <Link to="/learn">
           <div className={`
             relative rounded-xl border-2 transition-all duration-200 group overflow-hidden
             ${isLearnActive 
               ? 'bg-[#1F2937] border-gray-700 shadow-md' 
               : 'border-transparent hover:bg-gray-800/50'
             }
           `}>
             <div className="px-4 py-3 flex items-center gap-4">
               <Student 
                 weight="fill" 
                 size={24} 
                 className={`${isLearnActive ? 'text-accent-primary' : 'text-gray-500 group-hover:text-accent-primary'} transition-colors`}
               />
               <span className={`
                 hidden lg:block font-extrabold text-sm tracking-widest uppercase
                 ${isLearnActive ? 'text-accent-primary' : 'text-gray-500 group-hover:text-white'}
               `}>
                 Learn
               </span>
             </div>
             {/* Active Indicator Bar */}
             {isLearnActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary"></div>}
           </div>
        </Link>
      </div>

      {/* 3. Secondary Navigation Links */}
      <div className="flex-1 flex flex-col gap-2">
        <SidebarLink 
            to="/phrases" 
            label="PHRASES" 
            active={isActive('/phrases')} 
            icon={<ChatCenteredText weight="fill" size={24} />} 
        />
        <SidebarLink 
            to="/dojo" 
            label="PRACTICE" 
            active={isActive('/dojo')} 
            icon={<Target weight="fill" size={24} />} 
        />
        <SidebarLink 
            to="/leaderboard" 
            label="LEADERBOARD" 
            active={isActive('/leaderboard')} 
            icon={<Trophy weight="fill" size={24} />} 
        />
        <SidebarLink 
            to="/dashboard" 
            label="PERFORMANCE" 
            active={isActive('/dashboard')} 
            icon={<Faders weight="fill" size={24} />} 
        />
      </div>

      {/* 4. User Footer */}
      <div className="mt-auto pt-4 border-t border-gray-800">
         <Link to="/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-800 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-[#FFE4B5] border-2 border-gray-700 overflow-hidden shrink-0 shadow-sm">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed}`} alt="User" className="w-full h-full" />
            </div>
            <div className="hidden lg:flex flex-col overflow-hidden">
               <span className="text-white font-bold text-sm truncate group-hover:text-accent-primary transition-colors">{user.name}</span>
               <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Level {user.level}</span>
            </div>
         </Link>
      </div>
    </nav>
  );
};

// Simplified Link Component
const SidebarLink: React.FC<{to: string, icon: React.ReactNode, label: string, active: boolean}> = ({ to, icon, label, active }) => (
  <Link 
    to={to} 
    className={`
      flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
      ${active 
        ? 'bg-gray-800 text-accent-primary shadow-sm' 
        : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
      }
    `}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary"></div>}
    <div className={`transition-transform group-hover:scale-110 ${active ? 'text-accent-primary' : 'text-gray-500 group-hover:text-gray-300'}`}>
       {icon}
    </div>
    <span className="hidden lg:block font-extrabold text-xs tracking-widest uppercase">
       {label}
    </span>
  </Link>
);

export default Sidebar;