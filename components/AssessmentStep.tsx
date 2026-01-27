
import React, { useState } from 'react';
import { ALL_QUESTIONS } from '../constants';

interface AssessmentStepProps {
  onComplete: (responses: Record<string, string>) => void;
}

const AssessmentStep: React.FC<AssessmentStepProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [openText, setOpenText] = useState('');

  const currentQuestion = ALL_QUESTIONS[currentIndex];
  const progress = Math.round((currentIndex / ALL_QUESTIONS.length) * 100);

  const handleSelect = (value: string) => {
    const updatedResponses = { ...responses, [currentQuestion.id]: value };
    setResponses(updatedResponses);

    if (currentIndex < ALL_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete(updatedResponses);
    }
  };

  const handleOpenSubmit = () => {
    const updatedResponses = { ...responses, [currentQuestion.id]: openText };
    setResponses(updatedResponses);
    onComplete(updatedResponses);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-10 sm:mb-12">
        <div className="w-full bg-gray-100 h-1 rounded-full mb-3">
          <div 
            className="bg-gray-800 h-1 rounded-full transition-all duration-700 ease-in-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold text-center">
          {currentIndex + 1} of {ALL_QUESTIONS.length}
        </p>
      </div>

      <div className="min-h-[300px] flex flex-col justify-start">
        <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mb-8 sm:mb-10 leading-snug font-serif">
          {currentQuestion.text}
        </h2>

        {(currentQuestion.type === 'standard' || currentQuestion.type === 'qualifying') && currentQuestion.options && (
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className="w-full p-4 sm:p-5 text-left border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 text-gray-700 font-light text-base shadow-sm"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type === 'open' && (
          <div className="space-y-6">
            <textarea
              value={openText}
              onChange={(e) => setOpenText(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none min-h-[180px] font-light text-base text-gray-700 bg-white shadow-sm"
              placeholder="Write as little or as much as you need..."
            />
            <button
              onClick={handleOpenSubmit}
              className="w-full py-5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 font-medium tracking-wide active:scale-[0.98]"
            >
              See my results
            </button>
          </div>
        )}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className="mt-12 text-gray-400 text-[11px] uppercase tracking-widest font-bold hover:text-gray-600 transition-colors inline-flex items-center"
        >
          <span className="mr-2 text-sm">←</span> Previous question
        </button>
      )}
    </div>
  );
};

export default AssessmentStep;
