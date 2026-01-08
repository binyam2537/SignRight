import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell
} from 'recharts';
import { ALPHABET_GROUPS, MOCK_LEADERBOARD } from '../constants';
import { Trophy, TrendUp, Lightning, LockKey, Fire } from 'phosphor-react';

// Helper to generate consistent mock data based on letters
const getMockDataForLetters = (letters: string[], locked: boolean) => {
    if (locked) return [];
    
    // Seeded-like random for consistency
    return letters.map((l, i) => ({
        name: l,
        speed: 60 + (l.charCodeAt(0) % 50) + (Math.random() * 20),
        mastery: Math.min(100, 40 + (l.charCodeAt(0) % 40) + (Math.random() * 30))
    }));
};

const Dashboard: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState(ALPHABET_GROUPS[0].id);

  // Find currently selected group
  const selectedGroup = ALPHABET_GROUPS.find(g => g.id === selectedGroupId) || ALPHABET_GROUPS[0];
  const selectedGroupIndex = ALPHABET_GROUPS.findIndex(g => g.id === selectedGroupId);
  
  // Logic: Only Phase 1 (index 0) is unlocked for MVP
  const isLocked = selectedGroupIndex > 0;
  
  const chartData = getMockDataForLetters(selectedGroup.letters, isLocked);
  
  // Get User XP from Mock Data
  const userXP = MOCK_LEADERBOARD.find(u => u.name === "You")?.xp || 2050;

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 pb-24">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-panel-bg p-6 rounded-2xl shadow-lg border border-gray-800">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-800 rounded-xl text-orange-500 border border-gray-700">
                <Fire weight="fill" size={24} />
              </div>
              <span className="text-xs font-bold text-gray-500 bg-[#101C22] px-2 py-1 rounded border border-gray-800">ALL TIME</span>
           </div>
           <div className="text-4xl font-black text-white mb-1">12</div>
           <div className="text-gray-400 text-sm font-medium">Day Streak</div>
        </div>

        <div className="bg-panel-bg p-6 rounded-2xl shadow-lg border border-gray-800">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-800 rounded-xl text-accent-success border border-gray-700">
                <TrendUp weight="fill" size={24} />
              </div>
              <span className="text-xs font-bold text-gray-500 bg-[#101C22] px-2 py-1 rounded border border-gray-800">AVG SPEED</span>
           </div>
           <div className="text-4xl font-black text-white mb-1">45 <span className="text-lg text-gray-500">LPM</span></div>
           <div className="text-gray-400 text-sm font-medium">+12% vs last week</div>
        </div>

        <div className="bg-panel-bg p-6 rounded-2xl shadow-lg border border-gray-800">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-800 rounded-xl text-yellow-400 border border-gray-700">
                <Lightning weight="fill" size={24} />
              </div>
              <span className="text-xs font-bold text-gray-500 bg-[#101C22] px-2 py-1 rounded border border-gray-800">TOTAL XP</span>
           </div>
           <div className="text-4xl font-black text-white mb-1">{userXP.toLocaleString()}</div>
           <div className="text-gray-400 text-sm font-medium">Top 5% of learners</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Dynamic Chart */}
        <div className="bg-panel-bg p-8 rounded-2xl shadow-lg border border-gray-800 flex flex-col">
            <h3 className="font-bold text-lg text-white mb-2">Mastery by Letter</h3>
            <p className="text-sm text-gray-500 mb-6 font-medium">Breakdown for {selectedGroup.name}</p>
            
            <div className="h-64 w-full flex-1 min-h-[250px] relative">
                {!isLocked ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#9ca3af', fontWeight: 'bold'}} 
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#6b7280'}} 
                            />
                            <Tooltip 
                                cursor={{fill: '#27272a'}}
                                contentStyle={{borderRadius: '12px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#fff'}}
                            />
                            <Bar dataKey="mastery" radius={[6, 6, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.mastery > 80 ? '#22c55e' : entry.mastery > 60 ? '#f59e0b' : '#ef4444'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#101C22]/90 rounded-xl border-2 border-dashed border-gray-800">
                        <div className="p-4 bg-gray-800 rounded-full mb-3 shadow-lg">
                            <LockKey size={32} weight="fill" className="text-gray-600" />
                        </div>
                        <h4 className="text-gray-400 font-bold uppercase tracking-widest text-sm">Stats Locked</h4>
                        <p className="text-gray-600 text-xs mt-1 font-medium">Complete previous phases to unlock</p>
                    </div>
                )}
            </div>
        </div>

        {/* Right: Interactive Skill Tree */}
        <div className="bg-panel-bg p-8 rounded-2xl shadow-lg border border-gray-800 overflow-hidden flex flex-col">
            <h3 className="font-bold text-lg text-white mb-6">Skill Tree</h3>
            <div className="space-y-6 relative flex-1">
                {/* Connector Line */}
                <div className="absolute left-6 top-4 bottom-4 w-1 bg-gray-800 rounded-full"></div>

                {ALPHABET_GROUPS.map((group, idx) => {
                    const isSelected = selectedGroupId === group.id;
                    const groupLocked = idx > 0; // MVP Logic
                    const statusText = groupLocked ? "LOCKED" : "IN PROGRESS";

                    return (
                        <button 
                            key={group.id} 
                            onClick={() => setSelectedGroupId(group.id)}
                            className={`relative pl-16 w-full text-left group transition-all duration-200 outline-none
                                ${isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'}
                            `}
                        >
                            {/* Number Badge */}
                            <div className={`
                                absolute left-0 w-12 h-12 rounded-xl flex items-center justify-center border-4 z-10 transition-colors duration-300
                                ${isSelected 
                                    ? 'bg-accent-primary border-accent-shadow text-white shadow-lg shadow-sky-900/30' 
                                    : groupLocked 
                                        ? 'bg-gray-800 border-gray-700 text-gray-600'
                                        : 'bg-gray-800 border-gray-600 text-gray-400 group-hover:border-accent-primary/50 group-hover:text-accent-primary'
                                }
                            `}>
                                {groupLocked ? <LockKey weight="fill" /> : <span className="font-bold text-lg">{idx + 1}</span>}
                            </div>
                            
                            {/* Card Body */}
                            <div className={`
                                p-4 rounded-xl border-2 transition-all duration-300
                                ${isSelected 
                                    ? 'border-accent-primary bg-accent-primary/10' 
                                    : 'border-dashed border-gray-800 group-hover:bg-[#101C22] group-hover:border-gray-700'
                                }
                            `}>
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className={`font-bold ${isSelected ? 'text-white' : 'text-gray-500'}`}>{group.name}</h4>
                                    
                                    {/* Status Badge */}
                                    <div className={`
                                        flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider
                                        ${groupLocked
                                            ? 'bg-gray-800 text-gray-600'
                                            : isSelected
                                                ? 'bg-accent-primary text-white'
                                                : 'bg-accent-primary/10 text-accent-primary'
                                        }
                                    `}>
                                        {statusText}
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {group.letters.map(l => (
                                        <span key={l} className={`
                                            text-xs font-bold px-2 py-1 rounded transition-colors
                                            ${isSelected 
                                                ? 'bg-white/10 text-white border border-white/20' 
                                                : 'bg-[#101C22] text-gray-600'
                                            }
                                        `}>
                                            {l}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;