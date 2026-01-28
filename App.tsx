
import React, { useState, useCallback } from 'react';
import { Step, UserData } from './types';
import Landing from './components/Landing';
import EmailStep from './components/EmailStep';
import AssessmentStep from './components/AssessmentStep';
import LoadingStep from './components/LoadingStep';
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
    setStep('loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setStep('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 8500);
  }, []);

  const renderStep = () => {
    switch (step) {
      case 'landing':
        return <Landing onStart={handleStart} />;
      case 'email':
        return <EmailStep onNext={handleEmailSubmit} />;
      case 'assessment':
        return <AssessmentStep onComplete={handleAssessmentComplete} />;
      case 'loading':
        return <LoadingStep />;
      case 'results':
        return <Results userData={userData} />;
      default:
        return <Landing onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#fcfcfc] text-[#1a1a1a] selection:bg-gray-200">
      <main className="w-full max-w-[440px] px-6 pt-12 pb-24 sm:pt-20 sm:pb-32 flex-grow">
        {renderStep()}
      </main>
      <footer className="w-full max-w-lg py-8 text-center">
        <p className="text-gray-400 text-[9px] uppercase tracking-[0.3em] font-bold">
          Confidential Clarity Check &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default App;
