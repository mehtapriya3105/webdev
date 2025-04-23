// import { Question, QuizResult, QuizResultPayload } from '../types/quiz.types';

// const API_BASE = 'http://localhost:4000/api';

// const cache = {
//   questions: new Map(),
//   results: new Map()
// };

// export async function fetchQuestions(quizId: string): Promise<Question[]> {
//   const cacheKey = `quiz_${quizId}`;
//   if (cache.questions.has(cacheKey)) {
//     return cache.questions.get(cacheKey);
//   }

//   try {
//     const res = await fetch(`${API_BASE}/quizzes/${quizId}/questions`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json'
//       },
//       cache: 'no-cache'
//     });

//     if (!res.ok) {
//       console.error(`Failed to fetch questions (Status: ${res.status})`);
//       throw new Error(`Failed to fetch questions (${res.status})`);
//     }

//     const data = await res.json();

//     cache.questions.set(cacheKey, data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching questions:', error);
//     throw error;
//   }
// }

// export async function fetchResult(
//   quizId: string,
//   userId: string
// ): Promise<QuizResult | null> {
//   const cacheKey = `result_${quizId}_${userId}`;
//   if (cache.results.has(cacheKey)) {
//     return cache.results.get(cacheKey);
//   }
  
//   try {
//     const res = await fetch(`${API_BASE}/quiz-results/${quizId}/${userId}`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json'
//       },
//       cache: 'no-cache'
//     });

//     if (res.status === 404) {
//       cache.results.set(cacheKey, null);
//       return null;
//     }

//     if (!res.ok) {
//       console.error(`Failed to fetch result (Status: ${res.status})`);
//       throw new Error(`Failed to fetch result (${res.status})`);
//     }

//     const data = await res.json();
//     cache.results.set(cacheKey, data);
//     console.log("data", data);  
//     return data;
//   } catch (error) {
//     console.error('Error fetching results:', error);
//     return null;
//   }
// }

// export async function postResult(
//   payload: QuizResultPayload
// ): Promise<QuizResult> {
//   if ((postResult as any).isSubmitting) {
//     return (postResult as any).lastResult;
//   }

//   try {
//     (postResult as any).isSubmitting = true;
//     const cleanedAnswers = { ...payload.userAnswers };
//     Object.keys(cleanedAnswers).forEach(key => {
//       if (!cleanedAnswers[key]) {
//         cleanedAnswers[key] = "";
//       }
//     });

//     const res = await fetch(`${API_BASE}/quiz-results`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify({
//         ...payload,
//         userAnswers: cleanedAnswers
//       }),
//     });

//     if (!res.ok) {
//       console.error(`Failed to save result (Status: ${res.status})`);
//       throw new Error(`Failed to save result (${res.status})`);
//     }

//     const data = await res.json();

//     const cacheKey = `result_${payload.quizId}_${payload.userId}`;
//     cache.results.set(cacheKey, data);

//     (postResult as any).lastResult = data;

//     return data;
//   } catch (error) {
//     console.error('Error posting results:', error);
//     throw error;
//   } finally {
//     setTimeout(() => {
//       (postResult as any).isSubmitting = false;
//     }, 1000);
//   }
// }



// src/Lab6/Quiz/utils/quizApi.ts

// import { Question, QuizResult, QuizResultPayload } from '../types/quiz.types';
// import { calculateScore } from './quizUtils';

// const API_BASE = 'http://localhost:4000/api';

// const cache = {
//   questions: new Map(),
//   results: new Map()
// };

// export async function fetchQuestions(quizId: string): Promise<Question[]> {
//   const cacheKey = `quiz_${quizId}`;
//   if (cache.questions.has(cacheKey)) {
//     return cache.questions.get(cacheKey);
//   }

//   try {
//     const res = await fetch(`${API_BASE}/quizzes/${quizId}/questions`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json'
//       },
//       cache: 'no-cache'
//     });

//     if (!res.ok) {
//       console.error(`Failed to fetch questions (Status: ${res.status})`);
//       throw new Error(`Failed to fetch questions (${res.status})`);
//     }

//     const data = await res.json();

//     cache.questions.set(cacheKey, data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching questions:', error);
//     throw error;
//   }
// }

// export async function fetchResult(
//   quizId: string,
//   userId: string
// ): Promise<QuizResult | null> {
//   const cacheKey = `result_${quizId}_${userId}`;
//   if (cache.results.has(cacheKey)) {
//     return cache.results.get(cacheKey);
//   }
  
//   try {
//     const res = await fetch(`${API_BASE}/quiz-results/${quizId}/${userId}`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json'
//       },
//       cache: 'no-cache'
//     });

//     if (res.status === 404) {
//       cache.results.set(cacheKey, null);
//       return null;
//     }

//     if (!res.ok) {
//       console.error(`Failed to fetch result (Status: ${res.status})`);
//       throw new Error(`Failed to fetch result (${res.status})`);
//     }

//     const data = await res.json();
//     cache.results.set(cacheKey, data);
//     console.log("Fetched result data:", data);  
//     return data;
//   } catch (error) {
//     console.error('Error fetching results:', error);
//     return null;
//   }
// }

// export async function postResult(
//   payload: QuizResultPayload
// ): Promise<QuizResult> {
//   if ((postResult as any).isSubmitting) {
//     return (postResult as any).lastResult;
//   }

