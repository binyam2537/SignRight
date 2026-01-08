import React, { useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { generatePracticeSet } from '../services/geminiService';
import { ALPHABET_GROUPS, MOCK_WORD_LIST, HAND_PLACEHOLDER_URL, LETTER_VIDEOS } from '../constants';
import Button from '../components/Button';
import { Lightning, Crosshair, CheckCircle, HandPalm, EyeClosed, Scan, XCircle, ArrowsLeftRight, Lightbulb, WarningCircle } from 'phosphor-react';

// Common mistakes mapping to simulate realistic errors
const CONFUSION_MAP: Record<string, string> = {
  'A': 'S', 'S': 'A',
  'M': 'N', 'N': 'M',
  'E': 'S',
  'F': 'D', 'D': 'F',
  'K': 'V', 'V': 'K',
  'R': 'U', 'U': 'R',
  'T': 'S'
};

const CORRECTION_TIPS: Record<string, string> = {
  'A_S': "You're signing 'S'. Move your thumb to the SIDE for 'A'.",
  'S_A': "You're signing 'A'. Wrap your thumb ACROSS for 'S'.",
  'M_N': "That's 'N'. Use THREE fingers for 'M'.",
  'N_M': "That's 'M'. Use TWO fingers for 'N'.",
  'F_D': "You're signing 'D'. Spread fingers for 'F'.",
  'D_F': "You're signing 'F'. Point index UP for 'D'.",
  'T_S': "Looks like 'S'. Tuck thumb under index for 'T'."
};

const GENERIC_FEEDBACK = [
  "Center your hand in the frame.",
  "Ensure good lighting on your hand.",
  "Hold your hand steady.",
  "Move hand slightly closer."
];

const FUN_FACTS = [
  "ASL is not a universal language; British Sign Language is completely different!",
  "Facial expressions in ASL are part of the grammar, acting like tone of voice.",
  "ASL is the third most widely used language in the United States.",
  "Learning ASL improves your spatial reasoning and reaction times.",
  "Your brain processes sign language in the same area used for spoken language.",
  "It takes about 70 hours of practice to reach basic proficiency in ASL."
];

const Dojo: React.FC = () => {
  const [phaseIndex] = useState(0);
  const [wordQueue, setWordQueue] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isTrainingStarted, setIsTrainingStarted] = useState(false);
  
  const [feedback, setFeedback] = useState<'neutral' | 'correct' | 'incorrect'>('neutral');
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [detectedChar, setDetectedChar] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);

  // Loading Screen Logic
  const [randomFact, setRandomFact] = useState("");
  useEffect(() => {
    setRandomFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);
    const interval = setInterval(() => {
         setRandomFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);
    }, 4000);
    return () => clearInterval(interval);
  }, [isLoading]);

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
      // Simulate slight delay for "model loading" feel
      setTimeout(() => setIsLoading(false), 2000);
    };
    initSession();
  }, [phaseIndex]);

  const currentWord = wordQueue[currentWordIndex] || "";
  const targetChar = currentWord[currentCharIndex] || "";
  const guideVideoUrl = LETTER_VIDEOS[targetChar];

  // Determine if we should show the mistake card
  const isMistake = feedback === 'incorrect' && detectedChar && detectedChar !== targetChar;
  const detectedVideoUrl = detectedChar ? LETTER_VIDEOS[detectedChar] : null;

  // Simulation Loop for "Detection" and "Mistakes"
  useEffect(() => {
    if (!isWebcamActive || !isTrainingStarted || feedback === 'correct') {
      if (feedback === 'correct') {
         // Keep success state clean
      } else {
         setAiSuggestion(null);
         setDetectedChar(null);
      }
      return;
    }

    const interval = setInterval(() => {
      // 1. Calculate a random confidence
      const newConfidence = Math.floor(Math.random() * 30) + 60; // 60-90%
      setConfidence(newConfidence);

      // 2. Decide if we simulate a mistake or a "searching" state
      const mistakeChance = Math.random();
      
      if (mistakeChance > 0.65) {
        // Simulate a confusion if one exists
        const mistakeChar = CONFUSION_MAP[targetChar];
        if (mistakeChar) {
           setDetectedChar(mistakeChar);
           const correctionKey = `${targetChar}_${mistakeChar}`;
           const specificTip = CORRECTION_TIPS[correctionKey] || `That looks like ${mistakeChar}. Check your thumb position.`;
           setAiSuggestion(specificTip);
           setFeedback('incorrect');
        } else {
           // No specific confusion, just show generic looking
           setDetectedChar(null);
           const randomTip = GENERIC_FEEDBACK[Math.floor(Math.random() * GENERIC_FEEDBACK.length)];
           setAiSuggestion(randomTip);
           setFeedback('neutral');
        }
      } else {
        // "Searching" / "Almost there"
        setDetectedChar(null);
        setFeedback('neutral');
        setAiSuggestion("Analyzing hand shape...");
      }

    }, 5000); 

    return () => clearInterval(interval);
  }, [isWebcamActive, isTrainingStarted, feedback, targetChar]);

  const handleSuccess = useCallback(() => {
    setFeedback('correct');
    setDetectedChar(targetChar); // Show the correct char as detected
    setConfidence(98);
    setAiSuggestion("Perfect match!");
    
    const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
    audio.play().catch(() => {});

    setTimeout(() => {
      setFeedback('neutral');
      setAiSuggestion(null);
      setDetectedChar(null);
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
    }, 1200);
  }, [currentCharIndex, currentWord, currentWordIndex, wordQueue.length, targetChar]);

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

  // Mock CV Success Loop
  useEffect(() => {
    if (!isWebcamActive || !isTrainingStarted) return;
    const timer = setInterval(() => {
        if(Math.random() > 0.92) { 
            handleSuccess();
        }
    }, 2000);
    return () => clearInterval(timer);
  }, [isWebcamActive, handleSuccess, isTrainingStarted]);

  const startTraining = () => {
    setIsWebcamActive(true);
    setIsTrainingStarted(true);
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-app-bg text-accent-primary gap-8 p-8 text-center animate-fade-in">
        <div className="relative">
            <div className="absolute inset-0 bg-accent-primary/20 blur-2xl rounded-full animate-pulse"></div>
            <HandPalm size={80} weight="fill" className="relative z-10 animate-bounce text-accent-primary" />
        </div>
        
        <div className="space-y-2">
            <h2 className="text-3xl font-black text-white tracking-tight">Loading Dojo...</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Initializing Computer Vision Model</p>
        </div>

        <div className="max-w-md bg-gray-900/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm shadow-xl mt-4 transform transition-all duration-500">
            <div className="flex items-center justify-center gap-2 mb-3 text-accent-highlight font-black uppercase text-xs tracking-[0.2em]">
                <Lightning weight="fill" /> Fun Fact
            </div>
            <p className="text-gray-300 font-medium leading-relaxed text-lg min-h-[3rem]">
                "{randomFact}"
            </p>
        </div>
      </div>
    );
  }

  // Detected Card Logic
  const detectedStatus = detectedChar ? (detectedChar === targetChar ? 'success' : 'error') : 'neutral';
  let detectedBorderClass = 'border-white/20'; // Clean grey border for neutral state
  let detectedTextClass = 'text-gray-500';

  if (detectedStatus === 'success') {
      detectedBorderClass = 'border-accent-success/50 shadow-[0_0_20px_rgba(88,204,2,0.2)]';
      detectedTextClass = 'text-accent-success';
  } else if (detectedStatus === 'error') {
      detectedBorderClass = 'border-accent-error/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]';
      detectedTextClass = 'text-accent-error';
  }

  return (
    <div className="h-full flex flex-col p-4 gap-4 overflow-hidden max-w-[1600px] mx-auto w-full">
      
      {/* Top Section - Three Card Grid */}
      <div className="flex gap-4 h-[40%] min-h-[250px] transition-all duration-500 ease-in-out">
        
        {/* 1. Main Target Card */}
        <div className={`${isMistake ? 'flex-1' : 'flex-[2]'} bg-panel-bg rounded-2xl border border-gray-800 p-6 flex flex-col relative overflow-hidden shadow-lg group transition-all duration-500`}>
           <div className="flex justify-between items-start">
             <div>
                <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Target</span>
                <div className={`${isMistake ? 'text-7xl' : 'text-9xl'} font-black text-white leading-none tracking-tighter mt-2 transition-all duration-500`}>{targetChar}</div>
             </div>
             
             {!isMistake && (
                 <div className="flex flex-col gap-2 items-end transition-opacity duration-300">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-bold bg-gray-900/50 px-3 py-1.5 rounded-lg border border-gray-800/50">
                      <Lightning weight="fill" className="text-accent-primary" /> 
                      <span>32 LPM</span>
                    </div>
                 </div>
             )}
           </div>
           
           {/* Word Stream */}
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
              <div className="absolute bottom-0 h-0.5 bg-accent-primary w-8 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(55,187,245,0.8)]"></div>
           </div>
        </div>

        {/* 2. Guide Card (Correct) - Back in Top Row */}
        <div className="flex-1 bg-gray-900 rounded-2xl border border-gray-800 relative overflow-hidden shadow-lg group transition-all duration-500 z-10">
           {guideVideoUrl ? (
             <video 
                key={targetChar}
                src={guideVideoUrl} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                autoPlay loop muted playsInline
             />
           ) : (
             <img 
                src={HAND_PLACEHOLDER_URL} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity duration-500"
             />
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent pointer-events-none"></div>
           
           <span className="absolute top-4 left-4 text-[10px] font-bold text-white tracking-[0.2em] uppercase z-10 bg-black/50 px-2 py-1 rounded backdrop-blur-md border border-accent-success/20">Guide</span>
           
           <div className="absolute bottom-4 left-4 z-10">
              <div className="text-white font-bold text-lg leading-tight">
                Letter {targetChar}
              </div>
           </div>
        </div>

        {/* 3. Mistake Card (Comparison) - Back in Top Row */}
        {isMistake && (
            <div className="flex-1 relative group animate-fade-in-right transition-all duration-500 z-20">
                <div className="absolute top-1/2 -left-5 z-50 -translate-y-1/2 hidden md:flex items-center justify-center pointer-events-none">
                     <div className="bg-black text-gray-300 rounded-full p-2 border-2 border-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                        <ArrowsLeftRight weight="bold" size={20}/>
                     </div>
                </div>

                <div className="w-full h-full bg-gray-900 rounded-2xl border-2 border-accent-error/50 relative overflow-hidden shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                    {detectedVideoUrl ? (
                         <video 
                            key={detectedChar}
                            src={detectedVideoUrl} 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale"
                            autoPlay loop muted playsInline
                         />
                    ) : (
                         <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-gray-700 font-black text-6xl opacity-50">
                            {detectedChar}
                         </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-transparent pointer-events-none"></div>
                    <span className="absolute top-4 left-4 text-[10px] font-bold text-accent-error tracking-[0.2em] uppercase z-10 bg-black/60 px-2 py-1 rounded backdrop-blur-md border border-accent-error/30">You are Signing</span>
                    
                    <div className="absolute bottom-4 left-4 z-10">
                       <div className="text-white/80 font-bold text-lg leading-tight flex items-center gap-2">
                         Letter {detectedChar}
                         <XCircle weight="fill" className="text-accent-error" />
                       </div>
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* Bottom Section: Camera */}
      <div className="flex-1 relative bg-black rounded-2xl border-2 border-gray-800 overflow-hidden shadow-2xl flex items-center justify-center group">
        
        {/* HUD Corners */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-accent-primary/50 rounded-tl-lg pointer-events-none z-20"></div>
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-accent-primary/50 rounded-tr-lg pointer-events-none z-20"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-accent-primary/50 rounded-bl-lg pointer-events-none z-20"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-accent-primary/50 rounded-br-lg pointer-events-none z-20"></div>

        {!isWebcamActive ? (
          <div className="flex flex-col items-center gap-4 z-30 animate-pulse">
             <EyeClosed size={48} className="text-gray-700" />
             <div className="text-gray-600 font-mono tracking-widest text-xs uppercase">Vision System Offline</div>
          </div>
        ) : (
          <div className="relative w-full h-full">
             <Webcam className="w-full h-full object-cover" mirrored={true} />
             
             {/* AI Analysis Stats - Updated Style */}
             <div className="absolute top-8 right-8 z-30 flex flex-col items-end gap-2 animate-fade-in">
                 <div className={`bg-black/60 backdrop-blur-md border-2 p-4 rounded-xl flex items-center gap-4 shadow-lg transition-colors duration-300 ${detectedBorderClass}`}>
                    <div className="flex flex-col items-end">
                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1 ${detectedTextClass}`}>Detected</span>
                        <div className="flex items-baseline gap-1">
                            <span className={`text-4xl font-black font-mono leading-none ${detectedChar ? (detectedChar === targetChar ? 'text-accent-success' : 'text-accent-error') : 'text-gray-600'}`}>
                            {detectedChar || "--"}
                            </span>
                        </div>
                    </div>
                    {/* Separator removed */}
                    <div className="flex flex-col items-end ml-2">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">Conf.</span>
                        <span className="text-xl font-bold text-white font-mono">{detectedChar ? `${confidence}%` : "0%"}</span>
                    </div>
                 </div>
             </div>

             {/* AI Feedback Overlay - Simplified and Rounded */}
             {aiSuggestion && (
                 <div className="absolute bottom-8 left-8 z-30 animate-fade-in-up max-w-lg">
                    <div className={`
                        flex items-start gap-4 p-5 rounded-lg border-2 shadow-xl backdrop-blur-md transition-all duration-300
                        ${feedback === 'incorrect' 
                            ? 'bg-red-950/40 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]' 
                            : 'bg-gray-900/40 border-accent-primary/30 shadow-[0_0_30px_rgba(55,187,245,0.1)]'}
                    `}>
                        {/* Icon */}
                        <div className={`shrink-0 p-2 rounded-full mt-1 ${feedback === 'incorrect' ? 'bg-red-500/20 text-red-400' : 'bg-accent-primary/20 text-accent-primary'}`}>
                           {feedback === 'incorrect' ? <WarningCircle size={24} weight="fill" /> : <Lightbulb size={24} weight="fill" />}
                        </div>

                        <div>
                            <div className={`text-sm font-black uppercase tracking-widest mb-1 ${feedback === 'incorrect' ? 'text-red-400' : 'text-accent-primary'}`}>
                                {feedback === 'incorrect' ? 'Correction Needed' : 'AI Suggestion'}
                            </div>
                            <div className="text-white font-bold text-xl leading-tight text-shadow-sm">{aiSuggestion}</div>
                        </div>
                    </div>
                 </div>
             )}

             {/* Scanning Effect if no detection */}
             {!detectedChar && feedback !== 'correct' && (
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                     <Scan size={200} weight="thin" className="text-accent-primary animate-pulse" />
                 </div>
             )}
             
             {/* Success Flash */}
             {feedback === 'correct' && (
                 <div className="absolute inset-0 flex items-center justify-center bg-accent-success/20 backdrop-blur-[2px] z-40 transition-all duration-300">
                     <div className="bg-accent-success p-6 shadow-[0_0_50px_rgba(34,197,94,0.6)] animate-bounce-short border-4 border-white rounded-3xl">
                        <CheckCircle weight="fill" className="text-white" size={80} />
                     </div>
                 </div>
             )}
          </div>
        )}

        {/* Start Overlay Button */}
        {!isTrainingStarted && (
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <Button 
                variant="primary" 
                className="text-xl py-4 px-12 tracking-widest uppercase shadow-[0_0_30px_rgba(55,187,245,0.3)] hover:shadow-[0_0_50px_rgba(55,187,245,0.5)] transition-shadow"
                onClick={startTraining}
              >
                Begin Practice
              </Button>
           </div>
        )}
      </div>

    </div>
  );
};

export default Dojo;