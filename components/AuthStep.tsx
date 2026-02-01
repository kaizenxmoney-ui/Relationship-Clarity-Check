
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface AuthStepProps {
  onAuthComplete: (name: string, email: string) => void;
}

const AuthStep: React.FC<AuthStepProps> = ({ onAuthComplete }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Use Passwordless Sign-in (Magic Link)
      // This sends an email to the user. We proceed to the assessment immediately
      // to keep the conversion flow high, assuming they can verify later if needed.
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          data: {
            full_name: name,
          },
          // You can specify a redirect URL here if needed
          // emailRedirectTo: window.location.origin,
        },
      });

      if (authError) throw authError;
      
      // Move user forward to the assessment immediately
      onAuthComplete(name, email);
    } catch (err: any) {
      console.error('Auth error:', err);
      // Even if there's an error (like rate limiting), we might want to let them 
      // proceed with the assessment as a guest to avoid losing the lead.
      // But for now, we show the error.
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-medium text-gray-800 mb-3 font-serif">
          Secure Your Results
        </h2>
        <p className="text-gray-500 font-light italic text-[14px]">
          Enter your details to begin. We'll send your private clarity report to this email once finished.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 px-1 transition-colors group-focus-within:text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-0 focus:border-gray-900 outline-none transition-all text-base placeholder:text-gray-300 bg-white shadow-sm appearance-none"
            placeholder="Your name"
          />
        </div>

        <div className="group">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 px-1 transition-colors group-focus-within:text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-0 focus:border-gray-900 outline-none transition-all text-base placeholder:text-gray-300 bg-white shadow-sm appearance-none"
            placeholder="you@example.com"
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs text-center font-medium animate-in fade-in">
            {error}
          </p>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading || !name || !email}
            className="w-full py-5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all duration-300 font-bold tracking-widest uppercase text-[13px] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] touch-manipulation flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Syncing...
              </span>
            ) : 'Begin assessment'}
          </button>
        </div>

        <div className="flex items-center justify-center pt-2">
          <svg className="w-3 h-3 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Privacy Guaranteed
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthStep;
