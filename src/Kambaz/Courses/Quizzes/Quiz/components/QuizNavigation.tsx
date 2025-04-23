import React from 'react';
import useQuizState from '../hooks/useQuizState';
import '../styles/QuestionNavigation.css';

const QuestionNavigation: React.FC = () => {
  const { 
    quiz, 
    currentQuestionIndex, 
    goToPreviousQuestion, 
    goToNextQuestion 
  } = useQuizState();

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = quiz && currentQuestionIndex === quiz.questions.length - 1;

  return (
    <div className="navigation">
      <button 
        className="nav-button" 
        onClick={goToPreviousQuestion}
        disabled={isFirstQuestion}
      >
        ← Previous
      </button>
      
      <button 
        className="nav-button" 
        onClick={goToNextQuestion}
        disabled={isLastQuestion ?? false}
      >
        Next →
      </button>
    </div>
  );
};

export default QuestionNavigation;