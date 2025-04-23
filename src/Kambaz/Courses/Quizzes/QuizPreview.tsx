import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as quizzesClient from "./client";
import { format } from "date-fns";
import { fetchResult } from "./Quiz/utils/quizApi";

const QuizDetails = () => {
  const { quizId, cid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [quizResults, setQuizResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<
    { _id?: string; type?: string; text?: string; points?: number }[]
  >([]);
  const [totalPoints, setTotalPoints] = useState(1);
  const [showReview, setQuizReview] = useState(false);
  const isAdminOrFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  // useEffect(() => {
  //   const fetchQuizDetails = async () => {
  //     try {
  //       const quizData = await quizzesClient.getQuizById(quizId);
  //       setQuiz(quizData);

  //       // Fetch questions for this quiz
  //       const quizQuestions = await quizzesClient.getQuizQuestionById(quizId);
  //       setQuestions(quizQuestions || []);

  //       // Calculate total points
  //       if (Array.isArray(quizQuestions)) {
  //         const points = quizQuestions.reduce(
  //           (total, q) => total + (q.points || 0),
  //           0
  //         );
  //         setTotalPoints(points);
  //       }

  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching quiz details:", error);
  //       setLoading(false);
  //     }
  //   };

  //   if (quizId) {
  //     fetchQuizDetails();
  //   }
  // }, [quizId]);
  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const quizData = await quizzesClient.getQuizById(quizId);
        setQuiz(quizData);

        // Fetch questions for this quiz
        const quizQuestions = await quizzesClient.getQuizQuestionById(quizId);
        console.log("Quiz questions received:", quizQuestions ? quizQuestions.length : 0);
        setQuestions(quizQuestions || []);

        // Calculate total points
        if (Array.isArray(quizQuestions)) {
          const points = quizQuestions.reduce((total, q) => total + (q.points || 0), 0);
          setTotalPoints(points);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
        setLoading(false);
      }
    };

    const fetchStudentResults = async () => {
      if (isAdminOrFaculty || !quizId || !currentUser?._id) {
        return;
      }
      
      try {
        const result = await fetchResult(quizId, currentUser._id);
        console.log("Fetched student result:", result);
        setQuizResults(result);
      } catch (error) {
        console.error("Error fetching quiz results:", error);
      }
    };

    if (quizId) {
      fetchQuizDetails();
      fetchStudentResults();
    }
  }, [quizId, currentUser, isAdminOrFaculty]);
  console.log(quiz);
  const handleEdit = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/editor/${quizId}`);
  };

  const handlereattemptQuiz = async (quizId: string) => {
    console.log("ghbnjmk");
    const quizResult = await fetchResult(quizId, currentUser._id);
    console.log("quizResult", quizResult);
    console.log(quiz.multipleAttempts);

    if (quizResult) {
      console.log(quizResult.attemptNumber);
      if (quizResult.attemptNumber) {
        setQuizResults(quizResult);
        if (quizResult.attemptNumber >= quiz.multipleAttempts) {
          setQuizReview(true);
          console.log("Maximum attempts reached");
          alert(
            "You have already completed the maximum number of attempts for this quiz."
          );
        } else {
          navigate(
            `questions/${quiz.multipleAttempts}/${quizResult.attemptNumber}`
          );
        }
      }
    } else {
      navigate(`questions`);
    }
  };

  

  const handlePreview = () => {
    navigate(`questions`);
  };

  const handleStartQuiz = () => {
    navigate(
      `/Kambaz/Courses/${cid}/user/${currentUser._id}/${quizId}/questions`
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set";
    try {
      return format(new Date(dateString), "MMM dd 'at' h:mma");
    } catch (e) {
      return "Invalid date";
    }
  };

  // Determine if user is faculty or student
  const isFaculty = currentUser?.role !== "student";

  if (loading) {
    return <div className="text-center my-5">Loading quiz details...</div>;
  }

  if (!quiz) {
    return <div className="text-center my-5">Quiz not found</div>;
  }

  // For students, show only a button to start the quiz
  if (!isFaculty) {
    return (
      <Container className="mt-5">
        <h1>{quiz.title}</h1>
        <div
          className="my-4"
          dangerouslySetInnerHTML={{ __html: quiz.description }}
        />
        <div className="text-center mt-5">
          <Button
            variant="primary"
            size="lg"
            onClick={handleStartQuiz}
            id="wd-start-quiz-btn"
          >
            Start Quiz
          </Button>
        </div>
      </Container>
    );
  }

  // For faculty users, show detailed quiz information
  return (
    <Container className="mt-4">
      <h2 id="wd-quiz-details-header">Quiz Details Screen</h2>

      <h1 className="mb-4">{quiz.title}</h1>
      <div className="my-4" dangerouslySetInnerHTML={{ __html: quiz.description }} />

      {!isAdminOrFaculty && quizResults !== null && (
        <div className="mb-4">
          <h3 className="h5 mb-3">Your Latest Score</h3>
          <Table responsive bordered>
            <thead className="bg-light">
              <tr>
                <th>Score</th>
                <th>Percentage</th>
                
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className={quizResults.percentage >= 60 ? "text-success" : "text-danger"}>
                    <strong>{quizResults.score}</strong> / {quizResults.maxScore} points
                  </span>
                </td>
                <td>
                  <Badge bg={quizResults.percentage >= 60 ? "success" : "danger"}>
                    {quizResults.percentage}%
                  </Badge>
                </td>
               
                <td>
                  {formatDate(quizResults.submittedAt)}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}

      <div className="d-flex justify-content-end mb-4">
        {isAdminOrFaculty && (
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={handlePreview}
            id="wd-preview-quiz-btn"
          >
            Preview
          </Button>
        )}

        {!isAdminOrFaculty && (
          <Button
            className="me-2 btn-danger"
            onClick={() => quizId && handlereattemptQuiz(quizId)}
            id="wd-reattempt-quiz-btn"
          >
            Attempt Quiz
          </Button>
        )}
      </div>
      <div className="quiz-info mb-5">
        <Table responsive bordered hover>
          <tbody>
            <tr>
              <td className="text-end fw-bold" style={{ width: "30%" }}>
                Quiz Type
              </td>
              <td>{quiz.quizType || "Graded Quiz"}</td>
            </tr>
            <tr>
              <td className="text-end fw-bold">Points</td>
              <td>{quiz.totalPoints}</td>
            </tr>
            {isAdminOrFaculty && (
              <>
                <tr>
                  <td className="text-end fw-bold">Assignment Group</td>
                  <td>{quiz.assignmentGroup || "QUIZZES"}</td>
                </tr>
                <tr>
                  <td className="text-end fw-bold">Shuffle Answers</td>
                  <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td className="text-end fw-bold">Show Correct Answers</td>
                  <td>
                    {(() => {
                      switch (quiz.showCorrectAnswers) {
                        case "always":
                          return "Always";
                        case "after_attempt":
                          return "Immediately";
                        case "after_due_date":
                          return "After Due Date";
                        default:
                          return "Never";
                      }
                    })()}
                  </td>
                </tr>
                <tr>
                  <td className="text-end fw-bold">One Question at a Time</td>
                  <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td className="text-end fw-bold">
                    Lock Questions After Answering
                  </td>
                  <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
                </tr>
              </>
            )}

            <tr>
              <td className="text-end fw-bold">Time Limit</td>
              <td>
                {quiz.timeLimit
                  ? `${quiz.timeLimitMinutes || 0} Minutes`
                  : "No time limit"}
              </td>
            </tr>
            <tr>
              <td className="text-end fw-bold">Multiple Attempts</td>
              <td>{quiz.multipleAttempts}</td>
            </tr>

            <tr>
              <td className="text-end fw-bold">Webcam Required</td>
              <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </Table>

        <Table responsive bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatDate(quiz.dueDate)}</td>
              <td>{quiz.assignTo || "Everyone"}</td>
              <td>{formatDate(quiz.availableDate)}</td>
              <td>{formatDate(quiz.untilDate)}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default QuizDetails;

function dispatch(arg0: { type: any }) {
  throw new Error("Function not implemented.");
}
