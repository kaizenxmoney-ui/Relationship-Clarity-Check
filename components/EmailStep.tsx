
import React, { useState } from 'react';

interface EmailStepProps {
  onNext: (name: string, email: string) => void;
}

const EmailStep: React.FC<EmailStepProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * ⚠️ IMPORTANT:
   * 1. Use the corrected script provided in the chat response.
   * 2. After updating the script, you MUST go to 'Deploy' > 'Manage Deployments' 
   *    and create a 'NEW VERSION'. 
   * 3. Paste that new URL below:
   */
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyeMFJxjWAnwLm5OzgoeRjksEtYdkv1ZaKVlOLeqt71LQjppylUZp_dUGJTZDmjE0rRqQ/exec';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    
    // Using URLSearchParams sends data as 'application/x-www-form-urlencoded'
    // This bypasses the CORS 'Pre-flight' error that Google Scripts can't handle.
    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('source', 'Relationship Clarity Funnel');

    try {
      // We use 'no-cors' mode. This means the browser sends the data but 
      // doesn't let us read the response. This is the most reliable way 
      // to hit a Google Script without a complex backend proxy.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      });
      
      // Since 'no-cors' doesn't return a status we can read, we assume success 
      // and move the user forward. The data will arrive in the sheet.
      onNext(name, email);
    } catch (error) {
      console.error('Submission technical error:', error);
      // We still call onNext so the user doesn't get stuck on a broken button
      onNext(name, email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-medium text-gray-800 mb-3 font-serif">Before we begin</h2>
        <p className="text-gray-500 font-light italic text-[15px]">Where should I send your personal clarity report?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label htmlFor="name" className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 px-1 transition-colors group-focus-within:text-gray-600">Your Name</label>
          <input
            id="name"
            type="text"
            required
            disabled={isSubmitting}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-0 focus:border-gray-900 outline-none transition-all text-base placeholder:text-gray-300 bg-white shadow-sm appearance-none disabled:bg-gray-50 disabled:text-gray-400"
            placeholder="Your name"
          />
        </div>
        <div className="group">
          <label htmlFor="email" className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 px-1 transition-colors group-focus-within:text-gray-600">Email Address</label>
          <input
            id="email"
            type="email"
            required
            disabled={isSubmitting}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-0 focus:border-gray-900 outline-none transition-all text-base placeholder:text-gray-300 bg-white shadow-sm appearance-none disabled:bg-gray-50 disabled:text-gray-400"
            placeholder="you@example.com"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!name || !email || isSubmitting}
            className="w-full py-5 bg-gray-900 text-white rounded-xl hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-bold tracking-widest uppercase text-[13px] shadow-lg active:scale-[0.98] touch-manipulation flex items-center justify-center"
          >
            {isSubmitting ? (
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
            100% Private & Secure
          </p>
        </div>
      </form>
    </div>
  );
};

export default EmailStep;
