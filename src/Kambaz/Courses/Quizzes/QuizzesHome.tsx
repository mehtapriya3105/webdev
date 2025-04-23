import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "../../ProtectedRoutes";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button, ListGroup } from "react-bootstrap";
import { VscKebabVertical } from "react-icons/vsc";
import { useNavigate, useParams } from "react-router-dom";
import * as quizzesClient from "./client";
import { setQuizzes, deleteQuiz, publisUnpublishQuizR } from "./QuizReducer";
import { useEffect } from "react";
import QuizControlButtons from "./QuizControlButton";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";

export default function QuizzesHome() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchQuizes = async () => {
    const modules = await quizzesClient.findQuizzesForCourse(cid);
    dispatch(setQuizzes(modules));
  };
  useEffect(() => {
    fetchQuizes();
  }, []);

  const addCreateQuiz = async () => {
    navigate("editor");
  };

  const deleteQuizzes = async (quizId: any) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const publishUnpublishQuiz = async (quizId: any, quizStatus: any) => {
    await quizzesClient.publishUnpublishQuizClient(quizId, quizStatus);
    dispatch(publisUnpublishQuizR({ _id: quizId, status: quizStatus }));
  };

  const updateQuiz = async (quizId: any, quizData: any) => {
    console.log("quizData", quizId);
    localStorage.setItem(`quiz-${quizId}`, JSON.stringify(quizData));
    console.log("fgeuyfbg");
    navigate(`editor/${quizId}`);
  };

  const navigateToQuiz = (quizId: string) => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/user/${currentUser._id}/${quizId}/details`);
  };
  
  return (
    <div className="w-100">
      {/* Top Button */}
      {/* <div className="d-flex justify-content-end mb-3">
        <ProtectedRoute>
          <Button
            variant="light"
            size="lg"
            id="wd-quiz-view-student"
            style={{
              backgroundColor: "transparent",
              border: "1px solid black",
              color: "black",
            }}
          >
            <GrOverview
              className="me-2"
              style={{ position: "relative", bottom: "1px" }}
            />
            Student View
          </Button>
        </ProtectedRoute>
      </div> */}

      {/* Search bar and two buttons aligned horizontally */}
      <div className="d-flex align-items-center gap-3">
        {/* Search Bar */}
        <div className="position-relative flex-grow-1">
          <HiMagnifyingGlass
            className="position-absolute"
            style={{ top: "50%", transform: "translateY(-50%)", left: "12px" }}
          />
          <input
            type="text"
            placeholder="Search..."
            className="form-control wd-search-bar"
            style={{ paddingLeft: "30px", height: "48px" }}
          />
        </div>

        {/* Buttons */}
        <ProtectedRoute>
          <Button
            variant="danger"
            size="lg"
            id="wd-add-quiz"
            onClick={addCreateQuiz}
          >
            <FaPlus
              className="me-2 position-relative"
              style={{ bottom: "1px" }}
            />
            Quiz
          </Button>
          <Button variant="secondary" size="lg" id="wd-add-quiz-btn">
            <VscKebabVertical
              className="position-relative"
              style={{ bottom: "1px" }}
            />
          </Button>
        </ProtectedRoute>
      </div>
      <div>
        <ListGroup className="mt-5">
          {quizzes.map((assignment: any) => (
            <ListGroup.Item
              key={assignment._id}

              className="d-flex justify-content-between align-items-center p-3 wd-lesson"
            >
              <div className="d-flex align-items-center">
                <QuizControlButtons />
                <div className="mt-3">
                  <div className="ms-3 assignment-item">
                    <div
                      className="quiz-title"
                      onClick={() => navigateToQuiz(assignment._id)}
                      style={{
                        cursor: 'pointer',
                        color: '#0d6efd',
                        textDecoration: 'underline'
                      }}
                    >
                      <strong>{assignment.title}</strong>
                    </div>
                    <p className="wd-assignment-details mb-0">
                      <span className="text-danger">{assignment.title}</span> |{" "}
                      <b>Not Available until</b>{" "}
                      {assignment.availableDate} |
                      <br />
                      <b>Due </b>
                      {assignment.dueDate} | {assignment.totalPoints} pts
                    </p>
                  </div>
                </div>
              </div>

              {currentUser.role != "STUDENT" && (<div> <IoCheckmarkCircle
                className={`lg ${assignment.status == "publish"
                  ? "text-success"
                  : "text-danger"
                  }`}
                onClick={() =>
                  publishUnpublishQuiz(assignment._id, assignment.status)
                }
              />

                <FaTrash
                  className="text-danger"
                  onClick={() => deleteQuizzes(assignment._id)}
                />
                <FaPencil
                  className="text-primary"
                  onClick={() => {
                    console.log("assignment", assignment);
                    updateQuiz(assignment._id, assignment)
                  }}
                />
                <VscKebabVertical />
              </div>)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
