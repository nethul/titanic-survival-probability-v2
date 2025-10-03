import { Anchor } from 'lucide-react';

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#f5ead6] to-[#e8dcc4] flex items-center justify-center z-50">
      <div className="text-center">
        {/* Spinning anchor with rings */}
        <div className="relative inline-flex items-center justify-center mb-8" style={{ width: '120px', height: '120px' }}>
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[#d4c4a8] animate-ping opacity-20"></div>
          
          {/* Middle rotating ring */}
          <div className="absolute rounded-full border-4 border-transparent border-t-[#7a6550] animate-spin" 
               style={{ width: '100px', height: '100px' }}></div>
          
          {/* Inner rotating ring - reverse direction */}
          <div className="absolute rounded-full border-4 border-transparent border-b-[#b8a58a]" 
               style={{ width: '80px', height: '80px', animation: 'spin 1s linear infinite reverse' }}></div>
          
          {/* Center anchor icon */}
          <div className="relative z-10 bg-white/60 rounded-full p-6 border-2 border-[#d4c4a8] animate-pulse">
            <Anchor className="w-12 h-12 text-[#7a6550]" />
          </div>
        </div>

        {/* Loading text */}
        <h2 className="text-3xl md:text-4xl font-serif text-[#2a2117] mb-3">
          Analyzing Your Fate...
        </h2>
        <p className="text-lg text-[#5a4f43] mb-6">
          Consulting historical records
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-[#7a6550] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-[#7a6550] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-[#7a6550] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