//   try {
//     (postResult as any).isSubmitting = true;

//     // First, fetch questions to calculate score accurately
//     const questions = await fetchQuestions(payload.quizId);
    
//     // Create a quiz object from the questions
//     const quiz = {
//       id: payload.quizId,
//       title: 'Quiz',
//       questions: questions
//     };
    
//     // Calculate score
//     const { score } = calculateScore(quiz, payload.userAnswers);
//     const maxScore = questions.reduce((total, q) => total + q.point, 0);
//     const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    
//     // Get the attempt number
//     // Check if there's an existing result to increment the attempt number
//     let attemptNumber = 1;
//     try {
//       const existingResult = await fetchResult(payload.quizId, payload.userId);
//       if (existingResult && existingResult.attemptNumber) {
//         attemptNumber = existingResult.attemptNumber + 1;
//       }
//     } catch (error) {
//       console.log("No previous attempts found, using attempt number 1");
//     }

//     // Clean empty answers
//     const cleanedAnswers = { ...payload.userAnswers };
//     Object.keys(cleanedAnswers).forEach(key => {
//       if (!cleanedAnswers[key]) {
//         cleanedAnswers[key] = "";
//       }
//     });

//     // Prepare the complete result object
//     const resultData = {
//       ...payload,
//       userAnswers: cleanedAnswers,
//       score,
//       maxScore,
//       percentage,
//       submitted: true,
//       submittedAt: new Date().toISOString(),
//       attemptNumber
//     };

//     console.log("Submitting quiz result:", resultData);

//     const res = await fetch(`${API_BASE}/quiz-results`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify(resultData),
//     });

//     if (!res.ok) {
//       console.error(`Failed to save result (Status: ${res.status})`);
//       throw new Error(`Failed to save result (${res.status})`);
//     }

//     const data = await res.json();
//     console.log("Successfully saved quiz result:", data);

//     const cacheKey = `result_${payload.quizId}_${payload.userId}`;
//     cache.results.set(cacheKey, data);

//     (postResult as any).lastResult = data;

//     return data;
//   } catch (error) {
//     console.error('Error posting results:', error);
//     throw error;
//   } finally {
//     setTimeout(() => {
//       (postResult as any).isSubmitting = false;
//     }, 1000);
//   }
// }

import axios from 'axios';
import { Question, QuizResult, QuizResultPayload } from '../types/quiz.types';
import { calculateScore } from './quizUtils';

const API_BASE = 'http://localhost:4000/api';

// Create axios instance with credentials
const axiosWithCredentials = axios.create({ withCredentials: true });

export async function fetchQuestions(quizId: string): Promise<Question[]> {
  try {
    const response = await axiosWithCredentials.get(`${API_BASE}/quizzes/${quizId}/questions`, {
      
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}

export async function fetchResult(
  quizId: string,
  userId: string
): Promise<QuizResult | null> {
  try {
    const response = await axiosWithCredentials.get(`${API_BASE}/quiz-results/${quizId}/${userId}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log("Fetched result data:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.error('Error fetching results:', error);
    return null;
  }
}

// Variable to prevent multiple simultaneous submissions
let isSubmitting = false;
let lastResult: QuizResult | null = null;

export async function postResult(
  payload: QuizResultPayload
): Promise<QuizResult> {
  if (isSubmitting && lastResult) {
    return lastResult;
  }

  try {
    isSubmitting = true;

    // First, fetch questions to calculate score accurately
    const questions = await fetchQuestions(payload.quizId);
    
    // Create a quiz object from the questions
    const quiz = {
      id: payload.quizId,
      title: 'Quiz',
      questions: questions
    };
    
    // Calculate score
    const { score } = calculateScore(quiz, payload.userAnswers);
    const maxScore = questions.reduce((total, q) => total + q.point, 0);
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    
    // Get the attempt number
    // Check if there's an existing result to increment the attempt number
    let attemptNumber = 1;
    try {
      const existingResult = await fetchResult(payload.quizId, payload.userId);
      if (existingResult && existingResult.attemptNumber) {
        attemptNumber = existingResult.attemptNumber + 1;
      }
    } catch (error) {
      console.log("No previous attempts found, using attempt number 1");
    }

    // Clean empty answers
    const cleanedAnswers = { ...payload.userAnswers };
    Object.keys(cleanedAnswers).forEach(key => {
      if (!cleanedAnswers[key]) {
        cleanedAnswers[key] = "";
      }
    });

    // Prepare the complete result object
    const resultData = {
      ...payload,
      userAnswers: cleanedAnswers,
      score,
      maxScore,
      percentage,
      submitted: false,
      submittedAt: new Date().toISOString(),
      attemptNumber
    };

    console.log("Submitting quiz result:", resultData);

    const response = await axiosWithCredentials.post(`${API_BASE}/quiz-results`, resultData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log("Successfully saved quiz result:", response.data);

    lastResult = response.data;
    return response.data;
  } catch (error) {
    console.error('Error posting results:', error);
    throw error;
  } finally {
    // Reset the submitting flag after a delay to prevent rapid re-submissions
    setTimeout(() => {
      isSubmitting = false;
    }, 1000);
  }
}