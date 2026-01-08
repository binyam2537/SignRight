import React, { useState } from 'react';
import { ALPHABET_GROUPS, LETTER_VIDEOS } from '../constants';
import { Lock, Star, BookOpen, Anchor, ArrowsOut, HandPalm, ArrowsClockwise, Info, ArrowLeft, PlayCircle, Check, DeviceMobile } from 'phosphor-react';
import { MasteryLevel, LetterGroup } from '../types';

// Mock mastery data to match the visual reference (A, S Mastered; E Active; Others Locked)
const MOCK_MASTERY: Record<string, MasteryLevel> = {
  'A': MasteryLevel.MASTER, 
  'S': MasteryLevel.MASTER, 
  'E': MasteryLevel.APPRENTICE, // The "Resume" one
  'T': MasteryLevel.NOVICE,     // The "Start" one
  'M': MasteryLevel.LOCKED, 
  'N': MasteryLevel.LOCKED,
};

const LETTER_TIPS: Record<string, string> = {
  'A': "Rest your thumb vertically against the side of your hand. Keep all other fingers curled down tightly into the palm.",
  'B': "Hold your hand flat with fingers together. Tuck your thumb across the palm.",
  'C': "Curve your fingers and thumb to form a 'C' or cup shape. Keep your fingers together.",
  'D': "Point your index finger straight up. Touch your thumb to the tips of your middle, ring, and pinky fingers.",
  'E': "Curl all fingers down so fingertips touch the thumb. Keep the hand shape compact and tight.",
  'F': "Touch the tip of your index finger to your thumb (the 'OK' sign). Spread the other three fingers apart.",
  'G': "Point your index finger to the side. Tuck your thumb parallel to the index finger. Keep other fingers closed.",
  'H': "Extend your index and middle fingers together pointing to the side. Tuck the thumb.",
  'I': "Stick your pinky finger straight up. Curl all other fingers down with the thumb across them.",
  'J': "Make the 'I' shape, then swoop your pinky in the air to draw the letter 'J'.",
  'K': "Point index finger up and middle finger forward. Place your thumb between them on the knuckle.",
  'L': "Extend thumb and index finger to make an 'L' shape. Curl the other fingers down.",
  'M': "Tuck your thumb under your first three fingers. The thumb should peek out between the ring and pinky fingers.",
  'N': "Tuck your thumb under your first two fingers (index and middle). The thumb peeks out between middle and ring.",
  'O': "Touch all fingertips to your thumb to form a circle.",
  'P': "Make the 'K' shape but point your fingers down. The thumb is still between the index and middle fingers.",
  'Q': "Make the 'G' shape but point it downwards.",
  'R': "Cross your index and middle fingers (like making a wish).",
  'S': "Form a fist and wrap your thumb *over* your fingers (across the front). This distinguishes it from 'A'.",
  'T': "Tuck your thumb between your index and middle finger. Think 'T' for 'Tiny' peek.",
  'U': "Extend index and middle fingers straight up, keeping them together.",
  'V': "Extend index and middle fingers straight up, spreading them apart (Peace sign).",
  'W': "Extend index, middle, and ring fingers straight up and spread apart.",
  'X': "Curl your index finger into a hook shape. Tuck the other fingers.",
  'Y': "Extend your thumb and pinky finger (Hang loose). Curl the three middle fingers.",
  'Z': "Use your index finger to draw a 'Z' in the air."
};

