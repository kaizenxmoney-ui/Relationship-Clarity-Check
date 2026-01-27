
import React, { useMemo } from 'react';
import { UserData, ResultContent } from '../types';
import { STANDARDS_QUESTIONS } from '../constants';

interface ResultsProps {
  userData: UserData;
}

const Results: React.FC<ResultsProps> = ({ userData }) => {
  const result = useMemo((): ResultContent => {
    let score = 0;
    STANDARDS_QUESTIONS.forEach(q => {
      const responseValue = userData.responses[q.id];
      if (q.options) {
        const index = q.options.indexOf(responseValue);
        if (index !== -1) {
          score += index;
        }
      }
    });

    const situ = userData.responses['situ'];
    const want = userData.responses['want'];
    const hard = userData.responses['hard'];
    
    let headline = "";
    let insights: { label: string; text: string }[] = [];

    if (score >= 16) {
      if (situ === 'In a relationship') {
        headline = "You are currently prioritizing the survival of the relationship over your own well-being.";
      } else if (situ === 'Emotionally detached but still staying') {
        headline = "You have checked out emotionally because your standards were not invited to stay.";
      } else if (situ === 'Recently separated') {
        headline = "The weight you feel now is the realization of how much you were actually tolerating.";
      } else {
        headline = "You’re operating without clear standards right now.";
      }

      insights = [
        { label: "What this shows", text: "You have normalized environments that actively drain your peace of mind to avoid conflict." },
        { label: "Where clarity is missing", text: "The distinction between 'being patient' and 'losing your identity' has become dangerously blurred." },
        { label: "Where self-respect is being tested", text: "You are likely waiting for permission to value yourself as much as you value the dynamic." }
      ];
    } else if (score >= 8) {
      if (want === 'Peace') {
        headline = "The peace you're seeking is currently being blocked by the inconsistency you're tolerating.";
      } else if (situ === 'Unsure what to do') {
        headline = "Your hesitation is a conflict between the comfort of the familiar and the cost of the status quo.";
      } else if (hard === 'Speaking up') {
        headline = "Your silence isn't keeping the peace; it's just storing the conflict inside yourself.";
      } else {
        headline = "Your answers suggest you’re not confused. You’re experiencing inconsistency.";
      }

      insights = [
        { label: "What this shows", text: "Things work just well enough for you to stay, but the low points are slowly eroding your long-term confidence." },
        { label: "Where clarity is missing", text: "You are waiting for a pattern to break that might actually be the baseline of the relationship." },
        { label: "What you’re ignoring", text: "The gut feeling that says your basic needs shouldn't feel like 'extra' requests." }
      ];
    } else {
      if (hard === 'Trusting my judgment') {
        headline = "Your judgment is working perfectly; it's simply telling you something you aren't ready to hear yet.";
      } else if (want === 'Clarity') {
        headline = "You already have clarity; what you're actually seeking is the courage to act on it.";
      } else {
        headline = "What feels like confusion is actually your intuition asking for higher standards.";
      }

      insights = [
        { label: "What this shows", text: "You have a solid foundation, but specific recurring conflicts are triggering a protective mechanism." },
        { label: "Where clarity is missing", text: "You need to distinguish between a healthy growth period and a fundamental values clash." },
        { label: "What you already know", text: "You know what respect looks like; you just need to decide if this environment can sustain it." }
      ];
    }

    return { headline, insights };
  }, [userData.responses]);

  return (
    <div className="animate-in fade-in duration-1000 space-y-12 pb-16">
      <div className="text-center">
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] mb-4 font-bold">Personal Clarity Report</p>
        <h2 className="text-2xl sm:text-3xl font-medium text-gray-800 leading-tight max-w-lg mx-auto font-serif">
          {result.headline}
        </h2>
      </div>

      <div className="space-y-10">
        {result.insights.map((insight, idx) => (
          <div key={idx} className="border-l-2 border-gray-100 pl-6 py-1">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-3">
              {insight.label}
            </h3>
            <p className="text-base sm:text-lg text-gray-700 font-light leading-relaxed">
              {insight.text}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-2xl mt-16 border border-gray-100 text-center shadow-sm">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6 italic">A Calm Next Step</h3>
        <p className="text-base sm:text-lg text-gray-600 font-light mb-10 leading-relaxed italic">
          “If you want something calm to return to when emotions spike, I wrote a short guide for exactly this.”
        </p>
        <a
          href="https://ceox.gumroad.com/l/standards-for-men?wanted=true" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full sm:w-auto px-12 py-5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 tracking-wide font-medium shadow-md active:scale-95"
        >
          Read the guide
        </a>
      </div>
    </div>
  );
};

export default Results;
