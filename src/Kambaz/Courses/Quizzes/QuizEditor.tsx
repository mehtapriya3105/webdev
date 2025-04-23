import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addQuiz, setQuizQuestions, updateQuiz } from "./QuizReducer";
import * as quizzesClient from "./client";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Nav, Card } from "react-bootstrap";
import { MdDoNotDisturbAlt, MdMoreVert } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import QuestionEditor from "./QuestionEditor";
import QuizEditorTrial from "./QuizQuestions";
import { findQuizQuestions, getQuizQuestionById } from "./client";
import { FaCalendarAlt } from "react-icons/fa";

// Define the Question types to match what's in QuizQuestions.tsx
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

type Question = MultipleChoiceQuestion | TrueFalseQuestion | FillInBlankQuestion;

export default function QuizEditor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cid } = useParams();
  console.log("cid", cid);
  const { quizId } = useParams();

  const [activeTab, setActiveTab] = useState<"Details" | "Questions">("Details");
  const [mergedQuestions, setMergedQuestions] = useState<Question[]>([]);

  // Date formatting helper function
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  // Initialize quiz state with all schema fields
  const [quiz, setQuiz] = useState({
    _id: quizId != undefined ? quizId : uuidv4(),
    title: "Unnamed Quiz",
    description: "Hello",
    availableDate: "",
    dueDate: "",
    untilDate: "",
    courseCode: cid,
    quizType: "Graded Quiz",
    assignmentGroup: "ASSIGNMENTS",
    shuffleAnswers: false,
    timeLimit: false,
    timeLimitMinutes: 0,
    multipleAttempts: 1,
    showCorrectAnswers: "",
    accessCode: "",
    oneQuestionAtATime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    totalPoints: 0,
    status: "unpublish",
    assignTo: "Everyone"
  });

  useEffect(() => {
    if (quizId) {
      console.log("quizId", quizId);
      const savedQuiz = localStorage.getItem(`quiz-${quizId}`);
      if (savedQuiz) {
        setQuiz(JSON.parse(savedQuiz));
      }
    }
  }, [quizId]);

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    loadQuestions();
  }, [activeTab, quizId]);

  const loadQuestions = async () => {
    if (activeTab === "Questions") {
      if (quizId) { 
        try {
          // Cast the API response to the Question type
          const apiQuestions = await getQuizQuestionById(quizId || "");
          const typedQuestions = apiQuestions as Question[];
          
          setMergedQuestions(typedQuestions);
          dispatch(setQuizQuestions(typedQuestions));
          
          // Calculate and update total points
          const totalPoints = typedQuestions.reduce((sum, q) => sum + (q.point || 0), 0);
          setQuiz(prevQuiz => ({
            ...prevQuiz,
            totalPoints: totalPoints
          }));
        } catch (error) {
          console.error("Error fetching questions from API:", error);
        }
      } else {
        console.error("Error fetching questions from API: Quiz ID is undefined");
      }
    }
  };

  const updateTotalPoints = (points: number) => {
    setQuiz({
      ...quiz,
      totalPoints: points
    });
  };

  const handleEditorChange = (content: string) => {
    setQuiz({ ...quiz, description: content });
  };

  const onSaveFunction = async (quiz: any, publish: boolean = false) => {
    // Set publish status if requested
    console.log("ehduiejwf" , quiz);
    if (publish) {
      quiz.status = "publish";
    }

    console.log("here");
    
    const quizWithUpdatedPoints = {
      ...quiz,
      totalPoints: quiz.point
    };

    console.log("quizWithUpdatedPoints", quizWithUpdatedPoints);
    
  
    try {
      if (quizId == undefined) {
        const createdQuiz = await quizzesClient.createQuiz(quizWithUpdatedPoints);
        localStorage.removeItem(`quiz-${quiz._id}`);
        dispatch(addQuiz(createdQuiz));
      } else {
        const updatedQuiz = await quizzesClient.updateQuizData(quizId, quizWithUpdatedPoints);
        dispatch(updateQuiz(updatedQuiz));
      }
      navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const cancelFunction = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const handleQuestionSaved = () => {
    setActiveTab('Details');
  };

  const removeAssignmentTarget = () => {
    setQuiz({ ...quiz, assignTo: "" });
  };

  const handleTimeLimitChange = (checked: boolean) => {
    setQuiz({
      ...quiz,
      timeLimit: checked,
      timeLimitMinutes: checked ? (quiz.timeLimitMinutes || 30) : 0
    });
  };

  return (
    <div id="wd-quiz-editor" className="container-fluid">
      {/* Header with Points and Published Status */}
      <div className="d-flex justify-content-end align-items-center mb-3 mt-3">
        <span className="me-3">Points: {quiz.totalPoints}</span>
        {activeTab === "Details" && (
          <div className="d-flex align-items-center me-3">
            <MdDoNotDisturbAlt className="me-1" />
            <span>{quiz.status === "publish" ? "Published" : "Not Published"}</span>
          </div>
        )}
        {activeTab === "Details" && (
          <Button variant="light" className="border-0">
            <MdMoreVert />
          </Button>
        )}
      </div>

      {/* Navigation Tabs */}
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link
            active={activeTab === "Details"}
            onClick={() => setActiveTab("Details")}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === "Questions"}
            onClick={() => {
              if(quizId != undefined){
                setActiveTab("Questions");
                if (quizId) {
                  findQuizQuestions(quizId);
                }
              } else {
                alert("Please save the quiz before adding questions.");
              }
            }}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div>
        {activeTab === "Details" ? (
          <div className="details-tab">
            {/* Quiz Title */}
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                placeholder="Unnamed Quiz"
                className="form-control-lg border-1"
              />
            </Form.Group>

            {/* Quiz Instructions Editor */}
            <Form.Group className="mb-4">
              <Form.Label>Quiz Instructions:</Form.Label>
              <QuestionEditor
                initialValue={quiz.description}
                onEditorChange={handleEditorChange}
              />
            </Form.Group>

            {/* Quiz Settings */}
            <Row className="mb-3">
              <Col md={6} className="text-end">
                <Form.Label>Quiz Type</Form.Label>
              </Col>
              <Col md={3}>
                <Form.Select
                  value={quiz.quizType}
                  onChange={(e) =>
                    setQuiz({ ...quiz, quizType: e.target.value })
                  }
                  className="mb-3"
                >
                  <option value="Graded Quiz">Graded Quiz</option>
                  <option value="Practice Quiz">Practice Quiz</option>
                  <option value="Graded Survey">Graded Survey</option>
                  <option value="Ungraded Survey">Ungraded Survey</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6} className="text-end">
                <Form.Label>Assignment Group</Form.Label>
              </Col>
              <Col md={3}>
                <Form.Select
                  value={quiz.assignmentGroup}
                  onChange={(e) =>
                    setQuiz({ ...quiz, assignmentGroup: e.target.value })
                  }
                  className="mb-3"
                >
                  <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                  <option value="HOMEWORK">HOMEWORK</option>
                  <option value="PROJECTS">PROJECTS</option>
                  <option value="QUIZZES">QUIZZES</option>
                </Form.Select>
              </Col>
            </Row>

            {/* Options Section */}
            <Row className="mb-3">
              <Col md={7} className="text-end">
                <h5>Options</h5>
              </Col>
              <Col md={5}>{/* Empty column to align with the header */}</Col>
            </Row>

            <Row className="mb-3">
              <Col md={6} className="text-end"></Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="shuffle-answers"
                    label="Shuffle Answers"
                    checked={quiz.shuffleAnswers}
                    onChange={(e) =>
                      setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3 d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    id="time-limit"
                    label="Time Limit"
                    checked={quiz.timeLimit}
                    onChange={(e) => handleTimeLimitChange(e.target.checked)}
                    className="me-2"
                  />

                  {quiz.timeLimit && (
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="number"
                        value={quiz.timeLimitMinutes}
                        onChange={(e) =>
                          setQuiz({
                            ...quiz,
                            timeLimitMinutes: parseInt(e.target.value) || 0,
                          })
                        }
                        style={{ width: "100px" }}
                        className="me-2"
                      />
                      <span>Minutes</span>
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="one-question-at-time"
                    label="One Question At A Time"
                    checked={quiz.oneQuestionAtATime}
                    onChange={(e) =>
                      setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="lock-questions"
                    label="Lock Questions After Answering"
                    checked={quiz.lockQuestionsAfterAnswering}
                    onChange={(e) =>
                      setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="webcam-required"
                    label="Webcam Required During Quiz"
                    checked={quiz.webcamRequired}
                    onChange={(e) =>
                      setQuiz({ ...quiz, webcamRequired: e.target.checked })
                    }
                  />
                </Form.Group>

                <div className="border p-3 mb-4">
                  <Form.Group controlId="multiple-attempts">
                    <Form.Label>Number of Attempts Allowed</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={quiz.multipleAttempts || 1}
                      onChange={(e) =>
                        setQuiz({ ...quiz, multipleAttempts: parseInt(e.target.value, 10) })
                      }
                    />
                  </Form.Group>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Access Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={quiz.accessCode}
                    onChange={(e) =>
                      setQuiz({ ...quiz, accessCode: e.target.value })
                    }
                    placeholder="Access Code (optional)"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Show Correct Answers</Form.Label>
                  <Form.Select
                    value={quiz.showCorrectAnswers}
                    onChange={(e) =>
                      setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
                    }
                  >
                    <option value="">Never</option>
                    <option value="always">Always</option>
                    <option value="after_attempt">After Each Attempt</option>
                    <option value="after_due_date">After Due Date</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Assignment Section */}
            <Row className="mb-3">
              <Col md={6} className="text-end">
                <Form.Label>Assign</Form.Label>
              </Col>
              <Col md={6}>
                <Card className="p-3 mb-3">
                  <Form.Label>Assign to</Form.Label>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-light rounded px-3 py-2 d-flex align-items-center">
                      <span>{quiz.assignTo || "Everyone"}</span>
                      {quiz.assignTo && (
                        <button
                          className="btn btn-sm ms-2 p-0"
                          onClick={removeAssignmentTarget}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label>Due</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type="date"
                        value={formatDate(quiz.dueDate)}
                        onChange={(e) =>
                          setQuiz({ ...quiz, dueDate: e.target.value })
                        }
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <FaCalendarAlt />
                        </span>
                      </div>
                    </div>
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Available from</Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type="date"
                            value={formatDate(quiz.availableDate)}
                            onChange={(e) =>
                              setQuiz({ ...quiz, availableDate: e.target.value })
                            }
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">
                              <FaCalendarAlt />
                            </span>
                          </div>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Until</Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type="date"
                            value={formatDate(quiz.untilDate)}
                            onChange={(e) =>
                              setQuiz({ ...quiz, untilDate: e.target.value })
                            }
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">
                              <FaCalendarAlt />
                            </span>
                          </div>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="text-center">
                    <Button variant="light" className="border">
                      + Add
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>

            {/* Save/Cancel Buttons */}
            <Row className="mb-3">
              <Col className="d-flex justify-content-center mt-4">
                <Button
                  variant="light"
                  className="me-2"
                  onClick={cancelFunction}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  className="me-2"
                  onClick={() => onSaveFunction(quiz)}
                >
                  Save
                </Button>
                <Button
                  variant="primary"
                  onClick={() => onSaveFunction(quiz, true)}
                >
                  Save & Publish
                </Button>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="questions-tab">
            {/* Questions Tab Content */}
            <QuizEditorTrial
              onQuestionSaved={handleQuestionSaved}
              initialQuestions={mergedQuestions}
              onPointsUpdate={updateTotalPoints}
            />
          </div>
        )}
      </div>
    </div>
  );
}
// try this if above does not work
// const loadQuestions = async () => {
//   if (activeTab === "Questions") {
//     // const savedQuestions = localStorage.getItem("questions");
//     // let parsedQuestions = [];

//     // if (savedQuestions) {
//     //   parsedQuestions = JSON.parse(savedQuestions);
//     // }

//     // const quizZId = parsedQuestions?.[0]?.quizId || quizId;

//     if (quizId) {
      
//         const apiQuestions = await getQuizQuestionById(quizId || "");
//         // const merged = [...parsedQuestions, apiQuestions];
//         setMergedQuestions(apiQuestions);
//         // Fixed here - we need to dispatch instead of directly calling
//         dispatch(setQuizQuestions(apiQuestions));
     
//         console.error("Error fetching questions from API:");
//         // Fixed here - we need to dispatch instead of directly calling
//         dispatch(setQuizQuestions(apiQuestions));
      
//     } else {
//       // Fixed here - we need to dispatch instead of directly calling
//       //dispatch(setQuizQuestions(apiQuestions));
//     }
//   }
// };