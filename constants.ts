
import { Question } from './types';

export const STANDARDS_QUESTIONS: Question[] = [
  { 
    id: 'q1', 
    text: 'Do you feel calm most of the time in your relationship?', 
    type: 'standard',
    options: ['Almost always', 'Usually', 'Rarely', 'Never']
  },
  { 
    id: 'q2', 
    text: 'Do you feel respected even during conflict?', 
    type: 'standard',
    options: ['Always', 'Mostly', 'Seldom', 'Not at all']
  },
  { 
    id: 'q3', 
    text: 'Do you feel like you don’t have to guess where you stand?', 
    type: 'standard',
    options: ['I always know', 'Mostly clear', 'Often guessing', 'Completely lost']
  },
  { 
    id: 'q4', 
    text: 'Do you feel your boundaries are taken seriously?', 
    type: 'standard',
    options: ['Respectfully', 'Usually', 'Sometimes', 'They are ignored']
  },
  { 
    id: 'q5', 
    text: 'Do you feel like yourself, not smaller?', 
    type: 'standard',
    options: ['Always myself', 'Mostly', 'Sometimes smaller', 'I feel invisible']
  },
  { 
    id: 'q6', 
    text: 'Do you feel emotionally safe expressing concerns?', 
    type: 'standard',
    options: ['Completely safe', 'Mostly safe', 'I hesitate', 'I stay silent']
  },
  { 
    id: 'q7', 
    text: 'Do you feel decisions are made together, not forced?', 
    type: 'standard',
    options: ['Full partnership', 'Mostly together', 'Often one-sided', 'I have no say']
  },
  { 
    id: 'q8', 
    text: 'Do you trust that your partner has your best interests at heart?', 
    type: 'standard',
    options: ['Unshakeable', 'Usually', 'I have doubts', 'Not at all']
  },
];

export const QUALIFYING_QUESTIONS: Question[] = [
  {
    id: 'situ',
    text: 'Which best describes your current situation?',
    type: 'qualifying',
    options: ['In a relationship', 'Recently separated', 'Unsure what to do', 'Emotionally detached but still staying']
  },
  {
    id: 'want',
    text: 'What do you want most right now?',
    type: 'qualifying',
    options: ['Clarity', 'Peace', 'Confidence in my decision', 'To stop overthinking']
  },
  {
    id: 'hard',
    text: 'What feels hardest for you?',
    type: 'qualifying',
    options: ['Letting go', 'Speaking up', 'Trusting my judgment', 'Fear of regret']
  },
  {
    id: 'supp',
    text: 'What kind of support feels right?',
    type: 'qualifying',
    options: ['Something to read and reflect on', 'Structured guidance', 'Just understanding what’s happening']
  },
  {
    id: 'open',
    text: 'Anything else you want to say?',
    type: 'open'
  }
];

export const ALL_QUESTIONS = [...STANDARDS_QUESTIONS, ...QUALIFYING_QUESTIONS];

export const RESPONSE_OPTIONS = ['Yes', 'Sometimes', 'Rarely', 'Not at all'];
