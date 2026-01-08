import React from 'react';
import { TrafficCone, Wrench, BellRinging } from 'phosphor-react';
import Button from '../components/Button';

const Converse: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-fade-in min-h-[500px]">
       <div className="relative mb-10">
           <div className="absolute inset-0 bg-accent-primary/20 blur-3xl rounded-full animate-pulse-slow"></div>
           <div className="relative bg-[#101C2255] border-4 border-gray-800 p-10 rounded-[3rem] shadow-2xl backdrop-blur-sm">
               <TrafficCone weight="fill" size={80} className="text-orange-500" />
           </div>
           <div className="absolute -bottom-4 -right-4 bg-gray-800 p-4 rounded-2xl border-2 border-gray-700 shadow-lg rotate-12">
               <Wrench weight="fill" size={32} className="text-accent-primary" />
           </div>
       </div>

       <div className="max-w-md space-y-6">
           <div className="inline-block px-4 py-1.5 rounded-full bg-gray-800 border border-gray-700 text-xs font-black text-gray-400 uppercase tracking-widest">
               Under Construction
           </div>
           
           <p className="text-lg text-gray-400 font-medium leading-relaxed">
               We're building an immersive, real-time ASL conversation partner powered by advanced AI vision. Get ready to sign naturally.
           </p>

           <div className="pt-6">
               <Button 
                   variant="secondary" 
                   className="flex items-center gap-2 mx-auto"
                   onClick={() => {}}
               >
                   <BellRinging weight="bold" size={20} />
                   Notify Me When Ready
               </Button>
           </div>
       </div>
    </div>
  );
};

export default Converse;