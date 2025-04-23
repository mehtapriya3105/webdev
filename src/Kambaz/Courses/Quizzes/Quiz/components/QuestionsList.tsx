// src/Lab6/Quiz/components/QuestionsList.tsx

import React from 'react';
import useQuizState from '../hooks/useQuizState';
import '../styles/QuestionsList.css';

const QuestionsList: React.FC = () => {
  const {
    quiz,
    currentQuestionIndex,
    submitted,
    goToQuestion,
    userAnswers
  } = useQuizState();

  if (!quiz) return null;

  return (
    <div className="questions-nav">
      <h2>Questions</h2>
      <ul className="questions-list">
        {quiz.questions.map((q, idx) => {
          const answered = !!userAnswers[q._id];
          const correct = submitted && userAnswers[q._id] === q.correctAnswer;
          let circleClass = 'unanswered';
          if (answered) {
            circleClass = submitted ? (correct ? 'correct' : 'incorrect') : 'answered';
          }

          return (
            <li key={q._id}>
              <button
                className={idx == currentQuestionIndex ? 'current' : ''}
                onClick={() => goToQuestion(idx)}
              >
                <span className={`circle-marker ${circleClass}`}>{idx + 1}</span>
                Question {idx + 1}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuestionsList;
