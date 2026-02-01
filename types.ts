
export type Step = 'landing' | 'auth' | 'assessment' | 'loading' | 'results';

export type ResponseValue = 'Yes' | 'Sometimes' | 'Rarely' | 'Not at all';

export interface Question {
  id: string;
  text: string;
  type: 'standard' | 'qualifying' | 'open';
  options?: string[];
  multiple?: boolean;
}

export interface UserData {
  name: string;
  email: string;
  responses: Record<string, string>;
}

export interface ClarityInsight {
  title: string;
  description: string;
}

export interface ResultContent {
  headline: string;
  subHeadline: string;
  insights: {
    label: string;
    text: string;
  }[];
}
