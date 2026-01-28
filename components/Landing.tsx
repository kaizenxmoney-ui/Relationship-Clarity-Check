
import React from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="text-center animate-in fade-in slide-in-from-bottom-2 duration-1000">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-8 text-gray-800 leading-[1.3] font-serif">
        If you’re scrolling after an argument, this will help you think clearly.
      </h1>
      
      <div className="space-y-8 text-base sm:text-lg text-gray-600 font-light mb-12 leading-relaxed">
        <p className="px-2">
          Feeling confused? This helps you slow things down and see the patterns clearly.
        </p>
        
        <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm text-left">
          <p className="font-bold text-gray-900 mb-5 text-[10px] uppercase tracking-widest border-b border-gray-50 pb-3">
            What we'll uncover:
          </p>
          <ul className="space-y-4 list-none">
            <li className="flex items-start">
              <span className="mr-4 text-gray-300 select-none text-xl leading-none">01</span>
              <span className="text-[15px] sm:text-base text-gray-700">The root of your current unrest.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 text-gray-300 select-none text-xl leading-none">02</span>
              <span className="text-[15px] sm:text-base text-gray-700">What is objectively happening vs. felt.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 text-gray-300 select-none text-xl leading-none">03</span>
              <span className="text-[15px] sm:text-base text-gray-700">A calm next step for your sanity.</span>
            </li>
          </ul>
        </div>

        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
          3 minutes • Free • Completely Private
        </p>
      </div>

      <div className="space-y-6">
        <button
          onClick={onStart}
          className="w-full py-5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all duration-300 tracking-wider font-semibold shadow-xl active:scale-95 touch-manipulation text-[15px]"
        >
          Start the clarity check
        </button>
        
        <p className="text-[11px] sm:text-[12px] text-gray-400 font-light tracking-wide italic">
          No advice. No judgment. Just clarity.
        </p>
      </div>
    </div>
  );
};

export default Landing;
