

import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router";
import { createQuizQuestion, deleteQuizQuestion, updateQuizData, updateQuizQuestion } from "./client";
import { useDispatch } from "react-redux";

interface QuestionBase {
  _id: string;
  quizId: string;
  quizType: "Multiple Choice Question" | "Fill in the Blank" | "True or False";
  question: string;
  correctAnswer: any;
  answer: any;
  point: number;
  quizLevel: "Easy Level" | "Medium Level" | "Hard Level";
  title?: string;
}

interface MultipleChoiceQuestion extends QuestionBase {
  quizType: "Multiple Choice Question";
  answer: { _id: string; text: string; isCorrect?: boolean }[];
  correctAnswer: string;
}

interface TrueFalseQuestion extends QuestionBase {
  quizType: "True or False";
  answer: { _id: string; text: string }[];
  correctAnswer: boolean;
}

interface FillInBlankQuestion extends QuestionBase {
  quizType: "Fill in the Blank";
  answer: { _id: string; text: string }[];
  correctAnswer: string[];
}

interface QuizEditorTrialProps {
  onQuestionSaved?: () => void;
  initialQuestions?: Question[];
  onPointsUpdate?: (points: number) => void; // Add this new prop
}

type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | FillInBlankQuestion;

// Define available question types matching schema enums
const QUESTION_TYPES = ["Multiple Choice Question", "True or False", "Fill in the Blank"];

// Define available quiz levels matching schema enums
const QUIZ_LEVELS = ["Easy Level", "Medium Level", "Hard Level"];

