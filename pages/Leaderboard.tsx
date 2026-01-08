import React, { useState } from 'react';
import { MOCK_LEADERBOARD } from '../constants';
import { Trophy, CaretUp, SketchLogo, Clock } from 'phosphor-react';

const Leaderboard: React.FC = () => {
  const [filter, setFilter] = useState<'friends' | 'global'>('friends');

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col pt-10 pb-20 px-6">
      
      {/* 1. Sapphire League Banner (Was Amethyst) */}
      <div className="bg-[#1e40af] rounded-3xl p-6 md:p-8 mb-6 relative overflow-hidden shadow-lg border-b-4 border-[#1e3a8a] flex items-center justify-between group">
         <div className="relative z-10 flex-1">
             <div className="flex items-center gap-3 mb-2">
                 <span className="bg-white/20 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">Weekly Challenge</span>
                 <span className="flex items-center gap-1 text-white/80 text-[10px] font-bold uppercase tracking-widest">
                    <Clock weight="fill" /> 4 Days Left
                 </span>
             </div>
             
             <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Sapphire League</h2>
             <p className="text-white/90 text-sm font-medium max-w-md">
                 Finish in the top 10 to advance to the next league! You're currently safe.
             </p>
         </div>

         <div className="hidden md:block relative z-10 mr-4 transform group-hover:scale-110 transition-transform duration-500">
             <SketchLogo weight="fill" className="text-white drop-shadow-md opacity-90" size={100} />
         </div>

         {/* Decorative BG shapes */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* 2. Filter Section */}
      <div className="flex justify-end mb-6">
          <div className="flex bg-gray-800/50 p-1 rounded-xl border border-gray-700">
              <button 
                onClick={() => setFilter('friends')}
                className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all
                    ${filter === 'friends' 
                        ? 'bg-accent-primary text-white shadow-md' 
                        : 'text-gray-500 hover:text-gray-300'}
                `}
              >
                  Friends
              </button>
              <button 
                onClick={() => setFilter('global')}
                className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all
                    ${filter === 'global' 
                        ? 'bg-accent-primary text-white shadow-md' 
                        : 'text-gray-500 hover:text-gray-300'}
                `}
              >
                  Global
              </button>
          </div>
      </div>

      {/* 3. Leaderboard List */}
      <div className="flex flex-col gap-2">
         {MOCK_LEADERBOARD.map((entry) => {
             const isUser = entry.isUser;
             const isTop3 = entry.rank <= 3;
             
             return (
               <div 
                 key={entry.rank}
                 className={`
                    flex items-center px-4 md:px-6 py-4 rounded-2xl transition-all relative overflow-hidden
                    ${isUser 
                        ? 'bg-[#1f2937] border-2 border-[#34B1E8] z-10 shadow-xl pt-1' 
                        : 'bg-transparent border border-gray-800 hover:bg-gray-800/40'
                    }
                    ${isTop3 ? 'border-b-4' : ''}
                    ${entry.rank === 1 ? 'border-yellow-500/30' : ''}
                    ${entry.rank === 2 ? 'border-cyan-400/30' : ''}
                    ${entry.rank === 3 ? 'border-orange-600/30' : ''}
                 `}
               >
                  {/* Highlight Bar for User */}
                  {isUser && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#34B1E8]"></div>}

                  {/* Rank Column */}
                  <div className="w-10 flex justify-center items-center mr-4 shrink-0">
                     {entry.rank === 1 && <Trophy weight="fill" className="text-yellow-400 drop-shadow-sm" size={28} />}
                     {entry.rank === 2 && <Trophy weight="fill" className="text-cyan-300 drop-shadow-sm" size={24} />}
                     {entry.rank === 3 && <Trophy weight="fill" className="text-orange-500 drop-shadow-sm" size={24} />}
                     {entry.rank > 3 && <span className={`font-black text-lg ${isUser ? 'text-[#34B1E8]' : 'text-gray-500'}`}>{entry.rank}</span>}
                  </div>

                  {/* Avatar Column */}
                  <div className="mr-4 shrink-0">
                     {entry.avatar.startsWith('http') ? (
                         <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700 bg-[#FFE4B5]">
                             <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
                         </div>
                     ) : (
                        <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm text-white uppercase border-2
                            ${isUser ? 'bg-[#34B1E8] border-[#0284c7]' : 'bg-gray-700 border-gray-600 text-gray-400'}
                        `}>
                            {entry.avatar}
                        </div>
                     )}
                  </div>

                  {/* Info Column */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                     <div className="flex items-center gap-3">
                         <span className={`font-bold text-base truncate ${isUser ? 'text-[#34B1E8]' : 'text-white'}`}>
                            {entry.name}
                         </span>
                         {/* Status Pill */}
                         {entry.status && (
                             <span className={`hidden sm:inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded
                                ${isUser ? 'bg-[#34B1E8]/20 text-[#34B1E8]' : 'text-yellow-400'}
                             `}>
                                 {entry.status}
                             </span>
                         )}
                     </div>
                  </div>

                  {/* XP Column */}
                  <div className="text-right shrink-0 min-w-[80px]">
                     <span className="block font-black text-white tracking-tight">{entry.xp.toLocaleString()} XP</span>
                     
                     {/* Rank Change Indicator */}
                     {entry.changeDirection === 'up' && (
                         <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-[#34B1E8] mt-0.5">
                             <CaretUp weight="fill" />
                             <span>{entry.changeAmount} ranks</span>
                         </div>
                     )}
                     {entry.changeDirection === 'same' && (
                         <div className="text-[10px] font-bold text-gray-600 mt-0.5 text-right">-</div>
                     )}
                  </div>
               </div>
             );
         })}
      </div>
    </div>
  );
};

export default Leaderboard;