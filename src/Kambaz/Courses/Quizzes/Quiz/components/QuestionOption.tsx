// // // src/Lab6/Quiz/components/QuestionOption.tsx

// // import React from 'react';
// // import useQuizState from '../hooks/useQuizState';
// // import '../styles/QuestionOption.css';

// // interface QuestionOptionProps {
// //   option: string;
// //   optionIndex: string;
// //   questionId: string;
// //   questionType: string;
// //   correctAnswer: string;
// //   checked: boolean;
// //   disabled: boolean;
// //   onChange: () => void;
// // }

// // const QuestionOption: React.FC<QuestionOptionProps> = ({
// //   option,
// //   optionIndex,
// //   questionId,
// //   correctAnswer,
// //   checked,
// //   disabled,
// //   onChange
// // }) => {
// //   const isCorrect = correctAnswer === optionIndex;
// //   let wrapperClass = '';

// //   if (disabled && checked) {
// //     wrapperClass = isCorrect ? 'correct-answer' : 'incorrect-answer';
// //   }

// //   return (
// //     <div className={`option ${wrapperClass}`}>
// //       <label>
// //         <input
// //           type="radio"
// //           name={questionId}
// //           value={optionIndex}
// //           checked={checked}
// //           disabled={disabled}
// //           onChange={onChange}
// //         />
// //         {option}
// //       </label>

// //       {disabled && checked && !isCorrect && (
// //         <div className="option-feedback incorrect-answer">
// //           Your answer is incorrect.
// //         </div>
// //       )}
// //       {disabled && checked && isCorrect && (
// //         <div className="option-feedback correct-answer">
// //           This is the correct answer.
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default QuestionOption;



// // src/Lab6/Quiz/components/QuestionOption.tsx






// import React, { useState } from 'react';
// import useQuizState from '../hooks/useQuizState';
// import '../styles/QuestionOption.css';

// interface QuestionOptionProps {
//   option: string;
//   optionIndex: string;
//   questionId: string;
//   questionType: string;
//   correctAnswer: any;
//   checked: boolean;
//   disabled: boolean;
//   onChange: () => void;
// }

// const QuestionOption: React.FC<QuestionOptionProps> = ({
//   option,
//   optionIndex,
//   questionId,
//   questionType,
//   correctAnswer,
//   checked,
//   disabled,
//   onChange
// }) => {
//   const [inputValue, setInputValue] = useState("");
//   const { saveAnswer, userAnswers } = useQuizState();
  
//   // For fill in the blank, get the current answer value
//   const fillInBlankValue = userAnswers[questionId] || '';

//   let isCorrect = false;
//   let wrapperClass = '';
  
//   // Different handling based on question type
//   if (questionType === 'Multiple Choice Question') {
//     isCorrect = correctAnswer === optionIndex;
    
//     if (disabled && checked) {
//       wrapperClass = isCorrect ? 'correct-answer' : 'incorrect-answer';
//     }

//     return (
//       <div className={`option ${wrapperClass}`}>
//         <label>
//           <input
//             type="radio"
//             name={questionId}
//             value={optionIndex}
//             checked={checked}
//             disabled={disabled}
//             onChange={onChange}
//           />
//           <span dangerouslySetInnerHTML={{ __html: option }} />
//         </label>

//         {disabled && checked && !isCorrect && (
//           <div className="option-feedback incorrect-answer">
//             Your answer is incorrect.
//           </div>
//         )}
//         {disabled && checked && isCorrect && (
//           <div className="option-feedback correct-answer">
//             This is the correct answer.
//           </div>
//         )}
//       </div>
//     );
//   } 
//   else if (questionType === 'True or False') {
//     // Normalize both values to strings for consistent comparison
//     // Using loose equality (==) for comparing different types (string/boolean)
//     const normalizedOption = String(optionIndex).toLowerCase();
//     const normalizedCorrect = String(correctAnswer).toLowerCase();
    
//     isCorrect = normalizedCorrect === normalizedOption;
    
//     if (disabled && checked) {
//       wrapperClass = isCorrect ? 'correct-answer' : 'incorrect-answer';
//     }

//     return (
//       <div className={`option ${wrapperClass}`}>
//         <label>
//           <input
//             type="radio"
//             name={questionId}
//             value={optionIndex}
//             checked={checked}
//             disabled={disabled}
//             onChange={onChange}
//           />
//           {option}
//         </label>

//         {disabled && checked && !isCorrect && (
//           <div className="option-feedback incorrect-answer">
//             Your answer is incorrect.
//           </div>
//         )}
//         {disabled && checked && isCorrect && (
//           <div className="option-feedback correct-answer">
//             This is the correct answer.
//           </div>
//         )}
//       </div>
//     );
//   } 
//   else if (questionType === 'Fill in the Blank') {
//     // For fill in the blank, we'll use an input field
//     // Check if answer is an array
//     const correctAnswerArray = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
    
//     // Case-insensitive comparison for fill in the blank
//     isCorrect = disabled && correctAnswerArray.some(answer => 
//       String(answer).toLowerCase() === String(fillInBlankValue).toLowerCase()
//     );
    
//     if (disabled) {
//       wrapperClass = isCorrect ? 'correct-answer' : 'incorrect-answer';
//     }

