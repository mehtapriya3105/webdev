import React, { useState } from 'react';
import QuestionEditor from './QuestionEditor';

const QuizQuestion: React.FC = () => {
  const [questionTitle, setQuestionTitle] = useState<string>('Is 2 + 2 = 4?');
  const [questionContent, setQuestionContent] = useState<string>('Is is true that 2 + 2 = 4?');
  const [questionType, setQuestionType] = useState<string>('True/False');
  const [points, setPoints] = useState<number>(3);

  return (
    <div className="quiz-question-container">
      <div className="question-header d-flex justify-content-between align-items-center">
        <input 
          type="text" 
          value={questionTitle} 
          onChange={(e) => setQuestionTitle(e.target.value)}
          className="form-control" 
          placeholder="Question title"
        />
        
        <div className="d-flex align-items-center">
          <select 
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="form-select mx-2"
          >
            <option value="True/False">True/False</option>
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="Essay">Essay</option>
            <option value="Fill in the Blank">Fill in the Blank</option>
          </select>
          
          <div className="d-flex align-items-center">
            <span className="me-2">pts:</span>
            <input 
              type="number" 
              value={points} 
              onChange={(e) => setPoints(Number(e.target.value))}
              min="0"
              className="form-control"
              style={{width: "60px"}}
            />
          </div>
        </div>
      </div>
      
      <div className="question-editor-section mt-3">
        <p>Enter your question text, then select if True or False is the correct answer.</p>
        
        <h4>Question:</h4>
        <QuestionEditor 
          initialValue={questionContent} 
          onEditorChange={setQuestionContent}
        />
      </div>
    </div>
  );
};

export default QuizQuestion;