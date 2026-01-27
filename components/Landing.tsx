
import React from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="text-center animate-in fade-in duration-1000">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-6 sm:mb-8 text-gray-800 leading-tight font-serif px-2">
        If you’re scrolling after an argument, this will help you think clearly.
      </h1>
      
      <div className="space-y-6 text-base sm:text-lg text-gray-600 font-light mb-10 sm:mb-12 leading-relaxed">
        <p>
          Feeling confused in your relationship? This helps you slow things down.
        </p>
        <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 max-w-sm mx-auto">
          <p className="font-medium text-gray-800 mb-4 text-sm uppercase tracking-wider">
            Discover through 12 questions:
          </p>
          <ul className="space-y-3 list-none text-left">
            <li className="flex items-start">
              <span className="mr-3 text-gray-400 select-none">•</span>
              <span>Why you feel unsettled</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-gray-400 select-none">•</span>
              <span>What’s actually happening</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-gray-400 select-none">•</span>
              <span>What your next step should be</span>
            </li>
          </ul>
        </div>
        <p className="text-[11px] text-gray-400 uppercase tracking-[0.15em] font-medium pt-2">
          3 minutes • Free • Private
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-full sm:w-auto px-10 py-4 sm:py-5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 tracking-wide font-medium shadow-md active:scale-95"
      >
        Start the clarity check
      </button>
    </div>
  );
};

export default Landing;
