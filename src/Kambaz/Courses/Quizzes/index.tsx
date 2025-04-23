import { Route, Routes } from "react-router";
import QuizzesHome from "./QuizzesHome";
import QuizEditor from "./QuizEditor";
import QuizQuestions from "./QuizQuestions";
import QuizWrapper from "./Quiz/components/QuizWrapper";
import QuizDetails from "./QuizPreview";
import QuizContainer from "./Quiz/components/QuizContainer";
import QuizApp from "./Quiz/components/QuizApp";
import { QuizProvider } from "./Quiz/context/QuizContext";
export default function Quizzes() {
  return (
    <div id="wd-account-screen">
      <Routes>
        <Route path="/" element={<QuizzesHome />} />
        <Route path=":courseId/quizzeshome" element={<QuizzesHome />} />
        <Route path="/editor/:quizId" element={<QuizEditor />} />
        <Route path="/editor" element={<QuizEditor />} />
        <Route path="/questions" element={<QuizQuestions />} />
        {/* <Route path = "/user/:userId/:quizId/questions" element={<QuizWrapper />} /> */}
        <Route
          path="/user/:userId/:quizId/details/questions"
          element={<QuizWrapper />}
        />
        <Route
          path="/user/:userId/:quizId/details"
          element={<QuizDetails />}
        />
        <Route
          path="/user/:userId/:quizId/details/questions/:maxAttempt/:attemptNumber"
          element={<QuizWrapper />}
        />
      </Routes>
    </div>
  );
}