//     return (
//       <div className={`option fill-blank ${wrapperClass}`}>
//         <input
//           type="text"
//           value={fillInBlankValue}
//           placeholder="Enter your answer here"
//           disabled={disabled}
//           onChange={(e) => {
//             setInputValue(e.target.value);
//             saveAnswer(questionId, e.target.value);
//           }}
//           className="fill-blank-input"
//         />

//         {disabled && !isCorrect && (
//           <div className="option-feedback incorrect-answer">
//             Your answer is incorrect. The correct answer is: {correctAnswerArray.join(' or ')}
//           </div>
//         )}
//         {disabled && isCorrect && (
//           <div className="option-feedback correct-answer">
//             Your answer is correct!
//           </div>
//         )}
//       </div>
//     );
//   }
  
//   // Default fallback
//   return <div>Unsupported question type: {questionType}</div>;
// };

// export default QuestionOption;

import React, { useState } from 'react';
import useQuizState from '../hooks/useQuizState';
import '../styles/QuestionOption.css';
import { useSelector } from 'react-redux';

interface QuestionOptionProps {
  option: string;
  optionIndex: string;
  questionId: string;
  questionType: string;
  correctAnswer: any;
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
  isFaculty?: boolean; // Add this prop to identify faculty users
}

const QuestionOption: React.FC<QuestionOptionProps> = ({
  option,
  optionIndex,
  questionId,
  questionType,
  correctAnswer,
  checked,
  disabled,
  onChange,
  
}) => {
  const [inputValue, setInputValue] = useState("");
  const { saveAnswer, userAnswers } = useQuizState();
  
  // For fill in the blank, get the current answer value
  const fillInBlankValue = userAnswers[questionId] || '';

  let isCorrect = false;
  let wrapperClass = '';
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isAdminOrFaculty = currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

  // Different handling based on question type
  if (questionType === 'Multiple Choice Question') {
    isCorrect = correctAnswer === optionIndex;
    
    // Set the wrapper class for styling
    if (disabled && (checked || (isAdminOrFaculty && isCorrect))) {
      wrapperClass = isCorrect ? 'correct-answer' : (checked ? 'incorrect-answer' : '');
    }

    return (
      <div className={`option ${wrapperClass}`}>
        <label>
          <input
            type="radio"
            name={questionId}
            value={optionIndex}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
          />
          <span dangerouslySetInnerHTML={{ __html: option }} />
        </label>

        {/* Show feedback when disabled (reviewing) */}
        {disabled && checked && !isCorrect && (
          <div className="option-feedback incorrect-answer">
            Your answer is incorrect.
          </div>
        )}
        {disabled && (checked || isAdminOrFaculty) && isCorrect && (
          <div className="option-feedback correct-answer">
            This is the correct answer.
          </div>
        )}
      </div>
    );
  } 
  else if (questionType === 'True or False') {
    // Normalize both values to strings for consistent comparison
    const normalizedOption = String(optionIndex).toLowerCase();
    const normalizedCorrect = String(correctAnswer).toLowerCase();
    
    isCorrect = normalizedCorrect === normalizedOption;
    
    // Set the wrapper class for styling
    if (disabled && (checked || (isAdminOrFaculty && isCorrect))) {
      wrapperClass = isCorrect ? 'correct-answer' : (checked ? 'incorrect-answer' : '');
    }

    return (
      <div className={`option ${wrapperClass}`}>
        <label>
          <input
            type="radio"
            name={questionId}
            value={optionIndex}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
          />
          {option}
        </label>

        {/* Show feedback when disabled (reviewing) */}
        {disabled && checked && !isCorrect && (
          <div className="option-feedback incorrect-answer">
            Your answer is incorrect.
          </div>
        )}
        {disabled && (checked || isAdminOrFaculty) && isCorrect && (
          <div className="option-feedback correct-answer">
            This is the correct answer.
          </div>
        )}
      </div>
    );
  } 
  else if (questionType === 'Fill in the Blank') {
    // For fill in the blank, we'll use an input field
    // Check if answer is an array
    const correctAnswerArray = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
    
    // Case-insensitive comparison for fill in the blank
    isCorrect = disabled && correctAnswerArray.some(answer => 
      String(answer).toLowerCase() === String(fillInBlankValue).toLowerCase()
    );
    
    // Set the wrapper class for styling
    if (disabled) {
      wrapperClass = isCorrect ? 'correct-answer' : 'incorrect-answer';
    }

    return (
      <div className={`option fill-blank ${wrapperClass}`}>
        <input
          type="text"
          value={fillInBlankValue}
          placeholder="Enter your answer here"
          disabled={disabled}
          onChange={(e) => {
            setInputValue(e.target.value);
            saveAnswer(questionId, e.target.value);
          }}
          className="fill-blank-input"
        />

        {/* Always show correct answer for faculty when disabled */}
        {disabled && (isAdminOrFaculty || !isCorrect) && (
          <div className={`option-feedback ${isCorrect ? 'correct-answer' : 'incorrect-answer'}`}>
            {!isCorrect && "Your answer is incorrect. "}
            {isCorrect && "Your answer is correct! "}
            {(isAdminOrFaculty || !isCorrect) && `The correct answer is: ${correctAnswerArray.join(' or ')}`}
          </div>
        )}
        {disabled && isCorrect && !isAdminOrFaculty && (
          <div className="option-feedback correct-answer">
            Your answer is correct!
          </div>
        )}
      </div>
    );
  }
  
  // Default fallback
  return <div>Unsupported question type: {questionType}</div>;
};

export default QuestionOption;