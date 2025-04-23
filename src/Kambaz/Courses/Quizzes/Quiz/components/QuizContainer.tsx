// src/components/QuizContainer.tsx

import React, { useEffect, useState } from 'react';
import useQuizState from '../hooks/useQuizState';
import QuizHeader from './QuizHeader';
import QuizInstructions from './QuizInstructions';
import Question from './Question';
import QuestionNavigation from './QuizNavigation';
import SubmitArea from './SubmitArea';
import QuestionsList from './QuestionsList';
import QuizResults from './QuizResults';
import '../styles/QuizApp.css';

const QuizContainer: React.FC = () => {
  const [showResults, setShowResults] = useState(false);
  const {
    quiz,
    isLoading,
    error,
    currentQuestion,
    submitted
  } = useQuizState();

  // useEffect(() => {
  //   setShowResults(submitted);
  // }, [submitted]);

  if (isLoading) return <div className="loading-indicator">Loading quiz...</div>;
  if (error)     return <div className="error-message">Error: {error}</div>;
  if (!quiz)     return <div className="error-message">No quiz data available</div>;

  return (
    <div className="quiz-container">
      {showResults ? (
        <QuizResults />
      ) : (
        <>
          <QuizHeader
            title={quiz.title}
            status={submitted ? 'Review Mode' : 'In Progress'}
          />
          <QuizInstructions instructions={quiz.instructions || ''} />
          {currentQuestion && <Question question={currentQuestion} />}
          <QuestionNavigation />
          <SubmitArea />
          <QuestionsList />
        </>
      )}
    </div>
  );
};

export default QuizContainer;
