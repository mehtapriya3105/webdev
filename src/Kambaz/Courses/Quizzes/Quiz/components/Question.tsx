// // src/Lab6/Quiz/components/Question.tsx

// import React from 'react';
// import useQuizState from '../hooks/useQuizState';
// import QuestionOption from './QuestionOption';
// import type { Question as QType, AnswerOption } from '../types/quiz.types';
// import '../styles/Question.css';

// interface QuestionProps {
//   question: QType;
// }

// const Question: React.FC<QuestionProps> = ({ question }) => {
//   const {
//     currentQuestionIndex,
//     saveAnswer,
//     userAnswers,
//     submitted
//   } = useQuizState();

//   // selected option _id or empty string
//   const selected = userAnswers[question._id] || '';

//   return (
//     <div className="question-container">
//       <div className="question-header">
//         <h3>Question {currentQuestionIndex + 1}</h3>
//         <div className="question-points">{question.point} pts</div>
//       </div>
//       <div className="question-content">
//         <div
//           className="question-text"
//           dangerouslySetInnerHTML={{ __html: question.question }}
//         />
//         <div className="options">
//           {question.answer.map((opt: AnswerOption) => (
//             <QuestionOption
//               key={opt._id}
//               option={opt.text}
//               optionIndex={opt._id}
//               questionId={question._id}
//               questionType={question.quizType}
//               correctAnswer={question.correctAnswer}
//               checked={selected === opt._id}
//               disabled={submitted}
//               onChange={() => saveAnswer(question._id, opt._id)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Question;


// src/Lab6/Quiz/components/Question.tsx










// import React from 'react';
// import useQuizState from '../hooks/useQuizState';
// import QuestionOption from './QuestionOption';
// import type { Question as QType, AnswerOption } from '../types/quiz.types';
// import '../styles/Question.css';

// interface QuestionProps {
//   question: QType;
// }

// const Question: React.FC<QuestionProps> = ({ question }) => {
//   const {
//     currentQuestionIndex,
//     saveAnswer,
//     userAnswers,
//     submitted
//   } = useQuizState();

//   // Selected option _id or empty string
//   const selected = userAnswers[question._id] || '';

//   // For rendering True/False options if needed
//   const renderTrueFalseOptions = () => {
//     return [
//       { _id: "true", text: "True" },
//       { _id: "false", text: "False" }
//     ].map((opt) => (
//       <QuestionOption
//         key={opt._id}
//         option={opt.text}
//         optionIndex={opt._id}
//         questionId={question._id}
//         questionType={question.quizType}
//         correctAnswer={question.correctAnswer}
//         checked={selected === opt._id}
//         disabled={submitted}
//         onChange={() => saveAnswer(question._id, opt._id)}
//       />
//     ));
//   };

//   // For rendering a blank input field
//   const renderFillInBlank = () => {
//     return (
//       <QuestionOption
//         key="fill-blank"
//         option=""
//         optionIndex=""
//         questionId={question._id}
//         questionType={question.quizType}
//         correctAnswer={question.correctAnswer}
//         checked={false}
//         disabled={submitted}
//         onChange={() => {}} // Not used for fill in blank
//       />
//     );
//   };

//   return (
//     <div className="question-container">
//       <div className="question-header">
//         <h3>Question {currentQuestionIndex + 1}</h3>
//         <div className="question-points">{question.point} pts</div>
//       </div>
//       <div className="question-content">
//         <div
//           className="question-text"
//           dangerouslySetInnerHTML={{ __html: question.question }}
//         />
//         <div className="options">
//           {question.quizType === "Multiple Choice Question" && 
//             question.answer.map((opt: AnswerOption) => (
//               <QuestionOption
//                 key={opt._id}
//                 option={opt.text}
//                 optionIndex={opt._id}
//                 questionId={question._id}
//                 questionType={question.quizType}
//                 correctAnswer={question.correctAnswer}
//                 checked={selected === opt._id}
//                 disabled={submitted}
//                 onChange={() => saveAnswer(question._id, opt._id)}
//               />
//             ))
//           }
          
//           {question.quizType === "True or False" && renderTrueFalseOptions()}
          
//           {question.quizType === "Fill in the Blank" && renderFillInBlank()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Question;


// src/Lab6/Quiz/components/Question.tsx

import React from 'react';
import useQuizState from '../hooks/useQuizState';
import QuestionOption from './QuestionOption';
import type { Question as QType, AnswerOption } from '../types/quiz.types';
import '../styles/Question.css';

interface QuestionProps {
  question: QType;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  const {
    currentQuestionIndex,
    saveAnswer,
    userAnswers,
    submitted
  } = useQuizState();

  // Selected option _id or empty string
  const selected = userAnswers[question._id] || '';

  // For rendering True/False options if needed
  const renderTrueFalseOptions = () => {
    return [
      { _id: "true", text: "True" },
      { _id: "false", text: "False" }
    ].map((opt) => (
      <QuestionOption
        key={opt._id}
        option={opt.text}
        optionIndex={opt._id}
        questionId={question._id}
        questionType={question.quizType}
        correctAnswer={String(question.correctAnswer).toLowerCase()} // Convert to string and lowercase
        checked={selected === opt._id}
        disabled={submitted}
        onChange={() => saveAnswer(question._id, opt._id)}
      />
    ));
  };

  // For rendering a blank input field
  const renderFillInBlank = () => {
    return (
      <QuestionOption
        key="fill-blank"
        option=""
        optionIndex=""
        questionId={question._id}
        questionType={question.quizType}
        correctAnswer={question.correctAnswer}
        checked={false}
        disabled={submitted}
        onChange={() => {}} // Not used for fill in blank
      />
    );
  };

  return (
    <div className="question-container">
      <div className="question-header">
        <h3>Question {currentQuestionIndex + 1}</h3>
        <div className="question-points">{question.point} pts</div>
      </div>
      <div className="question-content">
        <div
          className="question-text"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
        <div className="options">
          {question.quizType === "Multiple Choice Question" && 
            question.answer.map((opt: AnswerOption) => (
              <QuestionOption
                key={opt._id}
                option={opt.text}
                optionIndex={opt._id}
                questionId={question._id}
                questionType={question.quizType}
                correctAnswer={question.correctAnswer}
                checked={selected === opt._id}
                disabled={submitted}
                onChange={() => saveAnswer(question._id, opt._id)}
              />
            ))
          }
          
          {question.quizType === "True or False" && renderTrueFalseOptions()}
          
          {question.quizType === "Fill in the Blank" && renderFillInBlank()}
        </div>
      </div>
    </div>
  );
};

export default Question;