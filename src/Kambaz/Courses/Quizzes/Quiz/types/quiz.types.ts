// src/types/quiz.types.ts

import { Dispatch } from 'react';

// --- Data models ---

export interface AnswerOption {
  _id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  _id: string;
  quizId: string;
  quizType: string;
  question: string;           // HTML string
  answer: AnswerOption[];
  correctAnswer: string;      // _id of the correct option
  point: number;
  quizLevel: string;
}

export interface Quiz {
  id: string;
  title: string;
  instructions?: string;
  timeLimit?: number;
  multipleAttempts?: number; 
  questions: Question[];
}

export interface QuizResult {
  _id: string;
  quizId: string;
  userId: string;
  userAnswers: Record<string, string>;
  score: number;
  maxScore: number;
  percentage: number;
  submitted: boolean;
  submittedAt: string;
  attemptNumber : number;
}

export interface QuizResultPayload {
  quizId: string;
  userId: string;
  userAnswers: Record<string, string>;
}

// --- State & actions ---

export interface QuizState {
  quiz: Quiz | null;
  isLoading: boolean;
  error: string | null;
  currentQuestionIndex: number;
  userAnswers: Record<string, string>;
  submitted: boolean;
  submitting: boolean;    // Track submission in progress
  score: number;
  maxScore: number;
  lastSaved: Date;
  quizId: string;
  userId: string;
  reviewMode: boolean;
  attemptNumber: number;
  maxAttempts: number;
}

export type QuizAction =
  | { type: 'SET_QUIZ'; payload: Quiz }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_QUESTION'; payload: number }
  | { type: 'SAVE_ANSWER'; payload: { questionId: string; answerIndex: string } }
  | { type: 'LOAD_SAVED_ANSWERS'; payload: Record<string, string> }
  | { type: 'SUBMIT_QUIZ' }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'REVIEW_QUIZ' }
  | { type: 'SET_SCORE'; payload: { score: number; maxScore: number } }
  | { type: 'RESTORE_STATE'; payload: Partial<QuizState> }; // New action for restoring from sessionStorage
  | { type: 'START_NEW_ATTEMPT' };

export interface QuizContextType extends QuizState {
  dispatch: Dispatch<QuizAction>;
  saveAnswer: (questionId: string, answerId: string) => void;
  goToQuestion: (index: number) => void;
  goToPreviousQuestion: () => void;
  goToNextQuestion: () => void;
  submitQuiz: () => void;
  reviewQuiz: () => void;
  startNewAttempt: () => void;
}