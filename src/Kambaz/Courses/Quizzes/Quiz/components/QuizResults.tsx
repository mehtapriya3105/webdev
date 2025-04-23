// // src/Lab6/Quiz/components/QuizResults.tsx

// import React, { useContext } from 'react';
// import useQuizState from '../hooks/useQuizState';
// import { QuizContext, ACTIONS } from '../context/QuizContext';
// import { getScoreMessage } from '../utils/quizUtils';
// import '../styles/QuizResults.css';
// import { useSelector } from 'react-redux';

// const QuizResults: React.FC = () => {
//   // Get quiz state
//   const { 
//     quiz,
//     score, 
//     maxScore, 
//     percentageScore,
//     attemptNumber,
//     maxAttempts,
//     startNewAttempt
//   } = useQuizState();


//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const isAdminOrFaculty =
//     currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

//   // We need direct access to dispatch for reliable review activation
//   const context = useContext(QuizContext);
//   if (!context) throw new Error('QuizResults must be used within QuizProvider');
//   const { dispatch } = context;

//   console.log("Quiz results data:", {
//     attemptNumber,
//     maxAttempts,
//     quiz
//   });

//   // Calculate message and remaining attempts
//   const message = getScoreMessage(percentageScore / 100);
//   const attemptsRemaining = Math.max(0, maxAttempts - attemptNumber);
//   const canRetake = attemptsRemaining > 1;

//   console.log("Quiz results data:", {
//     attemptNumber,
//     maxAttempts,
//     quiz
//   });
//   console.log("Attempts remaining:", attemptsRemaining);

//   // const handleReviewClick = () => {
//   //   dispatch({ type: ACTIONS.REVIEW_QUIZ });
//   // };

//   const handleStartNewAttempt = () => {
//     console.log("Starting new attempt with attempts remaining:", attemptsRemaining);
//     startNewAttempt();
//   };

//   return (
//     <div className="result-container">
//       <h2>Quiz Results</h2> 

//       {/* <div className="result-info">
        
//         {canRetake && <div>Attempts remaining: {attemptsRemaining}</div>}
//       </div> */}

//       <div className="result-score">
//         Your Score: {score}/{maxScore} ({percentageScore}%)
//       </div>

//       <div className="result-message">{message}</div>

//       <div className="result-actions">
//         <button
//           className="review-button"
//           onClick={handleReviewClick}
//         >
//           Review Quiz
//         </button>


//         {!isAdminOrFaculty && (
//           <>
//           {canRetake && (
//           <button
//             className="retake-button"
//             onClick={handleStartNewAttempt}
//           >
//             Start New Attempt 
//           </button>
//         )}
//           </>
//         )}

//         {/* Show retake button only if there are attempts remaining */}
        
//       </div>

     
//     </div>
//   );
// };

// export default QuizResults;

// src/Lab6/Quiz/components/QuizResults.tsx

import React, { useContext } from 'react';
import useQuizState from '../hooks/useQuizState';
import { QuizContext, ACTIONS } from '../context/QuizContext';
import { getScoreMessage } from '../utils/quizUtils';
import '../styles/QuizResults.css';
import { useSelector } from 'react-redux';

const QuizResults: React.FC = () => {
  // Get quiz state
  const { 
    quiz,
    score, 
    maxScore, 
    percentageScore,
    attemptNumber,
    maxAttempts,
    startNewAttempt
  } = useQuizState();


  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isAdminOrFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  // We need direct access to dispatch for reliable review activation
  const context = useContext(QuizContext);
  if (!context) throw new Error('QuizResults must be used within QuizProvider');
  const { dispatch } = context;

  console.log("Quiz results data:", {
    attemptNumber,
    maxAttempts,
    quiz
  });

  // Calculate message and remaining attempts
  const message = getScoreMessage(percentageScore / 100);
  const attemptsRemaining = Math.max(0, maxAttempts - attemptNumber);
  const canRetake = attemptsRemaining > 1;

  console.log("Quiz results data:", {
    attemptNumber,
    maxAttempts,
    quiz
  });
  console.log("Attempts remaining:", attemptsRemaining);

  const handleReviewClick = () => {
    dispatch({ type: ACTIONS.REVIEW_QUIZ });
  };

  const handleStartNewAttempt = () => {
    console.log("Starting new attempt with attempts remaining:", attemptsRemaining);
    startNewAttempt();
  };

  return (
    <div className="result-container">
      <h2>Quiz Results</h2> 

      {/* <div className="result-info">
        
        {canRetake && <div>Attempts remaining: {attemptsRemaining}</div>}
      </div> */}

      <div className="result-score">
        Your Score: {score}/{maxScore} ({percentageScore}%)
      </div>

      <div className="result-message">{message}</div>

      <div className="result-actions d-flex justify-content-center">
        <button
          className="btn me-2 btn-danger"

          onClick={handleReviewClick}
        >
          Review Quiz
        </button>


        {!isAdminOrFaculty && (
          <>
          {canRetake && (
          <button
            className="btn ms-2 btn-secondary"
            onClick={handleStartNewAttempt}
          >
            Start New Attempt 
          </button>
        )}
          </>
        )}

        {/* Show retake button only if there are attempts remaining */}
        
      </div>

     
    </div>
  );
};

export default QuizResults;