import React, { useState } from 'react';
import { HandWaving, XCircle, Copy } from 'phosphor-react';
import { LETTER_VIDEOS } from '../constants';

const COMMON_PHRASES = [
  "HELLO",
  "THANK YOU",
  "NICE TO MEET YOU",
  "MY NAME IS",
  "GOOD MORNING",
  "GOOD NIGHT",
  "PLEASE",
  "YOU'RE WELCOME",
  "EXCUSE ME",
  "HOW ARE YOU",
  "I LOVE YOU",
  "HELP",
  "SORRY",
  "YES",
  "NO",
  "GOODBYE",
  "SEE YOU LATER"
];

const Phrases: React.FC = () => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow letters and spaces
    const cleanValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setInputText(cleanValue);
  };

  const addPhrase = (phrase: string) => {
    setInputText(phrase);
  };

  const clearText = () => setInputText("");

  // Group by words for better display structure
  const words = inputText.toUpperCase().split(' ').filter(w => w.length > 0);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-10 flex flex-col gap-8 h-full">
        
        {/* 1. Input Area */}
        <div className="relative group">
            <div className="relative bg-panel-bg border-2 border-gray-700 rounded-2xl p-2 flex items-center shadow-2xl focus-within:border-accent-primary transition-colors">
                <input 
                    type="text" 
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Type to generate signs..."
                    className="w-full bg-transparent text-2xl md:text-4xl font-black text-white placeholder-gray-700 px-6 py-4 outline-none uppercase tracking-wider"
                />
                {inputText && (
                    <button onClick={clearText} className="p-4 text-gray-600 hover:text-white transition-colors">
                        <XCircle weight="fill" size={32} />
                    </button>
                )}
            </div>
        </div>

        {/* 2. Quick Phrases */}
        <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Copy size={14} /> Quick Phrases
            </h3>
            {/* Horizontal Scroll, Single Row */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {COMMON_PHRASES.map((phrase) => (
                    <button 
                        key={phrase}
                        onClick={() => addPhrase(phrase)}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0"
                    >
                        {phrase}
                    </button>
                ))}
            </div>
        </div>

        {/* 3. Output Area (Sign Videos) */}
        <div className="flex-1 min-h-[400px] bg-[#101C22]/50 rounded-3xl border-2 border-dashed border-gray-800 p-8 overflow-y-auto">
             {words.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-4 opacity-50">
                    <HandWaving weight="thin" size={64} />
                    <p className="font-bold uppercase tracking-widest text-sm">Start typing to see signs</p>
                 </div>
             ) : (
                 <div className="flex flex-wrap gap-x-8 gap-y-10 content-start justify-start">
                     {words.map((word, wordIdx) => (
                        <div key={wordIdx} className="flex flex-col gap-2">
                             {/* Word Container */}
                             <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                {word.split('').map((char, charIdx) => (
                                    <SignCard key={`${wordIdx}-${charIdx}`} char={char} />
                                ))}
                             </div>
                             {/* Word Label (optional reading aid) */}
                             <span className="text-center font-bold text-gray-600 text-xs tracking-widest uppercase">{word}</span>
                        </div>
                     ))}
                 </div>
             )}
        </div>

    </div>
  );
};

const SignCard: React.FC<{ char: string }> = ({ char }) => {
    const videoUrl = LETTER_VIDEOS[char];

    return (
        <div className="flex flex-col items-center gap-3 animate-fade-in-up">
            <div className="w-20 h-28 md:w-28 md:h-36 rounded-xl bg-black border border-gray-700 overflow-hidden shadow-lg relative group">
                 {videoUrl ? (
                     <video 
                        src={videoUrl} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        autoPlay
                        loop
                        muted
                        playsInline
                     />
                 ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-700 font-black text-2xl bg-[#101C22]">
                         {char}
                     </div>
                 )}
                 {/* Letter Badge */}
                 <div className="absolute bottom-1 right-1 w-6 h-6 bg-black/60 backdrop-blur-sm rounded-md flex items-center justify-center text-white font-bold border border-white/10 shadow-sm text-xs">
                    {char}
                 </div>
            </div>
        </div>
    );
};

export default Phrases;