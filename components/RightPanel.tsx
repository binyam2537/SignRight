import React from 'react';
import { Fire, ShieldCheck, Trophy, Lightning } from 'phosphor-react';
import { MOCK_LEADERBOARD } from '../constants';

const RightPanel: React.FC = () => {
  // Find user's XP from mock data
  const userXP = MOCK_LEADERBOARD.find(u => u.name === "You")?.xp || 0;

  return (
    <div className="hidden xl:flex flex-col w-80 h-full bg-app-bg p-6 gap-6 overflow-y-auto shrink-0 border-l border-gray-800">
      
      {/* Top Stats Cards - Grid Layout */}
      <div className="grid grid-cols-2 gap-4">
         {/* Streak Card */}
         <div className="border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 aspect-square hover:bg-gray-800/30 transition-colors cursor-default">
            <Fire weight="fill" className="text-orange-500 mb-2" size={32} />
            <span className="text-3xl font-black text-white leading-none">12</span>
            <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-1">Day Streak</span>
         </div>

         {/* XP Card */}
         <div className="border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 aspect-square hover:bg-gray-800/30 transition-colors cursor-default">
            <Lightning weight="fill" className="text-yellow-400 mb-2" size={32} />
            <span className="text-3xl font-black text-white leading-none">{userXP}</span>
            <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-1">Total XP</span>
         </div>
      </div>

      {/* League Status Card */}
      <div className="border border-gray-800 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-white text-md">League Status</h3>
            <span className="text-xs font-black text-yellow-500 uppercase">Gold</span>
        </div>
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 rounded-xl bg-gray-800 flex items-center justify-center border-2 border-gray-700 shadow-inner">
              <ShieldCheck weight="fill" className="text-gray-600" size={32} />
           </div>
           <p className="text-sm text-gray-500 font-medium leading-tight">Top 10 to advance.<br/><span className="text-white font-bold">You are #4</span></p>
        </div>
      </div>

      {/* Mini Leaderboard Card (Replacing Quests) */}
      <div className="border border-gray-800 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
           <h3 className="font-bold text-white text-md">Top Signers</h3>
           <Trophy weight="fill" className="text-yellow-500" />
        </div>
        
        <div className="flex flex-col gap-3">
           {MOCK_LEADERBOARD.slice(0, 3).map((entry) => (
             <div key={entry.rank} className="flex items-center gap-3 text-sm">
                {/* Avatar Logic: Handle URL vs Initials */}
                {entry.avatar.startsWith('http') ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600 bg-[#FFE4B5] shrink-0">
                        <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border shrink-0
                        ${entry.rank === 1 ? 'bg-yellow-500 border-yellow-600 text-yellow-900' : 'bg-gray-700 border-gray-600 text-gray-300'}
                    `}>
                        {entry.avatar}
                    </div>
                )}

                <div className="flex-1 font-bold text-gray-400 truncate">{entry.name}</div>
                <div className="font-mono font-bold text-gray-500">{entry.xp} XP</div>
             </div>
           ))}
        </div>
        
        <div className="w-full h-px bg-gray-800 my-1"></div>
        
        <div className="text-center">
            <span className="text-xs font-bold text-accent-primary uppercase hover:text-white cursor-pointer transition-colors">View League</span>
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-gray-600 justify-center">
         <span className="hover:text-gray-400 cursor-pointer">ABOUT</span>
         <span className="hover:text-gray-400 cursor-pointer">BLOG</span>
         <span className="hover:text-gray-400 cursor-pointer">STORE</span>
         <span className="hover:text-gray-400 cursor-pointer">CAREERS</span>
         <span className="hover:text-gray-400 cursor-pointer">PRIVACY</span>
      </div>
    </div>
  );
};

export default RightPanel;