import React, { useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { generatePracticeSet } from '../services/geminiService';
import { ALPHABET_GROUPS, MOCK_WORD_LIST, HAND_PLACEHOLDER_URL } from '../constants';
import Button from '../components/Button';
import { Lightning, Crosshair, CornersOut, CheckCircle, HandPalm, Eye, EyeClosed } from 'phosphor-react';

const Dojo: React.FC = () => {
  const [phaseIndex] = useState(0);
  const [wordQueue, setWordQueue] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isTrainingStarted, setIsTrainingStarted] = useState(false);
  const [feedback, setFeedback] = useState<'neutral' | 'correct' | 'incorrect'>('neutral');

  // Initialize practice session
  useEffect(() => {
    const initSession = async () => {
      setIsLoading(true);
      const activeLetters = ALPHABET_GROUPS[phaseIndex].letters;
      let words = await generatePracticeSet(activeLetters, 10);
      if (words.length === 0) {
        words = MOCK_WORD_LIST;
      }
      setWordQueue(words);
      setIsLoading(false);
    };
    initSession();
  }, [phaseIndex]);

  const currentWord = wordQueue[currentWordIndex] || "";
  const targetChar = currentWord[currentCharIndex] || "";

  const handleSuccess = useCallback(() => {
    setFeedback('correct');
    const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
    audio.play().catch(() => {});

    setTimeout(() => {
      setFeedback('neutral');
      if (currentCharIndex < currentWord.length - 1) {
        setCurrentCharIndex(prev => prev + 1);
      } else {
        if (currentWordIndex < wordQueue.length - 1) {
          setCurrentWordIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        } else {
          setCurrentWordIndex(0);
          setCurrentCharIndex(0);
        }
      }
    }, 200);
  }, [currentCharIndex, currentWord, currentWordIndex, wordQueue.length]);

  // Hidden Keyboard mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toUpperCase() === targetChar && isTrainingStarted) {
        handleSuccess();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [targetChar, handleSuccess, isTrainingStarted]);

  // Mock CV Loop
  useEffect(() => {
    if (!isWebcamActive || !isTrainingStarted) return;
    const timer = setInterval(() => {
        if(Math.random() > 0.85) { 
            handleSuccess();
        }
    }, 1500);
    return () => clearInterval(timer);
  }, [isWebcamActive, handleSuccess, isTrainingStarted]);

  const startTraining = () => {
    setIsWebcamActive(true);
    setIsTrainingStarted(true);
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-app-bg text-accent-primary">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 gap-4 overflow-hidden max-w-[1600px] mx-auto w-full">
      
      {/* Top Section: Target & Guide (approx 40% height) */}
      <div className="flex gap-4 h-[40%] min-h-[250px]">
        
        {/* Main Target Card */}
        <div className="flex-[2] bg-panel-bg rounded-2xl border border-gray-800 p-6 flex flex-col relative overflow-hidden shadow-lg group">
           
           <div className="flex justify-between items-start">
             <div>
                <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Current Target</span>
                <div className="text-9xl font-black text-white leading-none tracking-tighter mt-2">{targetChar}</div>
             </div>
             
             {/* Integrated Stats - Blending in */}
             <div className="flex flex-col gap-2 items-end">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold bg-gray-900/50 px-3 py-1.5 rounded-lg border border-gray-800/50">
                  <Lightning weight="fill" className="text-accent-primary" /> 
                  <span>32 LPM</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold bg-gray-900/50 px-3 py-1.5 rounded-lg border border-gray-800/50">
                  <Crosshair weight="fill" className="text-accent-success" /> 
                  <span>94% ACC</span>
                </div>
             </div>
           </div>

           {/* Word Stream - Positioned below target letter */}
           <div className="mt-auto relative w-full h-16 bg-black/40 rounded-xl flex items-center justify-center overflow-hidden border border-gray-800">
              <div className="font-mono text-3xl flex gap-[1ch] tracking-widest z-10 px-8">
                 {wordQueue.map((w, i) => (
                    <span key={i} className={`flex transition-opacity duration-500 ${i === currentWordIndex ? 'opacity-100' : 'opacity-20 blur-[1px]'}`}>
                        {w.split('').map((char, charIdx) => (
                            <span 
                                key={charIdx}
                                className={`
                                    transition-colors duration-150
                                    ${i === currentWordIndex && charIdx === currentCharIndex ? 'text-accent-primary' : ''}
                                    ${i === currentWordIndex && charIdx < currentCharIndex ? 'text-accent-success' : ''}
                                    ${i === currentWordIndex && charIdx > currentCharIndex ? 'text-gray-600' : ''}
                                `}
                            >
                                {char}
                            </span>
                        ))}
                    </span>
                 ))}
              </div>
              {/* Active Marker */}
              <div className="absolute bottom-0 h-0.5 bg-accent-primary w-8 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(55,187,245,0.8)]"></div>
           </div>
        </div>

        {/* Guide Card - Full image overlay */}
        <div className="flex-1 bg-gray-900 rounded-2xl border border-gray-800 relative overflow-hidden shadow-lg group">
           <img 
              src={HAND_PLACEHOLDER_URL} 
              alt="Hand Guide"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity duration-500"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
           <span className="absolute top-4 left-4 text-[10px] font-bold text-white/50 tracking-[0.2em] uppercase z-10 bg-black/50 px-2 py-1 rounded backdrop-blur-md">Guide</span>
           <div className="absolute bottom-4 left-4 z-10">
              <div className="text-white font-bold text-lg leading-tight">Hand<br/>Position</div>
           </div>
        </div>
      </div>

      {/* Bottom Section: Camera (flex-1 fills remaining) */}
      <div className="flex-1 relative bg-black rounded-2xl border-2 border-gray-800 overflow-hidden shadow-2xl flex items-center justify-center group">
        
        {/* HUD Corners */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-accent-primary/50 rounded-tl-lg"></div>
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-accent-primary/50 rounded-tr-lg"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-accent-primary/50 rounded-bl-lg"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-accent-primary/50 rounded-br-lg"></div>

        {!isWebcamActive ? (
          <div className="flex flex-col items-center gap-4 z-30 animate-pulse">
             <EyeClosed size={48} className="text-gray-700" />
             <div className="text-gray-600 font-mono tracking-widest text-xs uppercase">Vision System Offline</div>
          </div>
        ) : (
          <div className="relative w-full h-full">
             <Webcam 
                 className="w-full h-full object-contain"
                 mirrored={true}
             />
             {/* Central Focus Ring */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-64 h-64 border border-white/10 rounded-full flex items-center justify-center">
                    <div className="w-60 h-60 border border-white/5 rounded-full"></div>
                    <CornersOut size={32} weight="thin" className="text-white/20 absolute" />
                 </div>
             </div>
             
             {/* Success Flash Overlay */}
             {feedback === 'correct' && (
                 <div className="absolute inset-0 flex items-center justify-center bg-accent-success/10 backdrop-blur-[2px] z-40 transition-all duration-300">
                     <CheckCircle weight="fill" className="text-accent-success drop-shadow-[0_0_25px_rgba(34,197,94,1)] scale-125 transition-transform" size={100} />
                 </div>
             )}
          </div>
        )}

        {/* Start Overlay Button if inactive */}
        {!isTrainingStarted && (
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <Button 
                variant="primary" 
                className="text-xl py-4 px-12 tracking-widest uppercase shadow-[0_0_30px_rgba(55,187,245,0.3)] hover:shadow-[0_0_50px_rgba(55,187,245,0.5)] transition-shadow"
                onClick={startTraining}
              >
                Initialize Quest
              </Button>
           </div>
        )}
      </div>

    </div>
  );
};

export default Dojo;