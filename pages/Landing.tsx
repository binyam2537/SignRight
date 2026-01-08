import React from 'react';
import { Link } from 'react-router-dom';
import { Fire, Trophy, VideoCamera, GitMerge, Brain, TrendUp, Check, GameController, Eye, HandPalm, Confetti, UserFocus } from 'phosphor-react';

const Landing: React.FC = () => {
  return (
    <div className="bg-app-bg text-white font-display min-h-screen flex flex-col overflow-x-hidden selection:bg-accent-primary selection:text-white">
      <style>{`
        .btn-3d {
            transition: all 0.1s;
            position: relative;
            top: 0;
        }
        .btn-3d:active {
            top: 4px;
            box-shadow: 0 0 0 0 !important;
            transform: translateY(0);
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
            animation: float 4s ease-in-out 2s infinite;
        }
        .animate-pulse-slow {
            animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      
      {/* Header - No Border */}
      <header className="w-full bg-app-bg/95 backdrop-blur-sm sticky top-0 z-50">
         <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-4xl text-accent-primary drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]">sign_language</span>
               </div>
               <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-sm font-mono">Learn2Sign</h1>
            </div>
            <div className="hidden md:flex items-center gap-4">
               <Link to="/login">
                   <button className="font-bold text-gray-400 hover:text-white uppercase tracking-wider text-sm transition-colors">Log In</button>
               </Link>
               <Link to="/signup">
                   <button className="bg-accent-primary text-white font-bold text-sm uppercase tracking-wider py-3 px-6 rounded-xl border-b-4 border-accent-shadow active:border-b-0 active:translate-y-1 hover:brightness-110 transition-all btn-3d shadow-[0_4px_0_#2390C2]">
                       Get Started
                   </button>
               </Link>
            </div>
         </div>
      </header>

      <main className="flex-1 flex flex-col">
         {/* Hero Section */}
         <section className="flex-1 flex flex-col items-center justify-center pt-10 md:pt-16 px-6 relative pb-12 min-h-[calc(100vh-80px)] z-10">
            
            {/* Hero Content */}
            <div className="max-w-4xl w-full mx-auto text-center relative z-20 mb-12">
               <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.15] tracking-tight mb-6">
                  Unlock the world of <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-success via-purple-400 to-orange-400">American Sign Language</span>
               </h2>
               <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
                  The fun, free, and effective way to learn ASL online. Build your streak, top the leaderboards, and join our global community today.
               </p>

               {/* Feature Cards / Badges */}
               <div className="flex flex-wrap justify-center gap-3 mb-10">
                   <div className="flex items-center gap-2 px-4 py-2 bg-[#1f2937] border-2 border-gray-700 border-b-4 rounded-xl select-none hover:-translate-y-0.5 transition-transform">
                       <Fire weight="fill" className="text-orange-500" size={20} />
                       <span className="text-xs font-black text-white tracking-widest uppercase">Daily Streaks</span>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 bg-[#1f2937] border-2 border-gray-700 border-b-4 rounded-xl select-none hover:-translate-y-0.5 transition-transform">
                       <Trophy weight="fill" className="text-purple-400" size={20} />
                       <span className="text-xs font-black text-white tracking-widest uppercase">Leaderboards</span>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 bg-[#1f2937] border-2 border-gray-700 border-b-4 rounded-xl select-none hover:-translate-y-0.5 transition-transform ring-2 ring-accent-success/20 shadow-[0_0_15px_rgba(88,204,2,0.15)]">
                       <VideoCamera weight="fill" className="text-accent-success" size={20} />
                       <span className="text-xs font-black text-white tracking-widest uppercase">Smart Correction</span>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 bg-[#1f2937] border-2 border-gray-700 border-b-4 rounded-xl select-none hover:-translate-y-0.5 transition-transform">
                       <GitMerge weight="fill" className="text-accent-primary" size={20} />
                       <span className="text-xs font-black text-white tracking-widest uppercase">Personalized Paths</span>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 bg-[#1f2937] border-2 border-gray-700 border-b-4 rounded-xl select-none hover:-translate-y-0.5 transition-transform">
                       <Brain weight="fill" className="text-red-400" size={20} />
                       <span className="text-xs font-black text-white tracking-widest uppercase">Spaced Repetition</span>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 bg-[#1f2937] border-2 border-gray-700 border-b-4 rounded-xl select-none hover:-translate-y-0.5 transition-transform">
                       <TrendUp weight="fill" className="text-yellow-400" size={20} />
                       <span className="text-xs font-black text-white tracking-widest uppercase">Progress Tracking</span>
                   </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup" className="w-full sm:w-auto">
                      <button className="w-full bg-[#34B1E8] text-white font-extrabold text-lg uppercase tracking-wider py-4 px-10 rounded-2xl border-b-[6px] border-[#2390C2] active:border-b-0 active:translate-y-[6px] hover:brightness-110 transition-all shadow-[0_6px_0_#2390C2] btn-3d">
                          Get Started
                      </button>
                  </Link>
                  <Link to="/login" className="w-full sm:w-auto">
                      <button className="w-full bg-[#18252C] text-accent-primary font-extrabold text-lg uppercase tracking-wider py-4 px-10 rounded-2xl border-2 border-[#2A3B44] border-b-[6px] shadow-lg active:shadow-none active:border-b-2 active:translate-y-[4px] hover:bg-[#203038] hover:border-accent-primary hover:text-white transition-all btn-3d">
                          I Have an Account
                      </button>
                  </Link>
               </div>
            </div>

            {/* Avatar Cluster */}
            <div className="relative w-full max-w-5xl mx-auto z-10 flex justify-center mt-4">
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-app-bg to-transparent pointer-events-none z-20"></div>
                <div className="flex flex-wrap items-end justify-center -space-x-4 md:-space-x-8 pb-4">
                    {/* Left Avatar (Orange) */}
                    <div className="relative group animate-float-delayed z-0 hover:z-30 transition-all">
                        <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-orange-500 border-[6px] md:border-[8px] border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden">
                            <span className="material-symbols-outlined text-5xl md:text-7xl text-white">face_3</span>
                        </div>
                        <div className="absolute -top-4 -left-4 bg-gray-800 p-2 md:p-3 rounded-2xl border-4 border-app-bg shadow-lg rotate-[-10deg]">
                            <span className="material-symbols-outlined text-3xl md:text-4xl text-orange-500">waving_hand</span>
                        </div>
                    </div>
                    
                    {/* Center Avatar (Brand Blue) - Increased z-index to 30 to stay above gradient */}
                    <div className="relative group animate-float z-30 transition-all -mb-6 md:-mb-10">
                        <div className="w-32 h-32 md:w-56 md:h-56 rounded-full bg-accent-primary border-[6px] md:border-[8px] border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden">
                            <span className="material-symbols-outlined text-6xl md:text-8xl text-white">face_6</span>
                        </div>
                        <div className="absolute -top-6 -right-2 bg-gray-800 p-3 md:p-4 rounded-2xl border-4 border-app-bg shadow-lg rotate-[5deg]">
                            <span className="material-symbols-outlined text-4xl md:text-5xl text-accent-primary">sign_language</span>
                        </div>
                    </div>
                    
                    {/* Right Avatar (Purple) */}
                    <div className="relative group animate-float-delayed z-0 hover:z-30 transition-all">
                        <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-purple-500 border-[6px] md:border-[8px] border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden">
                            <span className="material-symbols-outlined text-5xl md:text-7xl text-white">face_4</span>
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-gray-800 p-2 md:p-3 rounded-2xl border-4 border-app-bg shadow-lg rotate-[10deg]">
                            <span className="material-symbols-outlined text-3xl md:text-4xl text-purple-500">thumb_up</span>
                        </div>
                    </div>
                    
                    {/* Far Right Avatar (Small Blue) */}
                    <div className="relative group animate-float z-0 hover:z-30 transition-all hidden md:block -ml-4">
                        <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-accent-highlight border-[6px] md:border-[8px] border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden opacity-90 scale-90">
                            <span className="material-symbols-outlined text-4xl md:text-6xl text-white">face_2</span>
                        </div>
                        <div className="absolute -top-2 -right-2 bg-gray-800 p-2 rounded-2xl border-4 border-app-bg shadow-lg rotate-[-5deg]">
                            <span className="material-symbols-outlined text-2xl text-accent-highlight">favorite</span>
                        </div>
                    </div>
                </div>
            </div>
         </section>

         {/* Features Section - Updated to match requested design */}
         <section className="py-24 relative overflow-hidden bg-app-bg">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="text-center mb-16">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">Why <span className="text-accent-success">Learn2Sign?</span></h3>
                  <p className="text-lg text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
                      We've combined advanced AI with game design to create the most engaging way to learn American Sign Language.
                  </p>
               </div>
               
               <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                  {/* Card 1: Smart Feedback (Green) */}
                  <div className="bg-[#18252C] border-2 border-gray-700 rounded-[2rem] p-8 relative overflow-hidden hover:-translate-y-2 transition-transform duration-300 group shadow-xl">
                      {/* Large Watermark */}
                      <VideoCamera weight="fill" className="absolute top-8 left-1/2 -translate-x-1/2 text-accent-success/5 rotate-12 scale-[5] pointer-events-none transition-transform group-hover:scale-[5.5] group-hover:rotate-6" size={64} />
                      
                      {/* Gradient Overlay for subtle tint */}
                      <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 to-transparent pointer-events-none"></div>

                      {/* Main Icon Card */}
                      <div className="relative z-10 mx-auto w-24 h-24 bg-accent-success rounded-[1.5rem] flex items-center justify-center shadow-[0_12px_24px_-8px_rgba(88,204,2,0.5)] mb-8 border-b-[6px] border-green-700 group-hover:scale-105 transition-transform">
                          <UserFocus weight="fill" size={42} className="text-white drop-shadow-md" />
                      </div>

                      <div className="relative z-10 text-center">
                          <h4 className="text-2xl font-extrabold text-white mb-6">Smart Feedback</h4>
                          <ul className="space-y-4 text-left">
                              {[
                                 { title: "Real-time Correction", desc: "Instantly fixes mistakes as you sign." },
                                 { title: "AI Vision", desc: "Watches your hands as you move." },
                                 { title: "Personal Tutor", desc: "Learns your pace and adapts." },
                                 { title: "Fingerspelling", desc: "Practice the alphabet with precision." }
                              ].map((item, i) => (
                                  <li key={i} className="flex items-start gap-3">
                                      <div className="mt-1 w-5 h-5 rounded-full bg-accent-success/20 flex items-center justify-center shrink-0">
                                          <Check weight="bold" className="text-accent-success" size={12} />
                                      </div>
                                      <span className="text-sm text-gray-300 font-medium leading-tight">
                                          <strong className="text-white block mb-0.5">{item.title}</strong>
                                          <span className="text-gray-400 text-xs">{item.desc}</span>
                                      </span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>

                  {/* Card 2: Addictive & Flexible (Orange) */}
                  <div className="bg-[#18252C] border-2 border-gray-700 rounded-[2rem] p-8 relative overflow-hidden hover:-translate-y-2 transition-transform duration-300 group shadow-xl">
                      {/* Large Watermark */}
                      <Trophy weight="fill" className="absolute top-8 left-1/2 -translate-x-1/2 text-orange-500/5 -rotate-12 scale-[5] pointer-events-none transition-transform group-hover:scale-[5.5] group-hover:-rotate-6" size={64} />
                      
                      {/* Gradient Overlay for subtle tint */}
                      <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 to-transparent pointer-events-none"></div>

                      {/* Main Icon Card */}
                      <div className="relative z-10 mx-auto w-24 h-24 bg-orange-500 rounded-[1.5rem] flex items-center justify-center shadow-[0_12px_24px_-8px_rgba(249,115,22,0.5)] mb-8 border-b-[6px] border-orange-700 group-hover:scale-105 transition-transform">
                          <GameController weight="fill" size={42} className="text-white drop-shadow-md" />
                      </div>

                      <div className="relative z-10 text-center">
                          <h4 className="text-2xl font-extrabold text-white mb-6">Addictive & Flexible</h4>
                          <ul className="space-y-4 text-left">
                              {[
                                 { title: "Complete & Earn", desc: "Gain XP and climb levels." },
                                 { title: "Quick Lessons", desc: "5–15 minute sessions that fit your day." },
                                 { title: "Flexible", desc: "Learn anytime, anywhere." },
                                 { title: "Daily Goals", desc: "Build streaks and stay motivated." }
                              ].map((item, i) => (
                                  <li key={i} className="flex items-start gap-3">
                                      <div className="mt-1 w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                                          <Check weight="bold" className="text-orange-500" size={12} />
                                      </div>
                                      <span className="text-sm text-gray-300 font-medium leading-tight">
                                          <strong className="text-white block mb-0.5">{item.title}</strong>
                                          <span className="text-gray-400 text-xs">{item.desc}</span>
                                      </span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>

                  {/* Card 3: Adaptive Algorithm (Blue) */}
                  <div className="bg-[#18252C] border-2 border-gray-700 rounded-[2rem] p-8 relative overflow-hidden hover:-translate-y-2 transition-transform duration-300 group shadow-xl">
                      {/* Large Watermark */}
                      <Brain weight="fill" className="absolute top-8 left-1/2 -translate-x-1/2 text-accent-primary/5 rotate-6 scale-[5] pointer-events-none transition-transform group-hover:scale-[5.5] group-hover:rotate-0" size={64} />
                      
                      {/* Gradient Overlay for subtle tint */}
                      <div className="absolute inset-0 bg-gradient-to-b from-sky-900/10 to-transparent pointer-events-none"></div>

                      {/* Main Icon Card */}
                      <div className="relative z-10 mx-auto w-24 h-24 bg-accent-primary rounded-[1.5rem] flex items-center justify-center shadow-[0_12px_24px_-8px_rgba(56,189,248,0.5)] mb-8 border-b-[6px] border-[#2390C2] group-hover:scale-105 transition-transform">
                          <Brain weight="fill" size={42} className="text-white drop-shadow-md" />
                      </div>
                      
                      <div className="relative z-10 text-center">
                        <h4 className="text-2xl font-extrabold text-white mb-6">Adaptive Algorithm</h4>
                        <ul className="space-y-4 text-left">
                            {[
                                { title: "Smart Grouping", desc: "Learn similar hand shapes together to build muscle memory faster." },
                                { title: "Endless Content", desc: "AI generates unlimited practice so you never run out of challenges." },
                                { title: "Personalized Pace", desc: "AI adapts to you, unlocking new letters only when you’re ready." }
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-accent-primary/20 flex items-center justify-center shrink-0">
                                        <Check weight="bold" className="text-accent-primary" size={12} />
                                    </div>
                                    <span className="text-sm text-gray-300 font-medium leading-tight">
                                        <strong className="text-white block mb-0.5">{item.title}</strong>
                                        <span className="text-gray-400 text-xs">{item.desc}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                      </div>
                  </div>

               </div>
            </div>
         </section>

         {/* How It Works + Bottom CTA (Combined Section) */}
         <section className="py-24 bg-app-bg relative overflow-hidden flex flex-col items-center justify-center">
            
            {/* How It Works Content */}
            <div className="max-w-6xl mx-auto px-6 mb-24 w-full">
                <div className="text-center mb-20">
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        How It <span className="text-[#34B1E8]">Works</span>
                    </h3>
                    <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                        Master ASL in 3 simple steps. Our AI-powered loop ensures you learn, practice, and perfect every sign.
                    </p>
                </div>

                <div className="relative grid md:grid-cols-3 gap-12 text-center">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[18%] right-[18%] h-0 border-t-2 border-dashed border-gray-700 z-0"></div>

                    {/* Step 1 */}
                    <div className="relative z-10 flex flex-col items-center group">
                        <div className="w-24 h-24 rounded-full bg-[#18252C] border-2 border-gray-700 border-b-[6px] border-b-gray-900 flex items-center justify-center mb-8 relative shadow-[0_8px_0_#111827] group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
                            <Eye weight="fill" className="text-[#34B1E8]" size={40} />
                            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-[#34B1E8] text-white flex items-center justify-center font-black shadow-lg transform rotate-12 border-2 border-app-bg">1</div>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4">Watch & Learn</h4>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                            See the sign performed by native signers in crystal-clear HD video.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative z-10 flex flex-col items-center group">
                        <div className="w-24 h-24 rounded-full bg-[#18252C] border-2 border-gray-700 border-b-[6px] border-b-gray-900 flex items-center justify-center mb-8 relative shadow-[0_8px_0_#111827] group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
                            <HandPalm weight="fill" className="text-[#58CC02]" size={40} />
                            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-[#58CC02] text-white flex items-center justify-center font-black shadow-lg transform -rotate-6 border-2 border-app-bg">2</div>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4">Sign to Webcam</h4>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                            Mimic the gesture. Our AI tracks your hand movements in real-time.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative z-10 flex flex-col items-center group">
                        <div className="w-24 h-24 rounded-full bg-[#18252C] border-2 border-gray-700 border-b-[6px] border-b-gray-900 flex items-center justify-center mb-8 relative shadow-[0_8px_0_#111827] group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
                            <Confetti weight="fill" className="text-orange-500" size={40} />
                            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-black shadow-lg transform rotate-6 border-2 border-app-bg">3</div>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4">Instant Feedback</h4>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                            Get immediate correction or celebrate your success with XP rewards!
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Card */}
            <div className="max-w-4xl w-full mx-auto px-6">
                <div className="bg-gray-800 border-2 border-gray-700 rounded-3xl p-8 md:p-12 shadow-[0_8px_0_#374151] relative overflow-hidden text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-transparent"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Ready to start signing?</h2>
                        <p className="text-gray-400 font-medium text-lg mb-8 max-w-xl mx-auto">Create your free profile today and join thousands of learners mastering ASL.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/signup" className="w-full sm:w-auto">
                                <button className="w-full bg-[#34B1E8] text-white font-extrabold text-lg uppercase tracking-wider py-4 px-12 rounded-2xl border-b-[6px] border-[#2390C2] active:border-b-0 active:translate-y-[6px] hover:brightness-110 transition-all shadow-[0_6px_0_#2390C2] btn-3d">
                                    Create Profile
                                </button>
                            </Link>
                        </div>
                        <p className="mt-6 text-xs text-gray-500 font-bold uppercase tracking-widest">No credit card required</p>
                    </div>
                </div>
            </div>
         </section>

      {/* Footer - Minimal */}
      <footer className="bg-app-bg py-10 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
             
             {/* Left: Logo & Copyright */}
             <div className="flex flex-col md:flex-row items-center gap-6">
                 <div className="flex items-center gap-3">
                     {/* Logo Icon - using specific blue #34B1E8 */}
                     <span className="material-symbols-outlined text-3xl" style={{ color: '#34B1E8' }}>sign_language</span>
                     <span className="text-xl font-black text-white font-mono tracking-tight">Learn2Sign</span>
                 </div>
                 
                 {/* Divider - Hidden on mobile */}
                 <div className="hidden md:block w-px h-6 bg-gray-700"></div>
                 
                 <span className="text-gray-500 text-sm font-bold tracking-wide">© 2024 Learn2Sign Inc.</span>
             </div>

             {/* Center: Social Icons */}
             <div className="flex items-center gap-6">
                 <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg">
                     {/* X (Twitter) SVG */}
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path></svg>
                 </a>
                 <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg">
                     {/* Github SVG */}
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path></svg>
                 </a>
                 <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg" style={{ transform: 'scale(1.15)' }}>
                     {/* Linkedin SVG */}
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path></svg>
                 </a>
             </div>

             {/* Right: Links */}
             <div className="flex items-center gap-8">
                 <a href="#" className="text-xs font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Privacy</a>
                 <a href="#" className="text-xs font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Terms</a>
             </div>

        </div>
      </footer>
    </div>
  );
};

export default Landing;