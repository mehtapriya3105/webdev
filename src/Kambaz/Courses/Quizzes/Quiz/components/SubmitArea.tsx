// src/Lab6/Quiz/components/SubmitArea.tsx

import React, { useContext } from 'react';
import useQuizState from '../hooks/useQuizState';
import { QuizContext } from '../context/QuizContext';
import { isQuizCompleted } from '../utils/localStorage';
import '../styles/SubmitArea.css';

const SubmitArea: React.FC = () => {
  const { submitted, submitting, submitQuiz, lastSaved } = useQuizState();
  
  // Get quizId and userId directly from context
  const context = useContext(QuizContext);
  if (!context) throw new Error('SubmitArea must be used within QuizProvider');
  
  const { quizId, userId } = context;
  
  const savedAt = lastSaved.toLocaleTimeString();
  
  // If quiz is already completed, don't show submit button
  if (submitted || isQuizCompleted(quizId, userId)) {
    return null;
  }

  return (
    <div className="submit-area">
      <div className="saved-status">
        Last saved at {savedAt}
      </div>
      <button
        className={`submit-button ${submitting ? 'submitting' : ''}`}
        onClick={submitQuiz}
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit Quiz'}
      </button>
    </div>
  );
};

export default SubmitArea;