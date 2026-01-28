
import React, { useState, useEffect } from 'react';
import { ALL_QUESTIONS } from '../constants';

interface AssessmentStepProps {
  onComplete: (responses: Record<string, string>) => void;
}

const AssessmentStep: React.FC<AssessmentStepProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [openText, setOpenText] = useState('');
  const [multiSelected, setMultiSelected] = useState<string[]>([]);

  const currentQuestion = ALL_QUESTIONS[currentIndex];
  const progress = Math.round((currentIndex / ALL_QUESTIONS.length) * 100);

  useEffect(() => {
    setMultiSelected([]);
    setOpenText('');
  }, [currentIndex]);

  const goToNext = (finalValue: string) => {
    const updatedResponses = { ...responses, [currentQuestion.id]: finalValue };
    setResponses(updatedResponses);

    if (currentIndex < ALL_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete(updatedResponses);
    }
  };

  const handleSingleSelect = (value: string) => {
    goToNext(value);
  };

  const handleToggleMulti = (value: string) => {
    setMultiSelected(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  const handleMultiSubmit = () => {
    if (multiSelected.length > 0) {
      goToNext(multiSelected.join(', '));
    }
  };

  const handleOpenSubmit = () => {
    goToNext(openText || "No response provided");
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-md mx-auto">
      <div className="mb-12">
        <div className="w-full bg-gray-100 h-1 rounded-full mb-4">
          <div 
            className="bg-gray-900 h-1 rounded-full transition-all duration-700 ease-in-out shadow-[0_0_8px_rgba(0,0,0,0.1)]" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold text-center">
          Step {currentIndex + 1} of {ALL_QUESTIONS.length}
        </p>
      </div>

      <div className="min-h-[340px] flex flex-col justify-start">
        <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mb-10 leading-[1.4] font-serif">
          {currentQuestion.text}
          {currentIndex === 0 && (
            <span className="block text-[13px] text-gray-400 mt-3 font-sans italic font-normal tracking-tight">
              This isn’t about right or wrong answers. Just respond honestly.
            </span>
          )}
          {currentQuestion.multiple && (
            <span className="block text-[11px] text-gray-400 mt-3 font-sans uppercase tracking-[0.15em] font-bold">Select all that apply</span>
          )}
        </h2>

        {(currentQuestion.type === 'standard' || currentQuestion.type === 'qualifying') && currentQuestion.options && (
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {currentQuestion.options.map((opt) => {
              const isSelected = currentQuestion.multiple && multiSelected.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => currentQuestion.multiple ? handleToggleMulti(opt) : handleSingleSelect(opt)}
                  className={`w-full p-5 text-left border rounded-2xl transition-all duration-200 text-[15px] sm:text-base shadow-sm touch-manipulation ${
                    isSelected 
                      ? 'border-gray-900 bg-gray-900 text-white shadow-md scale-[1.01]' 
                      : 'border-gray-200 bg-white hover:border-gray-400 active:bg-gray-50 text-gray-700 font-light'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="pr-4">{opt}</span>
                    {currentQuestion.multiple && (
                      <div className={`shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'border-white bg-white' : 'border-gray-300'}`}>
                        {isSelected && <div className="w-2.5 h-2.5 bg-gray-900 rounded-sm" />}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
            
            {currentQuestion.multiple && (
              <button
                onClick={handleMultiSubmit}
                disabled={multiSelected.length === 0}
                className="w-full py-5 mt-6 bg-gray-900 text-white rounded-xl hover:bg-black disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 font-bold tracking-widest uppercase text-[13px] shadow-lg active:scale-[0.98] touch-manipulation"
              >
                Continue
              </button>
            )}
          </div>
        )}

        {currentQuestion.type === 'open' && (
          <div className="space-y-6">
            <textarea
              value={openText}
              onChange={(e) => setOpenText(e.target.value)}
              className="w-full p-5 border border-gray-200 rounded-2xl focus:ring-0 focus:border-gray-900 outline-none min-h-[220px] font-light text-[15px] text-gray-700 bg-white shadow-sm appearance-none leading-relaxed"
              placeholder="Write as little or as much as you need..."
            />
            <button
              onClick={handleOpenSubmit}
              className="w-full py-5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all duration-300 font-bold tracking-widest uppercase text-[13px] shadow-lg active:scale-[0.98] touch-manipulation"
            >
              See my results
            </button>
          </div>
        )}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className="mt-14 text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-gray-900 transition-colors inline-flex items-center py-2 group"
        >
          <span className="mr-2 text-lg leading-none transition-transform group-hover:-translate-x-1">←</span> Back to previous
        </button>
      )}
    </div>
  );
};

export default AssessmentStep;