// Main component
const QuizEditorTrial: React.FC<QuizEditorTrialProps> = ({ 
  onQuestionSaved, 
  initialQuestions = [], 
  onPointsUpdate 
}) => {
  const [activeTab, setActiveTab] = useState<"Details" | "Questions">(
    "Questions"
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isNewQuestion, setIsNewQuestion] = useState(false);
  const { quizId } = useParams<{ quizId: string }>();
  const { cid } = useParams<{ cid: string }>();
  const {totalPoints , setTotalPoints} = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNewQuestion = () => {
    const newQuestion: MultipleChoiceQuestion = {
      _id: uuidv4(),
      quizId: quizId || "",
      quizLevel: "Easy Level",
      quizType: "Multiple Choice Question",
      point: 4,
      title: "New Question",
      question: "How much is 2 + 2?",
      answer: [
        { _id: "1", text: "4", isCorrect: true },
        { _id: "2", text: "3", isCorrect: false },
        { _id: "3", text: "5", isCorrect: false },
        { _id: "4", text: "7", isCorrect: false },
      ],
      correctAnswer: "1",
    };

    setEditingQuestion(newQuestion);
    setIsNewQuestion(true);
  };

  useEffect(() => {
    if (initialQuestions && initialQuestions.length > 0) {
      setQuestions(initialQuestions);
     
    } else {
      const savedQuestions = localStorage.getItem("questions");
      if (savedQuestions) {
        setQuestions(JSON.parse(savedQuestions));
      }
    }

  }, [initialQuestions]);




  const handleSavingQuestion = () => {
    const totalPoints = questions.reduce((sum, q) => sum + q.point, 0);
    
    // Update parent component with total points
    if (onPointsUpdate) {
      onPointsUpdate(totalPoints);

    }
    
    // Save questions to localStorage (temporary)
    localStorage.setItem("questions", JSON.stringify(questions));
    
    // Create quiz questions in the database with the totalPoints
    createQuizQuestion(quizId || "", questions, totalPoints);
    
    updateQuizData(quizId || "", { totalPoints });
    // Clean up localStorage after saving
    localStorage.removeItem("questions");
    
    // Call callback if provided
    if (onQuestionSaved) {
      onQuestionSaved();
    }
  };

  const handleSaveQuestion = () => {
    if (editingQuestion) {
      let updatedQuestions;
      
      if (isNewQuestion) {
        updatedQuestions = [...questions, editingQuestion];
      } else {
        updatedQuestions = questions.map((q) =>
          q._id === editingQuestion._id ? editingQuestion : q
        );
      }
      
      // Calculate total points
      const totalPoints = updatedQuestions.reduce((sum, q) => sum + q.point, 0);
      
      // Update local state
      setQuestions(updatedQuestions);
      
      // Call the parent callback with updated points
      if (onPointsUpdate) {
        onPointsUpdate(totalPoints);
      }
      
      // Handle API operations
      if (!isNewQuestion) {
        console.log(totalPoints);
        
        updateQuizQuestion(quizId || "", editingQuestion._id, editingQuestion, totalPoints);

        updateQuizData(quizId || "", { totalPoints });
      }
      
      // Store questions in localStorage
      localStorage.setItem("questions", JSON.stringify(updatedQuestions));
      setEditingQuestion(null);
      setIsNewQuestion(false);
    }
  };


  const deleteQuizQuestions = (quizId: string, questionId: string) => {
    // Remove the question locally first
    const updatedQuestions = questions.filter(q => q._id !== questionId);
    setQuestions(updatedQuestions);
    
    // Calculate new total points
    const newTotalPoints = updatedQuestions.reduce((sum, q) => sum + q.point, 0);
    
    // Update parent component
    if (onPointsUpdate) {
      onPointsUpdate(newTotalPoints);
    }
    
    // Call API to delete from backend
    deleteQuizQuestion(quizId?.toString() || "", questionId || "");
    
    // Update localStorage
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };


  // Cancel editing
  const handleCancelEdit = () => {
    setEditingQuestion(null);
    setIsNewQuestion(false);
  };

  // Calculate total points
  

  const cancelFunction = () => {
    localStorage.removeItem("questions");
    window.location.reload();
  };

  return (
    <div className="container-fluid">
      <div className="questions-tab">
        <div className="text-center mb-4">
          <Button className="btn btn-secondary" onClick={handleNewQuestion}>
            + New Question
          </Button>
        </div>

        {questions.length > 0 && (
          <div className="mb-4">
            {questions.map((question) => (
              <div className="card mb-3" key={question._id}>
                <div className="card-body">
                  <h5 className="card-title">{question.title || "Untitled Question"}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {question.quizType} - {question.point} pts
                  </h6>
                  <div
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  />
                  <Button
                    className="btn btn-secondary me-2"
                    onClick={() => setEditingQuestion(question)}
                  >
                    Edit
                  </Button>
                  <Button className="btn btn-danger" onClick={() => deleteQuizQuestions(quizId || "", question._id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <hr />
        <div className="d-flex gap-2 mb-4">
          <button className="btn btn-outline-secondary" onClick={cancelFunction}>Cancel</button>
          <Button className="btn btn-danger" onClick={handleSavingQuestion}>Save</Button>
        </div>
      </div>

      {editingQuestion && (
        <div className="question-editor">
          {editingQuestion.quizType === "Multiple Choice Question" && (
            <MultipleChoiceEditor
              question={editingQuestion as MultipleChoiceQuestion}
              setQuestion={setEditingQuestion}
              onSave={handleSaveQuestion}
              onCancel={handleCancelEdit}
              isNewQuestion={isNewQuestion}
            />
          )}

          {editingQuestion.quizType === "True or False" && (
            <TrueFalseEditor
              question={editingQuestion as TrueFalseQuestion}
              setQuestion={setEditingQuestion}
              onSave={handleSaveQuestion}
              onCancel={handleCancelEdit}
              isNewQuestion={isNewQuestion}
            />
          )}

          {editingQuestion.quizType === "Fill in the Blank" && (
            <FillInBlankEditor
              question={editingQuestion as FillInBlankQuestion}
              setQuestion={setEditingQuestion}
              onSave={handleSaveQuestion}
              onCancel={handleCancelEdit}
              isNewQuestion={isNewQuestion}
            />
          )}
        </div>
      )}
    </div>
  );
};

// Multiple Choice Question Editor Component
interface MultipleChoiceEditorProps {
  question: MultipleChoiceQuestion;
  setQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
  onSave: () => void;
  onCancel: () => void;
  isNewQuestion?: boolean;
}

const MultipleChoiceEditor: React.FC<MultipleChoiceEditorProps> = ({
  question,
  setQuestion,
  onSave,
  onCancel,
  isNewQuestion,
}) => {
  const editorRef = useRef<any>(null);

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({
      ...question,
      title: e.target.value,
    });
  };

  // Handle question type change
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as
      | "Multiple Choice Question"
      | "True or False"
      | "Fill in the Blank";

    if (newType === "True or False") {
      const trueFalseQuestion: TrueFalseQuestion = {
        ...question,
        quizType: "True or False",
        answer: [
          { _id: "1", text: "True" },
          { _id: "2", text: "False" }
        ],
        correctAnswer: true,
      };
      setQuestion(trueFalseQuestion);
    } else if (newType === "Fill in the Blank") {
      const fillInBlankQuestion: FillInBlankQuestion = {
        ...question,
        quizType: "Fill in the Blank",
        answer: [{ _id: "1", text: "4" }],
        correctAnswer: ["4"],
      };
      setQuestion(fillInBlankQuestion);
    }
  };

  // Handle points change
  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({
      ...question,
      point: parseInt(e.target.value) || 0,
    });
  };

  // Handle quiz level change
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuestion({
      ...question,
      quizLevel: e.target.value as "Easy Level" | "Medium Level" | "Hard Level",
    });
  };

  // Handle editor content change
  const handleEditorChange = (content: string) => {
    setQuestion({
      ...question,
      question: content,
    });
  };

  // Handle answer text change
  const handleAnswerTextChange = (_id: string, text: string) => {
    setQuestion({
      ...question,
      answer: question.answer.map((answer) =>
        answer._id === _id ? { ...answer, text } : answer
      ),
    });
  };

  // Handle setting an answer as correct
  const handleSetCorrectAnswer = (_id: string) => {
    setQuestion({
      ...question,
      correctAnswer: _id,
      answer: question.answer.map((answer) => ({
        ...answer,
        isCorrect: answer._id === _id,
      })),
    });
  };

  // Handle adding a new answer
  const handleAddAnswer = () => {
    const newId = (
      Math.max(...question.answer.map((a) => parseInt(a._id) || 0)) + 1
    ).toString();
    setQuestion({
      ...question,
      answer: [...question.answer, { _id: newId, text: "", isCorrect: false }],
    });
  };

  // Handle removing an answer
  const handleRemoveAnswer = (_id: string) => {
    const newAnswers = question.answer.filter((answer) => answer._id !== _id);

    // If we removed the correct answer, set the first one as correct
    const hasCorrectAnswer = newAnswers.some((answer) => answer.isCorrect);

    if (!hasCorrectAnswer && newAnswers.length > 0) {
      newAnswers[0].isCorrect = true;
      setQuestion({
        ...question,
        answer: newAnswers,
        correctAnswer: newAnswers[0]._id,
      });
    } else {
      setQuestion({
        ...question,
        answer: newAnswers,
      });
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-white">
        <div className="row align-items-center">
          <div className="col d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Question Title"
              value={question.title || ""}
              onChange={handleTitleChange}
              style={{ width: "auto" }}
            />
            <select
              className="form-select"
              value={question.quizType}
              onChange={handleTypeChange}
              style={{ width: "auto" }}
            >
              {QUESTION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="col-auto d-flex align-items-center gap-2">
            <span>Level:</span>
            <select
              className="form-select"
              value={question.quizLevel}
              onChange={handleLevelChange}
              style={{ width: "auto" }}
            >
              {QUIZ_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <span>pts:</span>
            <input
              type="number"
              className="form-control"
              value={question.point}
              onChange={handlePointsChange}
              style={{ width: "60px" }}
            />
          </div>
        </div>
      </div>

      <div className="card-body">
        <p className="text-muted">
          Enter your question and multiple answers, then select the one correct
          answer.
        </p>

        <div className="mb-3">
          <label className="form-label fw-bold fs-5">Question:</label>
          <Editor
            onInit={(editor: any) => (editorRef.current = editor)}
            value={question.question}
            apiKey="your-tinymce-api-key"
            init={{
              height: 150,
              menubar: false,
              statusbar: false,
              plugins: "lists link image table code",
              toolbar:
                "bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | superscript",
              content_style:
                'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 16px; }',
            }}
            onEditorChange={handleEditorChange}
          />
        </div>

        <div className="mt-4">
          <h5 className="mb-3">Answers:</h5>

          {question.answer.map((answer) => (
            <div className="row mb-3 align-items-center" key={answer._id}>
              <div
                className={`col-md-2 ${answer.isCorrect ? "text-success" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => handleSetCorrectAnswer(answer._id)}
              >
                {answer.isCorrect ? (
                  <>
                    <span className="me-1">➡</span> Correct Answer
                  </>
                ) : (
                  "Possible Answer"
                )}
              </div>
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  value={answer.text}
                  onChange={(e) =>
                    handleAnswerTextChange(answer._id, e.target.value)
                  }
                />
              </div>
              <div className="col-md-1">
                <button
                  className="btn btn-outline-secondary border-0"
                  onClick={() => handleRemoveAnswer(answer._id)}
                  disabled={question.answer.length <= 2}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          <div className="mt-3 mb-4">
            <button
              className="btn btn-link text-danger"
              onClick={handleAddAnswer}
            >
              + Add Another Answer
            </button>
          </div>
        </div>
      </div>

      <div className="card-footer bg-white">
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onSave}>
            {isNewQuestion ? "Add Question" : "Update Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

// True/False Question Editor Component
interface TrueFalseEditorProps {
  question: TrueFalseQuestion;
  setQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
  onSave: () => void;
  onCancel: () => void;
  isNewQuestion: boolean;
}

const TrueFalseEditor: React.FC<TrueFalseEditorProps> = ({
  question,
  setQuestion,
  onSave,
  onCancel,
  isNewQuestion,
}) => {
  const editorRef = useRef<any>(null);

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({
      ...question,
      title: e.target.value,
    });
  };

  // Handle question type change
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as
      | "Multiple Choice Question"
      | "True or False"
      | "Fill in the Blank";

    if (newType === "Multiple Choice Question") {
      const multipleChoiceQuestion: MultipleChoiceQuestion = {
        ...question,
        quizType: "Multiple Choice Question",
        answer: [
          { _id: "1", text: "Option 1", isCorrect: true },
          { _id: "2", text: "Option 2", isCorrect: false },
        ],
        correctAnswer: "1",
      };
      setQuestion(multipleChoiceQuestion);
    } else if (newType === "Fill in the Blank") {
      const fillInBlankQuestion: FillInBlankQuestion = {
        ...question,
        quizType: "Fill in the Blank",
        answer: [{ _id: "1", text: "Answer 1" }],
        correctAnswer: ["Answer 1"],
      };
      setQuestion(fillInBlankQuestion);
    }
  };

  // Handle points change
  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({
      ...question,
      point: parseInt(e.target.value) || 0,
    });
  };

  // Handle quiz level change
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuestion({
      ...question,
      quizLevel: e.target.value as "Easy Level" | "Medium Level" | "Hard Level",
    });
  };

  // Handle editor content change
  const handleEditorChange = (content: string) => {
    setQuestion({
      ...question,
      question: content,
    });
  };

  // Handle answer selection
  const handleSetAnswer = (isTrue: boolean) => {
    setQuestion({
      ...question,
      correctAnswer: isTrue,
    });
  };

  return (
    <div className="card">
      <div className="card-header bg-white">
        <div className="row align-items-center">
          <div className="col d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Question Title"
              value={question.title || ""}
              onChange={handleTitleChange}
              style={{ width: "auto" }}
            />
            <select
              className="form-select"
              value={question.quizType}
              onChange={handleTypeChange}
              style={{ width: "auto" }}
            >
              {QUESTION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="col-auto d-flex align-items-center gap-2">
            <span>Level:</span>
            <select
              className="form-select"
              value={question.quizLevel}
              onChange={handleLevelChange}
              style={{ width: "auto" }}
            >
              {QUIZ_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <span>pts:</span>
            <input
              type="number"
              className="form-control"
              value={question.point}
              onChange={handlePointsChange}
              style={{ width: "60px" }}
            />
          </div>
        </div>
      </div>

      <div className="card-body">
        <p className="text-muted">
          Enter your question text, then select if True or False is the correct
          answer.
        </p>

        <div className="mb-3">
          <label className="form-label fw-bold fs-5">Question:</label>
          <Editor
            onInit={(editor: any) => (editorRef.current = editor)}
            value={question.question}
            apiKey="your-tinymce-api-key"
            init={{
              height: 150,
              menubar: false,
              statusbar: false,
              plugins: "lists link image table code",
              toolbar:
                "bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | superscript",
              content_style:
                'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 16px; }',
            }}
            onEditorChange={handleEditorChange}
          />
        </div>

        <div className="mt-4">
          <h5 className="mb-3">Answers:</h5>

          <div className="mb-2">
            <div
              className={`p-2 ${question.correctAnswer ? "text-success fw-bold" : ""
                }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleSetAnswer(true)}
            >
              {question.correctAnswer && <span className="me-1">➡</span>} True
            </div>
          </div>
          <div className="mb-2">
            <div
              className={`p-2 ${!question.correctAnswer ? "text-success fw-bold" : ""
                }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleSetAnswer(false)}
            >
              {!question.correctAnswer && <span className="me-1">➡</span>} False
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer bg-white">
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onSave}>
            {isNewQuestion ? "Add Question" : "Update Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Fill In The Blank Question Editor Component
interface FillInBlankEditorProps {
  question: FillInBlankQuestion;
  setQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
  onSave: () => void;
  onCancel: () => void;
  isNewQuestion: boolean;
}

const FillInBlankEditor: React.FC<FillInBlankEditorProps> = ({
  question,
  setQuestion,
  onSave,
  onCancel,
  isNewQuestion,
}) => {
  const editorRef = useRef<any>(null);

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({
      ...question,
      title: e.target.value,
    });
  };

  // Handle question type change
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as
      | "Multiple Choice Question"
      | "True or False"
      | "Fill in the Blank";

    if (newType === "Multiple Choice Question") {
      const multipleChoiceQuestion: MultipleChoiceQuestion = {
        ...question,
        quizType: "Multiple Choice Question",
        answer: [
          { _id: "1", text: "Option 1", isCorrect: true },
          { _id: "2", text: "Option 2", isCorrect: false },
        ],
        correctAnswer: "1",
      };
      setQuestion(multipleChoiceQuestion);
    } else if (newType === "True or False") {
      const trueFalseQuestion: TrueFalseQuestion = {
        ...question,
        quizType: "True or False",
        answer: [
          { _id: "1", text: "True" },
          { _id: "2", text: "False" }
        ],
        correctAnswer: true,
      };
      setQuestion(trueFalseQuestion);
    }
  };

  // Handle points change
  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({
      ...question,
      point: parseInt(e.target.value) || 0,
    });
  };

  // Handle quiz level change
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuestion({
      ...question,
      quizLevel: e.target.value as "Easy Level" | "Medium Level" | "Hard Level",
    });
  };

  // Handle editor content change
  const handleEditorChange = (content: string) => {
    setQuestion({
      ...question,
      question: content,
    });
  };

  // Handle answer text change
  const handleAnswerTextChange = (_id: string, text: string) => {
    setQuestion({
      ...question,
      answer: question.answer.map((answer) =>
        answer._id === _id ? { ...answer, text } : answer
      ),
      // Also update the correctAnswer array to keep in sync
      correctAnswer: question.answer.map(a =>
        a._id === _id ? text : (question.correctAnswer.includes(a.text) ? a.text : null)
      ).filter(Boolean) as string[]
    });
  };

  // Handle adding a new answer
  const handleAddAnswer = () => {
    const newId = (
      Math.max(...question.answer.map((a) => parseInt(a._id) || 0)) + 1
    ).toString();
    const newText = "";
    setQuestion({
      ...question,
      answer: [...question.answer, { _id: newId, text: newText }],
      correctAnswer: [...question.correctAnswer, newText].filter(Boolean)
    });
  };

  // Handle removing an answer
  const handleRemoveAnswer = (_id: string) => {
    const answerToRemove = question.answer.find(a => a._id === _id);
    const newAnswers = question.answer.filter((answer) => answer._id !== _id);

    setQuestion({
      ...question,
      answer: newAnswers,
      correctAnswer: answerToRemove
        ? question.correctAnswer.filter(a => a !== answerToRemove.text)
        : question.correctAnswer
    });
  };

  return (
    <div className="card">
      <div className="card-header bg-white">
        <div className="row align-items-center">
          <div className="col d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Question Title"
              value={question.title || ""}
              onChange={handleTitleChange}
              style={{ width: "auto" }}
            />
            <select
              className="form-select"
              value={question.quizType}
              onChange={handleTypeChange}
              style={{ width: "auto" }}
            >
              {QUESTION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="col-auto d-flex align-items-center gap-2">
            <span>Level:</span>
            <select
              className="form-select"
              value={question.quizLevel}
              onChange={handleLevelChange}
              style={{ width: "auto" }}
            >
              {QUIZ_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <span>pts:</span>
            <input
              type="number"
              className="form-control"
              value={question.point}
              onChange={handlePointsChange}
              style={{ width: "60px" }}
            />
          </div>
        </div>
      </div>

      <div className="card-body">
        <p className="text-muted">
          Enter your question text, then define all possible correct answers for
          the blank.
          <br />
          Students will see the question followed by a small text box to type
          their answer.
        </p>

        <div className="mb-3">
          <label className="form-label fw-bold fs-5">Question:</label>
          <Editor
            onInit={(editor: any) => (editorRef.current = editor)}
            value={question.question}
            apiKey="your-tinymce-api-key"
            init={{
              height: 150,
              menubar: false,
              statusbar: false,
              plugins: "lists link image table code",
              toolbar:
                "bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | superscript",
              content_style:
                'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 16px; }',
            }}
            onEditorChange={handleEditorChange}
          />
        </div>

        <div className="mt-4">
          <h5 className="mb-3">Answers:</h5>

          {question.answer.map((answer) => (
            <div className="row mb-3 align-items-center" key={answer._id}>
              <div className="col-md-2">Possible Answer:</div>
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  value={answer.text}
                  onChange={(e) =>
                    handleAnswerTextChange(answer._id, e.target.value)
                  }
                />
              </div>
              <div className="col-md-1">
                <button
                  className="btn btn-outline-secondary border-0"
                  onClick={() => handleRemoveAnswer(answer._id)}
                  disabled={question.answer.length <= 1}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          <div className="mt-3 mb-4">
            <button
              className="btn btn-link text-danger"
              onClick={handleAddAnswer}
            >
              + Add Another Answer
            </button>
          </div>
        </div>
      </div>

      <div className="card-footer bg-white">
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onSave}>
            {isNewQuestion ? "Add Question" : "Update Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizEditorTrial;