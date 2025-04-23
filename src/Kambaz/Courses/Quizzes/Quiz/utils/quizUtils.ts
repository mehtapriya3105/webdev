// // src/utils/quizUtils.ts

// import { Quiz } from '../types/quiz.types';

// /**
//  * Format a date for display in the UI
//  */
// export const formatDate = (date: Date): string => {
//   const options: Intl.DateTimeFormatOptions = {
//     month: 'short',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true
//   };
//   return date.toLocaleDateString('en-US', options);
// };

// /**
//  * Calculate the maximum possible score for a quiz
//  */
// export const calculateMaxScore = (quiz: Quiz | null): number => {
//   if (!quiz) return 0;
//   return quiz.questions.reduce((sum, q) => sum + q.point, 0);
// };

// /**
//  * Calculate the score for a completed quiz
//  */
// export const calculateScore = (
//   quiz: Quiz | null,
//   userAnswers: Record<string, string>
// ): { score: number } => {
//   if (!quiz) return { score: 0 };

//   let score = 0;
//   for (const question of quiz.questions) {
//     const answerId = userAnswers[question._id];
//     if (answerId === question.correctAnswer) {
//       score += question.point;
//     }
//   }

//   return { score };
// };

// /**
//  * Get a message based on the score percentage (0 - 1)
//  */
// export const getScoreMessage = (percentage: number): string => {
//   if (percentage >= 0.9) {
//     return "Excellent! You've mastered this material.";
//   } else if (percentage >= 0.8) {
//     return 'Great job! You have a strong understanding of the content.';
//   } else if (percentage >= 0.7) {
//     return "Good work! You've understood most of the material.";
//   } else if (percentage >= 0.6) {
//     return "Not bad. You've grasped some key concepts.";
//   } else {
//     return 'You may want to review the material and try again.';
//   }
// };

// src/utils/quizUtils.ts

import { Quiz } from '../types/quiz.types';

/**
 * Format a date for display in the UI
 */
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Calculate the maximum possible score for a quiz
 */
export const calculateMaxScore = (quiz: Quiz | null): number => {
  if (!quiz) return 0;
  return quiz.questions.reduce((sum, q) => sum + q.point, 0);
};

/**
 * Calculate the score for a completed quiz
 */
export const calculateScore = (
  quiz: Quiz | null,
  userAnswers: Record<string, string>
): { score: number } => {
  if (!quiz) return { score: 0 };

  let score = 0;
  for (const question of quiz.questions) {
    const answerId = userAnswers[question._id];
    
    // Skip if no answer provided
    if (!answerId) continue;
    
    // Handle different question types
    if (question.quizType === 'Multiple Choice Question') {
      // For multiple choice, direct comparison
      if (answerId === question.correctAnswer) {
        score += question.point;
      }
    } 
    else if (question.quizType === 'True or False') {
      // For true/false, compare as lowercase strings
      const userAnswer = String(answerId).toLowerCase();
      const correctAnswer = String(question.correctAnswer).toLowerCase();
      
      if (userAnswer === correctAnswer) {
        score += question.point;
      }
    } 
    else if (question.quizType === 'Fill in the Blank') {
      // For fill in blank, check against array of possible answers
      const correctAnswers = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer 
        : [question.correctAnswer];
      
      // Case-insensitive comparison
      const isCorrect = correctAnswers.some(
        answer => String(answer).toLowerCase() === String(answerId).toLowerCase()
      );
      
      if (isCorrect) {
        score += question.point;
      }
    }
  }

  return { score };
};

/**
 * Get a message based on the score percentage (0 - 1)
 */
export const getScoreMessage = (percentage: number): string => {
  if (percentage >= 0.9) {
    return "Excellent! You've mastered this material.";
  } else if (percentage >= 0.8) {
    return 'Great job! You have a strong understanding of the content.';
  } else if (percentage >= 0.7) {
    return "Good work! You've understood most of the material.";
  } else if (percentage >= 0.6) {
    return "Not bad. You've grasped some key concepts.";
  } else {
    return 'You may want to review the material and try again.';
  }
};