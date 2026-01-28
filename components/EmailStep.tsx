
import React, { useState } from 'react';

interface EmailStepProps {
  onNext: (name: string, email: string) => void;
}

const EmailStep: React.FC<EmailStepProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onNext(name, email);
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
          <label htmlFor="name" className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 px-1 transition-colors group-focus-within:text-gray-600">First Name</label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-0 focus:border-gray-900 outline-none transition-all text-base placeholder:text-gray-300 bg-white shadow-sm appearance-none"
            placeholder="Your name"
          />
        </div>
        <div className="group">
          <label htmlFor="email" className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 px-1 transition-colors group-focus-within:text-gray-600">Email Address</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-0 focus:border-gray-900 outline-none transition-all text-base placeholder:text-gray-300 bg-white shadow-sm appearance-none"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={!name || !email}
          className="w-full py-5 mt-6 bg-gray-900 text-white rounded-xl hover:bg-black disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 font-bold tracking-widest uppercase text-[13px] shadow-lg active:scale-[0.98] touch-manipulation"
        >
          Begin assessment
        </button>
      </form>
    </div>
  );
};

export default EmailStep;
