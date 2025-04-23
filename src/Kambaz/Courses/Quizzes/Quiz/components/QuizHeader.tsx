import React from 'react';
import '../styles/QuizHeader.css';

interface QuizHeaderProps {
  title: string;
  status: string;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({ title, status }) => {
  return (
    <div className="quiz-header">
      <div className="quiz-preview">
        <i>⚠</i> This is a preview of the published version of the quiz
      </div>
      <h1>{title}</h1>
      <div className="quiz-status">{status}</div>
    </div>
  );
};

export default QuizHeader;