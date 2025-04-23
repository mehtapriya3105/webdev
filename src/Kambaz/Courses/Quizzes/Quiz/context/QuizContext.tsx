import React, {
  createContext,
  useReducer,
  useEffect,
  useRef,
  ReactNode
} from 'react';
import { postResult } from '../utils/quizApi';
import {
  Quiz,
  QuizState,
  QuizAction,
  QuizContextType
} from '../types/quiz.types';
import {
  calculateMaxScore,
  calculateScore
} from '../utils/quizUtils';
// import {
//   saveAnswersToStorage,
//   loadAnswersFromStorage,
//   markQuizCompleted,
//   isQuizCompleted
// } from '../utils/localStorage';

// Session storage keys
const SESSION_KEYS = {
  QUIZ_STATE: (quizId: string, userId: string) => `quiz_state_${quizId}_${userId}`
};

// Save state to sessionStorage
const saveStateToSession = (quizId: string, userId: string, state: Partial<QuizState>): void => {
  try {
    sessionStorage.setItem(
      SESSION_KEYS.QUIZ_STATE(quizId, userId),
      JSON.stringify(state)
    );
  } catch (error) {
    console.error('Error saving state to sessionStorage:', error);
  }
};

// Load state from sessionStorage
const loadStateFromSession = (quizId: string, userId: string): Partial<QuizState> | null => {
  try {
    const storedData = sessionStorage.getItem(SESSION_KEYS.QUIZ_STATE(quizId, userId));
    if (!storedData) return null;
    const state = JSON.parse(storedData);
    return state;
  } catch (error) {
    console.error('Error loading state from sessionStorage:', error);
    return null;
  }
};

// Create context
export const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Initial state
const initialState: QuizState = {
  quiz: null,
  isLoading: true,
  error: null,
  currentQuestionIndex: 0,
  userAnswers: {} as Record<string, string>,
  submitted: false,
  score: 0,
  maxScore: 0,
  lastSaved: new Date(),
  quizId: '',
  userId: '',
  reviewMode: false,
  submitting: false
};

// Action types
export const ACTIONS = {
  SET_QUIZ: 'SET_QUIZ' as const,
  SET_LOADING: 'SET_LOADING' as const,
  SET_ERROR: 'SET_ERROR' as const,
  SET_CURRENT_QUESTION: 'SET_CURRENT_QUESTION' as const,
  SAVE_ANSWER: 'SAVE_ANSWER' as const,
  SUBMIT_QUIZ: 'SUBMIT_QUIZ' as const,
  SET_SUBMITTING: 'SET_SUBMITTING' as const,
  REVIEW_QUIZ: 'REVIEW_QUIZ' as const,
  SET_SCORE: 'SET_SCORE' as const,
  LOAD_SAVED_ANSWERS: 'LOAD_SAVED_ANSWERS' as const,
  RESTORE_STATE: 'RESTORE_STATE' as const,
  START_NEW_ATTEMPT: 'START_NEW_ATTEMPT' as const,
};

// Initialize answers
const initializeUserAnswers = (quiz: Quiz | null): Record<string, string> => {
  if (!quiz) return {} as Record<string, string>;
  return quiz.questions.reduce(
    (acc, q) => ({ ...acc, [q._id]: '' }),
    {} as Record<string, string>
  );
};

// Reducer
const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case ACTIONS.SET_QUIZ:
      return {
        ...state,
        quiz: action.payload,
        maxScore: calculateMaxScore(action.payload),
        userAnswers: initializeUserAnswers(action.payload),
        isLoading: false
      };

    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };

    case ACTIONS.SET_CURRENT_QUESTION:
      return { ...state, currentQuestionIndex: action.payload };

      case ACTIONS.START_NEW_ATTEMPT:
  return {
    ...state,
    submitted: false,
    userAnswers: initializeUserAnswers(state.quiz),
    reviewMode: false,
    currentQuestionIndex: 0
  };

    case ACTIONS.SAVE_ANSWER:
      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [action.payload.questionId]: action.payload.answerIndex
        },
        lastSaved: new Date()
      };

    case ACTIONS.LOAD_SAVED_ANSWERS:
      return {
        ...state,
        userAnswers: action.payload,
        lastSaved: new Date()
      };

    case ACTIONS.SET_SUBMITTING:
      return {
        ...state,
        submitting: action.payload
      };

    case ACTIONS.SUBMIT_QUIZ: {
      // Always calculate score on submission to ensure it's correct
      if (state.quiz) {
        const { score } = calculateScore(state.quiz, state.userAnswers);
        const maxScore = calculateMaxScore(state.quiz);

        return {
          ...state,
          submitted: true,
          submitting: false,
          score,
          maxScore,
          lastSaved: new Date(),
          reviewMode: false
        };
      }
      return {
        ...state,
        submitted: true,
        submitting: false,
        reviewMode: false
      };
    }

    case ACTIONS.REVIEW_QUIZ:
      return {
        ...state,
        reviewMode: true
      };

    case ACTIONS.SET_SCORE:
      return {
        ...state,
        score: action.payload.score,
        maxScore: action.payload.maxScore
      };

    case ACTIONS.RESTORE_STATE:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };

    default:
      return state;
  }
};

