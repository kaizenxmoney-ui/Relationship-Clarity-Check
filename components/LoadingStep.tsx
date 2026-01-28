
import React, { useEffect, useState } from 'react';

const LoadingStep: React.FC = () => {
  const [dots, setDots] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);

  const statusMessages = [
    "Synthesizing your patterns",
    "Reviewing emotional baselines",
    "Identifying conflict triggers",
    "Comparing response consistency",
    "Calculating self-respect metrics",
    "Finalizing clarity insights"
  ];

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % statusMessages.length);
    }, 1500);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(messageInterval);
    };
  }, [statusMessages.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-in fade-in duration-700">
      <div className="relative mb-12">
        {/* Aesthetic pulsing ring */}
        <div className="w-20 h-20 border-2 border-gray-100 rounded-full animate-ping absolute inset-0 opacity-20" />
        <div className="w-20 h-20 border-t-2 border-gray-900 rounded-full animate-spin duration-[2000ms]" />
      </div>
      
      <h2 className="text-2xl font-medium text-gray-800 mb-6 font-serif h-8">
        Analyzing your report{dots}
      </h2>
      
      <div className="h-6">
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold animate-pulse transition-all duration-500">
          {statusMessages[messageIndex]}
        </p>
      </div>
    </div>
  );
};

export default LoadingStep;
