import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppleLogo, GoogleLogo, Check, Baby, HandWaving, ChatCircleText, X,
  Brain, Users, Briefcase, Airplane, Camera, Lock, DiceFive, User, Envelope, LockKey, IdentificationCard
} from 'phosphor-react';
import Webcam from 'react-webcam';
import { useUser } from '../contexts/UserContext';

type Step = 'auth' | 'wizard';
type AuthMode = 'signup' | 'login';
type WizardPhase = 'level' | 'goal' | 'camera' | 'profile';

interface OnboardingProps {
  initialStep?: Step;
  initialMode?: AuthMode;
}

const Onboarding: React.FC<OnboardingProps> = ({ initialStep = 'auth', initialMode = 'signup' }) => {
  const navigate = useNavigate();
  const { updateUser } = useUser();
  
  const [step, setStep] = useState<Step>(initialStep);
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);
  
  // Wizard State
  const [wizardPhase, setWizardPhase] = useState<WizardPhase>('level');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  
  // Account Form State
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Profile Details State
  const [displayName, setDisplayName] = useState('');
  const [avatarSeed, setAvatarSeed] = useState('Alex');
  const [avatarOptions, setAvatarOptions] = useState<string[]>(['Alex', 'Sarah', 'Mike', 'Jess']);

  const webcamRef = useRef<Webcam>(null);

  const handleAuthSubmit = () => {
      if (authMode === 'login') {
          navigate('/learn');
      } else {
          // In a real app, you would create the user here or validate credentials
          if (username && email && password) {
              setStep('wizard');
          }
      }
  };

  const handleNext = () => {
    if (wizardPhase === 'level') setWizardPhase('goal');
    else if (wizardPhase === 'goal') setWizardPhase('camera');
    else if (wizardPhase === 'camera') setWizardPhase('profile');
    else if (wizardPhase === 'profile') {
        // Finalize
        updateUser({
            name: displayName || username || 'New User',
            handle: (username || 'user').toLowerCase().replace(/\s/g, '_'),
            avatarSeed: avatarSeed
        });
        navigate('/learn');
    }
  };

  const getProgress = () => {
      switch(wizardPhase) {
          case 'level': return 15;
          case 'goal': return 28;
          case 'camera': return 45;
          case 'profile': return 85;
          default: return 0;
      }
  };

  const enableCamera = useCallback(() => {
      setIsCameraEnabled(true);
  }, []);

  const generateAvatars = () => {
      const seeds = Array.from({ length: 4 }, () => Math.random().toString(36).substring(7));
      setAvatarOptions(seeds);
      setAvatarSeed(seeds[0]);
  };

  // -- Step 1: Authentication View --
  if (step === 'auth') {
    return (
      <div className="min-h-screen bg-[#0B1216] flex items-center justify-center p-4 md:p-8 font-sans selection:bg-accent-primary selection:text-white">
        <div className="w-full max-w-6xl h-[85vh] min-h-[600px] bg-[#101C22] rounded-3xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Panel - Branding */}
          <div className="hidden md:flex flex-col justify-between w-5/12 bg-[#0A1114] p-12 relative border-r border-gray-800 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-primary/5 blur-[120px] pointer-events-none"></div>

            {/* Logo - No BG, Colored Icon */}
            <div className="flex items-center gap-3 relative z-10">
               <span className="material-symbols-outlined text-4xl text-accent-primary drop-shadow-sm">sign_language</span>
               <span className="text-2xl font-black text-white tracking-tight font-mono">SignRight</span>
            </div>

            {/* Illustration Area - Floating 3D Card */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10">
               <div className="relative group animate-float cursor-default">
                   {/* The Card - Updated Gradient to Blue only */}
                   <div className="w-64 h-64 bg-gradient-to-br from-[#38bdf8] to-[#2563eb] rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(37,99,235,0.5)] flex items-center justify-center transform rotate-[-12deg] group-hover:rotate-0 transition-transform duration-500 border-t border-white/20 relative overflow-hidden">
                       {/* Shine effect */}
                       <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                       
                       {/* Icon */}
                       <div className="transform scale-150 text-white drop-shadow-xl">
                          <HandWaving size={80} weight="fill" />
                       </div>
                   </div>
                   
                   {/* Shadow beneath */}
                   <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-40 h-8 bg-black/40 blur-xl rounded-full transition-all duration-500 group-hover:w-32 group-hover:opacity-70"></div>
               </div>
               
               <div className="text-center mt-12">
                   <h2 className="text-3xl font-extrabold text-white mb-4">Master ASL</h2>
                   <p className="text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">
                       Join the community and start your streak today.
                   </p>
               </div>
            </div>

            <div className="text-xs text-gray-600 font-medium text-center relative z-10">
                © 2024 SignRight Inc.
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="flex-1 p-8 md:p-16 flex flex-col justify-center bg-[#101C22]">
              {/* Tab Switcher */}
              <div className="flex w-full max-w-sm mx-auto bg-[#0B1216] p-1 rounded-xl mb-10 border border-gray-800">
                  <button 
                    onClick={() => setAuthMode('signup')}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${authMode === 'signup' ? 'bg-[#1F2937] text-white shadow-md' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                      Create Account
                  </button>
                  <button 
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${authMode === 'login' ? 'bg-[#1F2937] text-white shadow-md' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                      Log In
                  </button>
              </div>

              <div className="w-full max-w-sm mx-auto space-y-5">
                  {authMode === 'signup' ? (
                      // Signup Mode: Username, Email, Password
                      <>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">Username</label>
                            <div className="relative">
                                <User weight="bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input 
                                    type="text" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    className="w-full bg-[#0B1216] border-2 border-gray-800 text-white pl-10 pr-4 py-3.5 rounded-xl outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all placeholder-gray-600 font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">Email</label>
                            <div className="relative">
                                <Envelope weight="bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full bg-[#0B1216] border-2 border-gray-800 text-white pl-10 pr-4 py-3.5 rounded-xl outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all placeholder-gray-600 font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">Password</label>
                            <div className="relative">
                                <LockKey weight="bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#0B1216] border-2 border-gray-800 text-white pl-10 pr-4 py-3.5 rounded-xl outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all placeholder-gray-600 font-bold tracking-widest"
                                />
                            </div>
                        </div>

                        <button 
                            onClick={handleAuthSubmit}
                            disabled={!username || !email || !password}
                            className={`w-full font-bold py-4 rounded-xl border-b-4 border-accent-shadow active:border-b-0 active:translate-y-1 transition-all uppercase tracking-wider text-sm shadow-[0_4px_0_#2390C2] mt-4 ${
                                (!username || !email || !password) 
                                ? 'bg-gray-700 text-gray-400 border-gray-800 cursor-not-allowed shadow-none' 
                                : 'bg-accent-primary text-white hover:brightness-110'
                            }`}
                        >
                            Create Account
                        </button>
                      </>
                  ) : (
                      // Login Mode: Inputs
                      <>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">Email</label>
                            <input 
                                type="email" 
                                placeholder="name@example.com"
                                className="w-full bg-[#0B1216] border-2 border-gray-800 text-white px-4 py-3.5 rounded-xl outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all placeholder-gray-700 font-bold"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">Password</label>
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full bg-[#0B1216] border-2 border-gray-800 text-white px-4 py-3.5 rounded-xl outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all placeholder-gray-700 font-bold tracking-widest"
                            />
                        </div>

                        <button 
                            onClick={handleAuthSubmit}
                            className="w-full bg-accent-primary text-white font-bold py-4 rounded-xl border-b-4 border-accent-shadow active:border-b-0 active:translate-y-1 hover:brightness-110 transition-all uppercase tracking-wider text-sm shadow-[0_4px_0_#2390C2] mt-6"
                        >
                            Log In
                        </button>
                      </>
                  )}

                  <div className="relative py-4">
                      <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-800"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                          <span className="px-2 bg-[#101C22] text-gray-600 font-bold uppercase">Or continue with</span>
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded-xl border-b-4 border-gray-300 active:border-b-0 active:translate-y-1 hover:bg-gray-200 transition-all">
                          <GoogleLogo weight="bold" size={20} />
                          <span>Google</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 bg-[#1F2937] text-white font-bold py-3 rounded-xl border-b-4 border-black active:border-b-0 active:translate-y-1 hover:bg-[#374151] transition-all">
                          <AppleLogo weight="fill" size={20} />
                          <span>Apple</span>
                      </button>
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
  }

  // -- Step 2: Onboarding Wizard --
  return (
    <div className="min-h-screen bg-[#0B1216] flex items-center justify-center p-4 selection:bg-accent-primary selection:text-white">
        <div className="w-full max-w-4xl bg-[#101C22] rounded-3xl border border-gray-800 shadow-2xl p-6 md:p-12 relative overflow-hidden">
            
            {/* Header / Progress */}
            <div className="flex items-center justify-between mb-12 gap-6 relative z-10">
                <button onClick={() => setStep('auth')} className="text-gray-500 hover:text-white transition-colors">
                    <X weight="bold" size={24} />
                </button>
                <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                    <div 
                        className="h-full bg-accent-primary rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)] transition-all duration-700 ease-out"
                        style={{ width: `${getProgress()}%` }}
                    ></div>
                </div>
                <div className="text-accent-primary font-bold text-sm">{getProgress()}%</div>
            </div>

            {/* Content Area */}
            <div className="relative z-10">
                {wizardPhase === 'level' && (
                    <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in">
                        {/* Left: Character & Prompt */}
                        <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6">
                             <div className="relative">
                                 <div className="bg-white text-[#101C22] p-4 rounded-2xl rounded-bl-none shadow-lg mb-4 relative z-10 animate-float">
                                     <p className="font-bold text-sm">Be honest! We'll adapt the difficulty for you.</p>
                                     <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white rotate-45"></div>
                                 </div>
                                 <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gray-800 border-4 border-gray-700 overflow-hidden mx-auto md:mx-0 shadow-2xl">
                                     <img 
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher&backgroundColor=b6e3f4" 
                                        alt="Character" 
                                        className="w-full h-full object-cover"
                                     />
                                 </div>
                             </div>
                        </div>

                        {/* Right: Selection Cards */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-black text-white mb-3">How much ASL do you know?</h2>
                                <p className="text-gray-400 font-medium">Select the level that best describes you.</p>
                            </div>

                            <div className="space-y-4">
                                <SelectionCard 
                                    icon={<Baby weight="fill" size={32} className="text-accent-primary" />}
                                    title="I'm a beginner"
                                    subtitle="Starting from scratch"
                                    selected={selectedLevel === 'beginner'}
                                    onSelect={() => setSelectedLevel('beginner')}
                                />
                                <SelectionCard 
                                    icon={<HandWaving weight="fill" size={32} className="text-accent-primary" />}
                                    title="I know some basics"
                                    subtitle="I know the alphabet"
                                    selected={selectedLevel === 'basics'}
                                    onSelect={() => setSelectedLevel('basics')}
                                />
                                <SelectionCard 
                                    icon={<ChatCircleText weight="fill" size={32} className="text-accent-primary" />}
                                    title="I'm intermediate"
                                    subtitle="I can hold a conversation"
                                    selected={selectedLevel === 'intermediate'}
                                    onSelect={() => setSelectedLevel('intermediate')}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {wizardPhase === 'goal' && (
                    <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in">
                        {/* Left: Character */}
                        <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6">
                             <div className="relative">
                                 <div className="bg-[#1f2937] text-white p-4 rounded-2xl rounded-bl-none shadow-lg mb-4 relative z-10 border border-gray-700 animate-float">
                                     <p className="font-bold text-sm">We'll personalize your lessons based on your goal!</p>
                                     <div className="absolute -bottom-2 left-6 w-4 h-4 bg-[#1f2937] rotate-45 border-b border-r border-gray-700"></div>
                                 </div>
                                 <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-[#b6e3f4] border-4 border-gray-700 overflow-hidden mx-auto md:mx-0 shadow-2xl flex items-end justify-center">
                                      {/* Simple SVG Avatar */}
                                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Goal&backgroundColor=b6e3f4" className="w-full h-full object-cover" />
                                 </div>
                             </div>
                        </div>

                        {/* Right: Goals */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-black text-white mb-3">Why are you learning ASL?</h2>
                                <p className="text-gray-400 font-medium">This helps us recommend the right content.</p>
                            </div>

                            <div className="space-y-3">
                                <SelectionCard 
                                    icon={<Brain weight="fill" size={28} className="text-blue-400" />}
                                    title="Brain training"
                                    subtitle="Challenge myself & grow"
                                    selected={selectedGoal === 'brain'}
                                    onSelect={() => setSelectedGoal('brain')}
                                    compact
                                />
                                <SelectionCard 
                                    icon={<Users weight="fill" size={28} className="text-green-400" />}
                                    title="Family & Friends"
                                    subtitle="Connect with loved ones"
                                    selected={selectedGoal === 'family'}
                                    onSelect={() => setSelectedGoal('family')}
                                    compact
                                />
                                <SelectionCard 
                                    icon={<Briefcase weight="fill" size={28} className="text-purple-400" />}
                                    title="Work & Career"
                                    subtitle="Professional development"
                                    selected={selectedGoal === 'work'}
                                    onSelect={() => setSelectedGoal('work')}
                                    compact
                                />
                                <SelectionCard 
                                    icon={<Airplane weight="fill" size={28} className="text-orange-400" />}
                                    title="Travel"
                                    subtitle="Prepare for a trip"
                                    selected={selectedGoal === 'travel'}
                                    onSelect={() => setSelectedGoal('travel')}
                                    compact
                                />
                            </div>
                        </div>
                    </div>
                )}

                {wizardPhase === 'camera' && (
                    <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in">
                        {/* Left: Character */}
                        <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6">
                             <div className="relative">
                                 <div className="bg-[#1f2937] text-white p-4 rounded-2xl rounded-bl-none shadow-lg mb-4 relative z-10 border border-gray-700 animate-float">
                                     <p className="font-bold text-sm">Let's check your setup!<br/>Enable your camera to practice.</p>
                                     <div className="absolute -bottom-2 left-6 w-4 h-4 bg-[#1f2937] rotate-45 border-b border-r border-gray-700"></div>
                                 </div>
                                 <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white border-4 border-gray-700 overflow-hidden mx-auto md:mx-0 shadow-2xl">
                                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Camera&backgroundColor=ffffff" className="w-full h-full object-cover" />
                                 </div>
                             </div>
                        </div>

                        {/* Right: Camera Preview */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-black text-white mb-3">Enable webcam & try it</h2>
                                <p className="text-gray-400 font-medium">We'll use your camera to correct your hand signs in real-time.</p>
                            </div>

                            <div className="bg-[#162630] border-2 border-gray-700 rounded-3xl p-3 shadow-2xl relative overflow-hidden group">
                                <div className="aspect-video bg-black rounded-2xl overflow-hidden relative flex items-center justify-center border border-gray-800">
                                    {isCameraEnabled ? (
                                        <Webcam 
                                            ref={webcamRef}
                                            audio={false}
                                            mirrored={true}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-[#1F2937] flex items-center justify-center animate-pulse">
                                                <Camera weight="fill" size={32} className="text-accent-primary" />
                                            </div>
                                            <div className="text-center">
                                                <h4 className="text-white font-bold">Tap to Enable Camera</h4>
                                                <p className="text-gray-500 text-xs mt-1">Make sure you have good lighting</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Dashed Border Overlay */}
                                    {!isCameraEnabled && (
                                        <div className="absolute inset-4 border-2 border-dashed border-gray-700 rounded-xl pointer-events-none"></div>
                                    )}
                                </div>
                                
                                <div className="mt-4 px-2 py-1 bg-[#1F2937] rounded-xl flex items-center gap-3 border border-gray-700">
                                    <Lock weight="fill" size={16} className="text-accent-primary" />
                                    <span className="text-xs text-gray-400">Your video is processed locally and never stored on our servers.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {wizardPhase === 'profile' && (
                    <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in">
                        {/* Left: Character */}
                        <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6">
                             <div className="relative">
                                 <div className="bg-[#1f2937] text-white p-4 rounded-2xl rounded-bl-none shadow-lg mb-4 relative z-10 border border-gray-700 animate-float">
                                     <p className="font-bold text-sm">Almost there! Create your<br/>profile to save your progress.</p>
                                     <div className="absolute -bottom-2 left-6 w-4 h-4 bg-[#1f2937] rotate-45 border-b border-r border-gray-700"></div>
                                 </div>
                                 <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-[#b6e3f4] border-4 border-accent-primary overflow-hidden mx-auto md:mx-0 shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}&backgroundColor=b6e3f4`} className="w-full h-full object-cover" />
                                 </div>
                             </div>
                        </div>

                        {/* Right: Form */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-black text-white mb-2">Create your profile</h2>
                                <p className="text-gray-400 font-medium">Customize how others see you in the community.</p>
                            </div>

                            {/* Avatar Selector */}
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Choose Avatar</label>
                                <div className="flex gap-3">
                                    {avatarOptions.map((seed, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => setAvatarSeed(seed)}
                                            className={`
                                                w-14 h-14 rounded-full overflow-hidden border-2 transition-all
                                                ${avatarSeed === seed ? 'border-accent-primary scale-110 shadow-lg' : 'border-gray-700 opacity-60 hover:opacity-100'}
                                            `}
                                        >
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                    <button 
                                        onClick={generateAvatars}
                                        className="w-14 h-14 rounded-full bg-gray-800 border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-400 transition-colors"
                                    >
                                        <DiceFive size={24} weight="bold" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">Display Name (Optional)</label>
                                    <div className="relative">
                                        <IdentificationCard weight="bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input 
                                            type="text" 
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            placeholder="e.g. Alex"
                                            className="w-full bg-[#0B1216] border-2 border-gray-800 text-white pl-10 pr-4 py-3.5 rounded-xl outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all placeholder-gray-600 font-bold"
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-600 pl-1 mt-1">This is how you will appear on leaderboards.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer / Actions */}
            <div className="mt-12 flex items-center justify-between pt-6 border-t border-gray-800">
                {wizardPhase === 'camera' ? (
                     <button 
                        onClick={handleNext}
                        className="text-gray-500 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors"
                     >
                         Not Now
                     </button>
                ) : (
                    <div></div>
                )}

                <div className="flex gap-4">
                    {wizardPhase === 'camera' && !isCameraEnabled ? (
                        <button 
                            onClick={enableCamera}
                            className="px-10 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg border-b-4 bg-accent-primary text-white border-accent-shadow hover:brightness-110 shadow-[0_4px_0_#2390C2] active:border-b-0 active:translate-y-1"
                        >
                            Enable Camera
                        </button>
                    ) : (
                        <button 
                            disabled={
                                (wizardPhase === 'level' && !selectedLevel) || 
                                (wizardPhase === 'goal' && !selectedGoal)
                            }
                            onClick={handleNext}
                            className={`
                                px-10 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg border-b-4 active:border-b-0 active:translate-y-1
                                ${((wizardPhase === 'level' && !selectedLevel) || (wizardPhase === 'goal' && !selectedGoal))
                                    ? 'bg-gray-800 text-gray-500 border-gray-900 cursor-not-allowed'
                                    : 'bg-accent-primary text-white border-accent-shadow hover:brightness-110 shadow-[0_4px_0_#2390C2]'}
                            `}
                        >
                            {wizardPhase === 'profile' ? 'Complete Setup' : 'Continue'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

const SelectionCard: React.FC<{
    icon: React.ReactNode; 
    title: string; 
    subtitle: string; 
    selected: boolean; 
    onSelect: () => void;
    compact?: boolean;
}> = ({ icon, title, subtitle, selected, onSelect, compact }) => {
    return (
        <div 
            onClick={onSelect}
            className={`
                w-full rounded-2xl border-2 border-b-4 cursor-pointer transition-all flex items-center gap-4 group active:border-b-2 active:translate-y-[2px]
                ${compact ? 'p-3' : 'p-4'}
                ${selected 
                    ? 'bg-[#162630] border-accent-primary shadow-[0_0_15px_rgba(52,177,232,0.15)]' 
                    : 'bg-[#0B1216] border-gray-800 hover:border-gray-600 hover:bg-[#0F181E]'}
            `}
        >
            <div className={`
                rounded-xl flex items-center justify-center shrink-0 transition-colors
                ${compact ? 'w-12 h-12' : 'w-16 h-16'}
                ${selected ? 'bg-[#1F3644]' : 'bg-[#101C22] group-hover:bg-[#162630]'}
            `}>
                {icon}
            </div>
            
            <div className="flex-1">
                <h3 className={`font-bold ${compact ? 'text-base' : 'text-lg'} mb-0.5 ${selected ? 'text-white' : 'text-gray-200'}`}>{title}</h3>
                <p className="text-gray-500 text-sm font-medium">{subtitle}</p>
            </div>

            <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                ${selected 
                    ? 'bg-accent-primary border-accent-primary' 
                    : 'border-gray-600 group-hover:border-gray-400'}
            `}>
                {selected && <Check weight="bold" className="text-white" size={14} />}
            </div>
        </div>
    );
};

export default Onboarding;