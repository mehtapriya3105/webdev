// src/Lab6/Quiz/components/QuizApp.tsx (with debugging)

import React, { useContext } from 'react';
import useQuizState from '../hooks/useQuizState';
import { QuizContext } from '../context/QuizContext';
import QuizHeader from './QuizHeader';
import QuizInstructions from './QuizInstructions';
import Question from './Question';
import QuestionNavigation from './QuizNavigation';
import SubmitArea from './SubmitArea';
import QuestionsList from './QuestionsList';
import QuizResults from './QuizResults';
import { isQuizCompleted } from '../utils/localStorage';
import '../styles/QuizApp.css';
import { start } from 'repl';

const QuizApp: React.FC = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error('QuizApp must be used within QuizProvider');
  
  const { quizId, userId } = context;
  
  const { 
    quiz,
    isLoading,
    error,
    currentQuestion,
    submitted,
    reviewMode,
    attemptNumber,
    maxAttempts,
    startNewAttempt
  } = useQuizState();
  console.log("submittedc" , submitted);

  const attemptsRemaining = maxAttempts ? maxAttempts - attemptNumber : 0;
const canRetake = !reviewMode && submitted && attemptsRemaining > 0;
  // Always show results first for completed quizzes (until review mode is activated)
  const showResults = (submitted || isQuizCompleted(quizId, userId)) && !reviewMode;

  // Loading state
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-indicator">Loading quiz...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Error Loading Quiz</h2>
          <p>{error}</p>
          <p>Please refresh the page or try again later.</p>
        </div>
      </div>
    );
  }

  // No quiz data
  if (!quiz) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Quiz Not Found</h2>
          <p>No quiz data available. Please check the quiz ID and try again.</p>
        </div>
      </div>
    );
  }

  // Determine the current mode
  const quizMode = submitted || isQuizCompleted(quizId, userId)
    ? (reviewMode ? 'Review Mode' : 'Completed') 
    : 'In Progress';

  return (
    <div className="quiz-container">
      {showResults ? (
        // Results view with score and "Review Quiz" button
        <>
        <QuizResults />
        {/* {canRetake && (
          <button 
            className="retake-button"
            onClick={startNewAttempt}
          >
            Start New Attempt ({attemptsRemaining} remaining)
          </button>
        )} */}
      </>
      ) : (
        // Quiz-taking or review view
        <>
          <QuizHeader
            title={quiz.title || 'Quiz'}
            status={quizMode}
          />
          
          <QuizInstructions
            instructions={quiz.instructions || 'Answer all questions to the best of your ability.'}
          />
          
          {currentQuestion && (
            <Question 
              question={currentQuestion} 
            />
          )}
          
          <QuestionNavigation />
          
          {/* Only show submit area for new attempts */}
          {!submitted && !isQuizCompleted(quizId, userId) && <SubmitArea />}
          
          <QuestionsList />
        </>
      )}
    </div>
  );
};

export default QuizApp;