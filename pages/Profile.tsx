import React, { useState, useEffect } from 'react';
import { User, Fire, Lightning, Trophy, Medal, CalendarBlank, PencilSimple, Check, X, Target, LockKey, DiceFive } from 'phosphor-react';
import { useUser } from '../contexts/UserContext';

const Profile: React.FC = () => {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);
  const [avatarOptions, setAvatarOptions] = useState<string[]>([]);

  // Sync edit form if user context changes externally (rare but good practice)
  useEffect(() => {
    setEditForm(user);
  }, [user]);

  // Generate random avatar seeds for the gallery
  useEffect(() => {
      if (isEditing) {
          generateNewAvatars();
      }
  }, [isEditing]);

  const generateNewAvatars = () => {
      const seeds = Array.from({ length: 5 }, () => Math.random().toString(36).substring(7));
      // Keep current avatar as the first option if it's not already in the random set
      setAvatarOptions([editForm.avatarSeed, ...seeds]);
  };

  const handleSave = () => {
    updateUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(user);
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-10 pb-32">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 border-b-2 border-gray-800 pb-10">
            {/* Avatar Section */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-accent-primary border-4 border-[#101C22] outline outline-4 outline-gray-800 flex items-center justify-center overflow-hidden shadow-2xl shrink-0">
                <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${isEditing ? editForm.avatarSeed : user.avatarSeed}`} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                />
            </div>
            
            <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start w-full max-w-lg">
                {!isEditing ? (
                    <>
                        <h1 className="text-3xl font-black text-white mb-2">{user.name}</h1>
                        <p className="text-gray-500 font-bold mb-4">@{user.handle}</p>
                    </>
                ) : (
                    <div className="w-full space-y-4 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Display Name</label>
                            <input 
                                type="text" 
                                value={editForm.name}
                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl px-4 py-2 text-white font-bold focus:border-accent-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Username</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">@</span>
                                <input 
                                    type="text" 
                                    value={editForm.handle}
                                    onChange={(e) => setEditForm({...editForm, handle: e.target.value})}
                                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl pl-8 pr-4 py-2 text-white font-bold focus:border-accent-primary outline-none"
                                />
                            </div>
                        </div>
                        
                        {/* Avatar Gallery */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase">Choose Avatar</label>
                            </div>
                            <div className="flex gap-3 overflow-x-auto p-3 scrollbar-hide items-center">
                                {avatarOptions.map((seed, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setEditForm({...editForm, avatarSeed: seed})}
                                        className={`
                                            w-14 h-14 rounded-full border-2 overflow-hidden shrink-0 transition-all
                                            ${editForm.avatarSeed === seed 
                                                ? 'border-accent-primary scale-110 shadow-[0_0_10px_rgba(55,187,245,0.5)]' 
                                                : 'border-gray-700 opacity-60 hover:opacity-100 hover:border-gray-500'
                                            }
                                        `}
                                    >
                                        <img 
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} 
                                            alt="Option" 
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                                <button 
                                    onClick={generateNewAvatars} 
                                    className="w-14 h-14 rounded-full bg-gray-800 border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-500 hover:text-accent-primary hover:border-accent-primary hover:bg-gray-700 transition-all shrink-0 group"
                                    title="Shuffle Avatars"
                                >
                                    <DiceFive size={24} weight="bold" className="group-hover:rotate-180 transition-transform duration-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-bold text-gray-500 uppercase tracking-wide mb-6">
                    <div className="flex items-center gap-2">
                        <CalendarBlank size={18} weight="fill" />
                        Joined Dec 2024
                    </div>
                    <div className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer">
                        <User size={18} weight="fill" />
                        0 Following
                    </div>
                    <div className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer">
                        <User size={18} weight="fill" />
                        0 Followers
                    </div>
                </div>
                
                {!isEditing ? (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="px-5 py-3 rounded-xl bg-gray-800 text-blue-400 font-black text-xs uppercase tracking-widest border-2 border-gray-700 hover:bg-gray-700 hover:border-gray-600 transition-colors flex items-center gap-2 border-b-4 active:border-b-2 active:translate-y-0.5"
                    >
                        <PencilSimple size={18} weight="bold" />
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button 
                            onClick={handleSave}
                            className="px-5 py-3 rounded-xl bg-accent-primary text-white font-black text-xs uppercase tracking-widest border-b-4 border-accent-shadow hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"
                        >
                            <Check size={18} weight="bold" />
                            Save
                        </button>
                        <button 
                            onClick={handleCancel}
                            className="px-5 py-3 rounded-xl bg-gray-700 text-gray-300 font-black text-xs uppercase tracking-widest border-b-4 border-gray-800 hover:bg-gray-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"
                        >
                            <X size={18} weight="bold" />
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Statistics Section */}
        <h2 className="text-2xl font-bold text-white mb-6">Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <StatCard icon={<Fire weight="fill" className="text-orange-500" />} value="12" label="Day Streak" />
            <StatCard icon={<Lightning weight="fill" className="text-yellow-400" />} value="1,720" label="Total XP" />
            <StatCard icon={<Trophy weight="fill" className="text-purple-500" />} value="Amethyst" label="League" />
            <StatCard icon={<Medal weight="fill" className="text-blue-500" />} value="0" label="Top 3 Finishes" />
        </div>

        {/* Achievements Section */}
        <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <AchievementCard 
                color="bg-orange-500" 
                icon={<Fire weight="fill" size={32} className="text-white" />} 
                title="Wildfire" 
                level={2} 
                description="Reach a 14 day streak"
                progress={12}
                max={14}
            />
            <AchievementCard 
                color="bg-green-500" 
                icon={<Lightning weight="fill" size={32} className="text-white" />} 
                title="Sage" 
                level={1} 
                description="Earn 5,000 XP"
                progress={1720}
                max={5000}
            />
            <AchievementCard 
                color="bg-blue-500" 
                icon={<Target weight="fill" size={32} className="text-white" />} 
                title="Sharpshooter" 
                level={4} 
                description="Complete 50 lessons with 100% accuracy"
                progress={12}
                max={50}
            />
            <AchievementCard 
                color="bg-purple-500" 
                icon={<LockKey weight="fill" size={32} className="text-white" />} 
                title="Conqueror" 
                level={1} 
                description="Unlock Phase 2"
                progress={1}
                max={1}
            />
        </div>
    </div>
  );
};

const StatCard: React.FC<{icon: React.ReactNode, value: string, label: string}> = ({ icon, value, label }) => (
    <div className="bg-panel-bg border-2 border-gray-800 rounded-2xl p-4 flex flex-col gap-2 hover:bg-gray-800/50 transition-colors">
        <div className="text-2xl mb-1">{icon}</div>
        <div className="text-xl font-black text-white">{value}</div>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</div>
    </div>
);

const AchievementCard: React.FC<{color: string, icon: React.ReactNode, title: string, level: number, description: string, progress: number, max: number}> = ({ 
    color, icon, title, level, description, progress, max 
}) => {
    const percentage = Math.min((progress / max) * 100, 100);
    const isCompleted = progress >= max;
    
    return (
        <div className="bg-panel-bg border-2 border-gray-800 rounded-2xl p-4 flex items-center gap-4 hover:border-gray-700 transition-colors group">
            <div className={`
                w-20 h-20 rounded-xl flex items-center justify-center shrink-0 border-b-4 border-black/20 shadow-lg transform group-hover:scale-105 transition-transform
                ${isCompleted ? color : 'bg-gray-800 grayscale'}
            `}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-white text-lg truncate pr-2">{title}</h3>
                    <span className="text-xs font-black text-gray-500 uppercase whitespace-nowrap">Lvl {level}</span>
                </div>
                <p className="text-gray-400 text-sm font-medium mb-3 truncate">{description}</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden border border-gray-700">
                    <div 
                        className={`h-full transition-all duration-500 ${isCompleted ? color : 'bg-gray-600'}`} 
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                
                <div className="text-right mt-1">
                    <span className="text-xs font-bold text-gray-500">{progress} / {max}</span>
                </div>
            </div>
        </div>
    )
}

export default Profile;