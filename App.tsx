
import React, { useState, useCallback } from 'react';
import { Step, UserData } from './types';
import Landing from './components/Landing';
import EmailStep from './components/EmailStep';
import AssessmentStep from './components/AssessmentStep';
import Results from './components/Results';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('landing');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    responses: {}
  });

  const handleStart = useCallback(() => {
    setStep('email');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleEmailSubmit = useCallback((name: string, email: string) => {
    setUserData(prev => ({ ...prev, name, email }));
    setStep('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAssessmentComplete = useCallback((responses: Record<string, string>) => {
    setUserData(prev => ({ ...prev, responses }));
    setStep('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderStep = () => {
    switch (step) {
      case 'landing':
        return <Landing onStart={handleStart} />;
      case 'email':
        return <EmailStep onNext={handleEmailSubmit} />;
      case 'assessment':
        return <AssessmentStep onComplete={handleAssessmentComplete} />;
      case 'results':
        return <Results userData={userData} />;
      default:
        return <Landing onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 sm:py-16 px-4 sm:px-6 bg-[#fcfcfc] text-[#1a1a1a]">
      <div className="w-full max-w-lg">
        {renderStep()}
      </div>
      <footer className="mt-auto pt-12 pb-6 text-center text-gray-400 text-[10px] uppercase tracking-[0.2em] font-medium">
        Relationship Clarity Check &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