// Provider props
interface QuizProviderProps {
  children: ReactNode;
  quizId: string;
  userId: string;
}



// Context provider
export const QuizProvider: React.FC<QuizProviderProps> = ({
  children,
  quizId,
  userId
}) => {
  // Try to load saved state from sessionStorage first
  const savedState = loadStateFromSession(quizId, userId);
  

  // Create initial state with loaded session data if available
  const initialStateWithSession = savedState ? {
    ...initialState,
    quizId,
    userId,
    isLoading: false,
    quiz: savedState.quiz || null,
    userAnswers: savedState.userAnswers || {},
    submitted: savedState.submitted || false,
    score: savedState.score || 0,
    maxScore: savedState.maxScore || 0,
    reviewMode: savedState.reviewMode || false,
    currentQuestionIndex: savedState.currentQuestionIndex || 0,
    lastSaved: savedState.lastSaved ? new Date(savedState.lastSaved) : new Date()
  } : {
    ...initialState,
    quizId,
    userId
  };

  const [state, dispatch] = useReducer(quizReducer, initialStateWithSession);

  // Track if we've already submitted to prevent duplicate submissions
  const hasSubmittedRef = useRef(savedState?.submitted || false);

  // Flag to track if we've loaded data
  const dataLoadedRef = useRef(!!savedState);

  useEffect(() => {
    if (state.quiz && state.submitted && state.score === 0 && state.maxScore === 0) {
      const { score } = calculateScore(state.quiz, state.userAnswers);
      const maxScore = calculateMaxScore(state.quiz);

      dispatch({
        type: ACTIONS.SET_SCORE,
        payload: { score, maxScore }
      });
    }
  }, [state.quiz, state.submitted, state.score, state.maxScore, state.userAnswers, dispatch]);

  // Save state to sessionStorage whenever important parts change
  // useEffect(() => {
  //   if (state.quiz) {
  //     saveStateToSession(quizId, userId, {
  //       quiz: state.quiz,
  //       userAnswers: state.userAnswers,
  //       submitted: state.submitted,
  //       score: state.score,
  //       maxScore: state.maxScore,
  //       reviewMode: state.reviewMode,
  //       currentQuestionIndex: state.currentQuestionIndex
  //     });
  //   }
  // }, [
  //   state.quiz,
  //   state.userAnswers,
  //   state.submitted,
  //   state.score,
  //   state.maxScore,
  //   state.reviewMode,
  //   state.currentQuestionIndex,
  //   quizId,
  //   userId
  // ]);

  

  // Save answers to localStorage whenever they change
  // useEffect(() => {
  //   if (state.quiz && !state.submitted && Object.keys(state.userAnswers).length > 0) {
  //     saveAnswersToStorage(quizId, userId, state.userAnswers);
  //   }
  // }, [state.userAnswers, state.quiz, state.submitted, quizId, userId]);

  // // Load saved answers from localStorage on initial load
  // useEffect(() => {
  //   if (!dataLoadedRef.current && state.quiz && !state.submitted) {
  //     const savedAnswers = loadAnswersFromStorage(quizId, userId);
  //     if (savedAnswers && Object.keys(savedAnswers).length > 0) {
  //       dispatch({
  //         type: ACTIONS.LOAD_SAVED_ANSWERS,
  //         payload: savedAnswers
  //       });
  //     }
  //     dataLoadedRef.current = true;
  //   }
  // }, [state.quiz, state.submitted, quizId, userId]);

  // // Post to backend on submit
  // useEffect(() => {
  //   if (state.submitted && state.quiz && !state.reviewMode && !hasSubmittedRef.current) {
  //     // Mark as submitted to prevent multiple API calls
  //     hasSubmittedRef.current = true;

  //     // Submit to server
  //     postResult({
  //       quizId,
  //       userId,
  //       userAnswers: state.userAnswers
  //     })
  //       .then(() => {
  //         // On successful submission, mark as completed in localStorage
  //         markQuizCompleted(quizId, userId);
  //       })
  //       .catch((err) => {
  //         console.error('Error posting quiz result:', err);
  //         // Reset submission flag if there was an error
  //         hasSubmittedRef.current = false;
  //       });
  //   }
  // }, [state.submitted, state.quiz, state.userAnswers, state.reviewMode, quizId, userId]);

  // This is the updated submit effect from QuizContext.tsx
// Add or replace this section in your QuizContext.tsx file

// Post to backend on submit
useEffect(() => {
  if (state.submitted && state.quiz && !state.reviewMode && !hasSubmittedRef.current) {
    // Mark as submitted to prevent multiple API calls
    hasSubmittedRef.current = true;

    // Calculate score before submitting (ensure we have the correct values)
    const { score } = calculateScore(state.quiz, state.userAnswers);
    const maxScore = calculateMaxScore(state.quiz);
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    // Submit to server with complete data
    postResult({
      quizId,
      userId,
      userAnswers: state.userAnswers,
      score,
      maxScore,
      percentage,
      submitted: true,
      submittedAt: new Date().toISOString()
    })
      .then((result) => {
        console.log("Quiz result successfully submitted:", result);
        
        // Update local state with the returned result
        dispatch({
          type: ACTIONS.SET_SCORE,
          payload: { score: result.score, maxScore: result.maxScore }
        });
        
        // On successful submission, mark as completed in localStorage
        // markQuizCompleted(quizId, userId);
      })
      .catch((err) => {
        console.error('Error posting quiz result:', err);
        // Reset submission flag if there was an error
        hasSubmittedRef.current = false;
      });
  }
}, [state.submitted, state.quiz, state.userAnswers, state.reviewMode, quizId, userId, dispatch]);

  // Context actions
  const saveAnswer = (questionId: string, answerIndex: string) => {
    // Don't allow changing answers in review mode or if submitting
    if (state.submitted || state.submitting) return;

    dispatch({
      type: ACTIONS.SAVE_ANSWER,
      payload: { questionId, answerIndex }
    });
  };

  const startNewAttempt = () => {
    hasSubmittedRef.current = false;
    dispatch({ type: ACTIONS.START_NEW_ATTEMPT });
  };

  const goToQuestion = (index: number) => {
    dispatch({ type: ACTIONS.SET_CURRENT_QUESTION, payload: index });
  };

  const goToPreviousQuestion = () => {
    dispatch({
      type: ACTIONS.SET_CURRENT_QUESTION,
      payload: Math.max(state.currentQuestionIndex - 1, 0)
    });
  };

  const goToNextQuestion = () => {
    if (state.quiz) {
      dispatch({
        type: ACTIONS.SET_CURRENT_QUESTION,
        payload: Math.min(state.currentQuestionIndex + 1, state.quiz.questions.length - 1)
      });
    }
  };

  // const submitQuiz = () => {
  //   // Check if already submitted (from localStorage or elsewhere)
  //   if (isQuizCompleted(quizId, userId)) {
  //     return;
  //   }

  //   // Prevent multiple submissions
  //   if (state.submitting || state.submitted) {
  //     return;
  //   }

  //   if (!state.quiz) return;

  //   const unanswered = state.quiz.questions.filter(
  //     (q) => !state.userAnswers[q._id]
  //   );

  //   if (
  //     unanswered.length > 0 &&
  //     !window.confirm(
  //       `You have ${unanswered.length} unanswered question(s). Submit anyway?`
  //     )
  //   ) {
  //     return;
  //   }

  //   // Set submitting state first
  //   dispatch({ type: ACTIONS.SET_SUBMITTING, payload: true });

  //   // Use a small timeout to allow React to update the UI
  //   setTimeout(() => {
  //     dispatch({ type: ACTIONS.SUBMIT_QUIZ });
  //   }, 100);
  // };

  const reviewQuiz = () => {
    dispatch({ type: ACTIONS.REVIEW_QUIZ });
  };

  // Build context value
  const contextValue: QuizContextType = {
    ...state,
    startNewAttempt,
    dispatch,
    saveAnswer,
    goToQuestion,
    goToPreviousQuestion,
    goToNextQuestion,
    // submitQuiz,
    reviewQuiz
  };

  return <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>;
};