
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

    const situ = userData.responses['situ'] || "";
    const want = userData.responses['want'] || "";
    const hard = userData.responses['hard'] || "";
    
    let headline = "";
    let subHeadline = "";
    let insights: { label: string; text: string }[] = [];

    if (score >= 18) {
      if (situ.includes('detached') || hard === 'Fear of regret') {
        headline = "You are currently living in a 'waiting room' state, hoping for a change that your intuition already knows won't come.";
        subHeadline = "It's understandable to wait for a sign, but your exhaustion is a sign in itself. You aren't the only one who has hoped for change.";
        insights = [
          { label: "The Pattern", text: "You've stayed long enough for the dysfunction to feel like a baseline. Your body is tired even when your mind is trying to solve the puzzle." },
          { label: "The Identity Cost", text: "You are editing yourself so heavily to maintain the relationship that you are starting to lose track of what you actually value." },
          { label: "The Hard Truth", text: "Fear of regret is keeping you in a situation that is actively generating the very regret you are trying to avoid." }
        ];
      } else if (situ === 'Recently separated') {
        headline = "The exhaustion you feel is the sudden release of years of emotional management.";
        subHeadline = "Transitioning from constant management to quiet is a shock. Many men before you have felt this specific kind of heavy silence.";
        insights = [
          { label: "What this shows", text: "You weren't just in a relationship; you were in a full-time role as a shock absorber for someone else's instability." },
          { label: "The Reality Check", text: "Missing them is often just your brain craving the familiar stress cycles it has been conditioned to survive." },
          { label: "Next Step", text: "Clarity won't come from 'moving on' yet; it comes from documenting exactly how much you were actually tolerating." }
        ];
      } else {
        headline = "Your standards haven't been 'lowered'—they've been systematically ignored until you stopped speaking them.";
        subHeadline = "Compromising your core shouldn't be the price of a relationship. You are rediscovering what you deserve.";
        insights = [
          { label: "The Core Issue", text: "You've mistaken 'being a good partner' for 'being a silent partner.' You are carrying the weight of two people's emotional needs." },
          { label: "Where Peace is Blocked", text: "You are waiting for permission to be happy, but that permission must come from the version of you that used to have boundaries." },
          { label: "The Path Forward", text: "Start with small, non-negotiable standards for your own time and space before trying to fix the larger dynamic." }
        ];
      }
    } else if (score >= 10) {
      if (want.includes('Peace') && hard === 'Speaking up') {
        headline = "You are trading your internal peace for external quiet, and it's starting to cost you your self-respect.";
        subHeadline = "Silence isn't always peace. Thousands of people are currently learning how to speak their truth again, just like you.";
        insights = [
          { label: "The Observation", text: "Things are 'good enough' to stay but 'bad enough' to keep you checking your phone for advice or scrolling for answers." },
          { label: "The Conflict", text: "You are highly sensitive to your partner's moods, which has turned you into an expert at 'pre-emptive management' rather than direct communication." },
          { label: "The Insight", text: "A relationship that requires you to walk on eggshells is not a partnership; it's a performance." }
        ];
      } else if (hard === 'Trusting my judgment') {
        headline = "Your judgment is fine; your environment is simply designed to make you second-guess it.";
        subHeadline = "You aren't losing your mind; you're just in an environment that makes it hard to trust your own eyes.";
        insights = [
          { label: "The Reality", text: "Inconsistency (the 'hot and cold' cycle) is scientifically proven to create the most addictive and confusing emotional bonds." },
          { label: "The Pattern", text: "You are focused on 'potential'—the person they are at their best—rather than the person they are during a Tuesday afternoon argument." },
          { label: "What's Missing", text: "Consistency is a baseline requirement, not a bonus feature. You are currently treating basic respect as a reward." }
        ];
      } else {
        headline = "You are currently in the 'Gray Zone'—where the good days provide just enough oxygen to survive the bad ones.";
        subHeadline = "The gray zone is where most people live before they decide they want something better. This is part of your journey.";
        insights = [
          { label: "What this shows", text: "You're not looking for a way out; you're looking for a way for things to finally make sense. But logic cannot fix a values mismatch." },
          { label: "The Standard", text: "A healthy relationship should be a safe harbor, not the primary source of your stress." },
          { label: "The Shift", text: "Stop asking 'How can I make them understand?' and start asking 'How much longer can I live like this?'" }
        ];
      }
    } else {
      if (want.includes('Clarity') || hard === 'Fear of regret') {
        headline = "You already have the clarity you need; you are simply waiting for it to feel less painful.";
        subHeadline = "Facing the truth doesn't make the pain a mistake. It's a common step on the path to real stability.";
        insights = [
          { label: "The Observation", text: "You have strong standards, but you are currently making an 'exception' that is starting to feel like a new rule." },
          { label: "The Intuition", text: "Your 'overthinking' is actually just your intuition trying to get your attention about a boundary that was crossed." },
          { label: "The Insight", text: "Healthy relationships don't make you feel like you're losing your mind. If you feel 'crazy,' look at the behavior that triggered the feeling." }
        ];
      } else {
        headline = "You are standing at a threshold where your self-respect is finally outweighing your attachment.";
        subHeadline = "This quiet realization is a shared experience of everyone who has ever reclaimed their life.";
        insights = [
          { label: "What this shows", text: "You've done the work to be a better man, but you're realizing that you can't do the work for both people." },
          { label: "The Reality", text: "The friction you feel isn't 'failure'—it's your growth outstripping the current capacity of the relationship." },
          { label: "The Takeaway", text: "Clarity is often just the quiet realization that you are finished trying to prove your worth to someone who isn't looking." }
        ];
      }
    }

    return { headline, subHeadline, insights };
  }, [userData.responses]);

  return (
    <div className="animate-in fade-in duration-1000 space-y-16 pb-20">
      <div className="text-center px-2">
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.4em] mb-6 font-bold">Confidential Insight Report</p>
        <h2 className="text-2xl sm:text-3xl font-medium text-gray-800 leading-[1.35] max-w-lg mx-auto font-serif italic mb-4">
          "{result.headline}"
        </h2>
        <p className="text-[14px] sm:text-[15px] text-gray-500 font-light leading-relaxed max-w-md mx-auto italic">
          {result.subHeadline}
        </p>
      </div>

      <div className="space-y-12">
        {result.insights.map((insight, idx) => (
          <div key={idx} className="relative pl-7 sm:pl-9">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-100" />
            <div className="absolute left-0 top-1.5 w-[5px] h-[5px] bg-gray-900 rounded-full -translate-x-1/2" />
            
            <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400 mb-4">
              {insight.label}
            </h3>
            <p className="text-[16px] sm:text-[18px] text-gray-700 font-light leading-relaxed">
              {insight.text}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-[2rem] border border-gray-100 text-center shadow-sm mt-24">
        <div className="w-10 h-1 bg-gray-100 mx-auto mb-8 rounded-full" />
        <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6 italic">Next Steps</h3>
        <p className="text-base sm:text-lg text-gray-700 font-light mb-12 leading-relaxed whitespace-pre-line">
          “You don’t need motivation right now.
          You need something steady to think against when emotions spike.”
          {"\n\n"}
          I wrote a short guide for the moments when clarity starts slipping and you don’t want to lose yourself again.
        </p>
        <a
          href="https://ceox.gumroad.com/l/the-cost-of-staying" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full px-8 py-5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all duration-300 tracking-widest font-bold text-[13px] uppercase shadow-xl active:scale-95"
        >
          Read the Guide
        </a>
      </div>
    </div>
  );
};

export default Results;
