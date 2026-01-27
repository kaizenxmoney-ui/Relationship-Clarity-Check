
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-sm mx-auto">
      <div className="mb-10 text-center px-4">
        <h2 className="text-2xl font-medium text-gray-800 mb-3 font-serif">Before we begin</h2>
        <p className="text-gray-500 font-light italic text-sm">So I can send you your results.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">First Name</label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all text-base placeholder:text-gray-300 bg-white"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all text-base placeholder:text-gray-300 bg-white"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={!name || !email}
          className="w-full py-5 mt-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 font-medium tracking-wide active:scale-[0.98]"
        >
          Begin assessment
        </button>
      </form>
    </div>
  );
};

export default EmailStep;
