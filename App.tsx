
import React, { useState, useCallback, useEffect } from 'react';
import { Step, UserData } from './types';
import { supabase } from './lib/supabase';
import Landing from './components/Landing';
import AuthStep from './components/AuthStep';
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

  useEffect(() => {
    // Check for existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserData(prev => ({
          ...prev,
          email: session.user.email || '',
          name: session.user.user_metadata.full_name || 'User'
        }));
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserData(prev => ({
          ...prev,
          email: session.user.email || '',
          name: session.user.user_metadata.full_name || 'User'
        }));
      } else {
        setUserData({ name: '', email: '', responses: {} });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleStart = useCallback(() => {
    // If we already have a user, jump straight to assessment
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setStep('assessment');
      } else {
        setStep('auth');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, []);

  const handleAuthComplete = useCallback((name: string, email: string) => {
    setUserData(prev => ({ ...prev, name, email }));
    setStep('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAssessmentComplete = useCallback(async (responses: Record<string, string>) => {
    // Update local state
    const finalUserData = { ...userData, responses };
    setUserData(finalUserData);
    
    // Transition UI
    setStep('loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Persist to Supabase
    try {
      const { error } = await supabase
        .from('assessments')
        .insert([
          { 
            name: finalUserData.name, 
            email: finalUserData.email, 
            responses: finalUserData.responses 
          }
        ]);
      
      if (error) {
        console.error('Persistence error:', error.message);
      } else {
        console.log('Assessment successfully stored.');
      }
    } catch (err) {
      console.error('Failed to connect to backend:', err);
    }

    // Results transition
    setTimeout(() => {
      setStep('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 8500);
  }, [userData]);

  const renderStep = () => {
    switch (step) {
      case 'landing':
        return <Landing onStart={handleStart} />;
      case 'auth':
        return <AuthStep onAuthComplete={handleAuthComplete} />;
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
