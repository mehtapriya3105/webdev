import React from 'react';
import '../styles/QuizInstructions.css';

interface QuizInstructionsProps {
  instructions: string;
}

const QuizInstructions: React.FC<QuizInstructionsProps> = ({ instructions }) => {
  return (
    <div className="quiz-instructions">
      <h2>Quiz Instructions</h2>
      <div>{instructions}</div>
    </div>
  );
};

export default QuizInstructions;