const Learn: React.FC = () => {
  const [guideGroup, setGuideGroup] = useState<LetterGroup | null>(null);

  // Guide Page View (Tutorial Mode)
  if (guideGroup) {
      return (
        <div className="w-full max-w-4xl mx-auto pb-32 pt-10 px-6 animate-fade-in">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-3 mb-8 text-sm font-bold uppercase tracking-widest">
                <button 
                    onClick={() => setGuideGroup(null)}
                    className="text-gray-500 hover:text-white transition-colors flex items-center gap-2"
                >
                    <ArrowLeft weight="bold" size={16} />
                    Back
                </button>
                <span className="text-gray-700">/</span>
                <span className="text-accent-primary">{guideGroup.name}</span>
            </div>

            {/* Content Container */}
            <div className="bg-panel-bg rounded-[2rem] border-2 border-gray-700 p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10 mb-8">
                     <p className="text-xl md:text-2xl text-white font-black leading-tight mb-2">
                        {guideGroup.description}
                     </p>
                </div>

                <div className="mb-12 relative z-10">
                    <div className="bg-blue-500/5 border-2 border-blue-500/20 rounded-2xl p-6 relative">
                       {/* Icon removed as requested */}
                       <p className="text-blue-200/70 leading-relaxed font-medium">
                          This phase focuses on the transition fluidity between these specific shapes. 
                          Pay attention to the specific finger tucks and thumb placements shown below.
                       </p>
                    </div>
                </div>

                <div className="space-y-8 relative z-10">
                    <div>
                        <h4 className="font-bold text-gray-500 text-xs uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                            <PlayCircle weight="fill" className="text-gray-600" /> 
                            Letter Tutorials
                        </h4>
                        <p className="text-gray-400 text-sm font-medium max-w-2xl">
                            Watch the loop for each letter. Notice how the hand shape forms and releases. Mirror the movement until it feels natural.
                        </p>
                    </div>
                    
                    {guideGroup.letters.map((letter) => (
                        <div key={letter} className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch bg-gray-800/30 p-6 md:p-8 rounded-3xl border border-gray-700/50 hover:bg-gray-800/50 transition-colors">
                             <div className="w-full md:w-64 aspect-[4/3] bg-black rounded-2xl overflow-hidden shadow-lg relative group shrink-0 border border-gray-800">
                                <video 
                                  src={LETTER_VIDEOS[letter]} 
                                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                  autoPlay 
                                  loop 
                                  muted 
                                  playsInline
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none"></div>
                             </div>
                             
                             <div className="flex-1 flex flex-col justify-center text-left">
                                <div className="flex items-center gap-4 mb-4">
                                   <div className="w-12 h-12 rounded-xl bg-accent-primary flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-sky-900/20">
                                     {letter}
                                   </div>
                                   <h3 className="text-2xl font-bold text-white tracking-tight">The "{letter}" Shape</h3>
                                </div>
                                
                                <p className="text-gray-300 text-lg leading-relaxed font-medium mb-4">
                                   {LETTER_TIPS[letter] || "Focus on the specific finger placement shown in the video. Keep your wrist steady and relaxed."}
                                </p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      );
  }

  // Roadmap View
  return (
    <div className="w-full max-w-5xl mx-auto pb-32 pt-10 px-6">
      <div className="flex flex-col gap-16">
        {ALPHABET_GROUPS.map((group, idx) => (
          <UnitSection 
            key={group.id} 
            group={group} 
            index={idx} 
            onOpenGuide={() => setGuideGroup(group)}
          />
        ))}
      </div>
    </div>
  );
};

const getGroupIcon = (index: number) => {
  switch (index) {
    case 0: return <Anchor weight="fill" size={28} />;
    case 1: return <ArrowsOut weight="fill" size={28} />;
    case 2: return <HandPalm weight="fill" size={28} />;
    case 3: return <ArrowsClockwise weight="fill" size={28} />;
    default: return <Star weight="fill" size={28} />;
  }
};

const getHeaderColor = (index: number) => {
    const colors = [
        "bg-blue-500 shadow-[0_4px_0_#1d4ed8]",
        "bg-purple-500 shadow-[0_4px_0_#7e22ce]",
        "bg-pink-500 shadow-[0_4px_0_#be185d]",
        "bg-teal-500 shadow-[0_4px_0_#0f766e]"
    ];
    return colors[index % colors.length];
};

const UnitSection: React.FC<{ group: LetterGroup; index: number; onOpenGuide: () => void }> = ({ group, index, onOpenGuide }) => {
  // Logic: First unit active for MVP
  const isLocked = index > 0;

  return (
    <div className={`flex flex-col gap-6 ${isLocked ? 'opacity-60 grayscale' : ''}`}>
      {/* Unit Header */}
      <div className="flex flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-5">
             {/* Large Icon Container */}
             <div className={`w-14 h-14 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white shrink-0 ${getHeaderColor(index)}`}>
                 {getGroupIcon(index)}
             </div>
             
             <div className="flex flex-col">
                 <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">{group.name}</h2>
                 <p className="text-gray-500 font-bold uppercase tracking-widest text-xs md:text-sm mt-3">
                     Unit {index + 1} • {group.letters.length} Lessons
                 </p>
             </div>
          </div>

          {/* Guidebook Button */}
          <button 
              onClick={onOpenGuide}
              className="shrink-0 p-3 md:px-5 md:py-2.5 rounded-xl border-2 border-gray-700 text-gray-400 font-bold uppercase tracking-wider hover:bg-gray-800 hover:text-white hover:border-gray-600 transition-all active:scale-95 flex items-center gap-2 text-sm"
          >
              <BookOpen size={20} weight="fill" />
              <span className="hidden md:inline">Guidebook</span>
          </button>
      </div>

      {/* Grid of Lesson Cards - Adjusted for denser, smaller items */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
         {group.letters.map((char) => {
             // Mock state logic for visual accuracy
             const mockStatus = index === 0 ? (MOCK_MASTERY[char] || MasteryLevel.LOCKED) : MasteryLevel.LOCKED;
             return <LessonCard key={char} char={char} status={mockStatus} locked={isLocked} />;
         })}
      </div>
    </div>
  );
};

const LessonCard: React.FC<{ char: string; status: MasteryLevel; locked: boolean }> = ({ char, status, locked }) => {
  const isMaster = status === MasteryLevel.MASTER;
  const isApprentice = status === MasteryLevel.APPRENTICE; // "Resume" state
  const isNovice = status === MasteryLevel.NOVICE; // "Start" state
  const isItemLocked = status === MasteryLevel.LOCKED || locked;

  // Colors & Styles
  let iconBg = "bg-gray-800";
  let iconShadow = "";
  let iconContent = <Lock size={24} weight="fill" className="text-gray-600" />;
  let labelColor = "text-gray-500";
  let barColor = "bg-gray-700";
  let actionText = null;

  if (isMaster) {
      iconBg = "bg-accent-success text-white";
      iconShadow = "shadow-[0_4px_0_#46A302]";
      iconContent = (
         <>
           <span className="text-3xl font-black">{char}</span>
           <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-sm">
             <Check className="text-accent-success" weight="bold" size={10} />
           </div>
         </>
      );
      labelColor = "text-white";
      barColor = "bg-accent-success";
  } else if (isApprentice) { // Active / Resume
      iconBg = "bg-accent-primary text-white";
      // Update shadow to match blue theme (Sky-600 approx)
      iconShadow = "shadow-[0_4px_0_#0284C7]";
      iconContent = <span className="text-3xl font-black">{char}</span>;
      labelColor = "text-white";
      barColor = "bg-accent-primary";
      actionText = "RESUME";
  } else if (isNovice) { // Start
      iconBg = "bg-[#0EA5E9] text-white"; // Light Blue for new
      iconShadow = "shadow-[0_4px_0_#0284C7]";
      iconContent = <span className="text-3xl font-black">{char}</span>;
      labelColor = "text-white";
      barColor = "bg-[#0EA5E9]";
      actionText = "START";
  }

  // Progress width mock
  const progressWidth = isMaster ? '100%' : isApprentice ? '60%' : '0%';

  return (
    <button className="flex flex-col items-center justify-center gap-3 p-2 rounded-2xl hover:bg-gray-800/30 transition-colors outline-none group cursor-pointer relative">
       {/* Icon Container - Reduced Size (w-16 h-16) and no outer card background */}
       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center relative transition-transform group-hover:scale-105 active:scale-95 ${iconBg} ${iconShadow}`}>
          {iconContent}
          
          {/* Mobile Phone Icon badge (Optional aesthetic) */}
          {(isMaster || isApprentice) && (
             <div className="absolute -bottom-1 -right-1 bg-gray-900 border border-gray-700 rounded-md p-0.5 text-gray-400 hidden">
                 <DeviceMobile weight="fill" size={10} />
             </div>
          )}
       </div>

       {/* Label & Progress */}
       <div className="w-full max-w-[80px] flex flex-col items-center gap-1.5">
           <span className={`font-bold text-sm ${labelColor}`}>Letter {char}</span>

           <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
               <div className={`h-full rounded-full ${barColor}`} style={{ width: progressWidth }}></div>
           </div>
           
           {actionText && (
               <div className={`text-[10px] font-black tracking-widest uppercase text-center ${isApprentice ? 'text-accent-primary' : 'text-[#0EA5E9]'}`}>
                   {actionText}
               </div>
           )}
       </div>
    </button>
  );
};

export default Learn;