// QuizWrapper.jsx
import { useParams } from "react-router-dom";
import { QuizProvider } from "../context/QuizContext";
import QuizApp from "./QuizApp";

const QuizWrapper = () => {
  const { quizId, userId } = useParams();
  // console.log("quizId", quizId);
  // console.log("userId", userId);
  return (
    <div id="wd-quiz-screen">
      <h1 className="wd-quiz-screen-header">Quiz</h1>
      <QuizProvider quizId={quizId || ""} userId={userId || ""}>
        <QuizApp />
      </QuizProvider>
    </div>
  );
};

export default QuizWrapper;