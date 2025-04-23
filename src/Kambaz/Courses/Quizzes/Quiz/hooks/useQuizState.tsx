import {
  useContext,
  useEffect,
  useCallback,
  useRef,
  useState
} from 'react';
import { QuizContext, ACTIONS } from '../context/QuizContext';
import {
  fetchQuestions,
  fetchResult
} from '../utils/quizApi';
import {
  isQuizCompleted,
} from '../utils/localStorage';
import { getQuizById } from '../../client';
import { set } from 'date-fns';

// Use a ref instead of a global variable to track data fetch status
let dataFetchedRef = { current: false };

const useQuizState = () => {
  const context = useContext(QuizContext);
  if (!context)
    throw new Error('useQuizState must be used within QuizProvider');

  const {
    quizId,
    userId,
    quiz,
    isLoading,
    error,
    currentQuestionIndex,
    userAnswers,
    submitted,
    score,
    maxScore,
    lastSaved,
    dispatch,
    reviewMode,
    submitting,
    startNewAttempt: contextStartNewAttempt
  } = context;

  const initialLoadRef = useRef(false);
  
  
const [maxAttempts, setMaxAttempts] = useState(4); // Default to 4
const [attemptNumber, setAttemptNumber] = useState(1); // Default to 1

useEffect(() => {
  // Get quiz metadata
  getQuizById(quizId)
    .then(quizMetadata => {
      console.log("Quiz metadata:", quizMetadata);
      const attempts = quizMetadata.multipleAttempts || 4;
      console.log("Max attempts:", attempts);
      setMaxAttempts(attempts);
    })
    .catch(err => {
      console.error("Error fetching quiz:", err);
    });

  // Get quiz result
  fetchResult(quizId, userId)
    .then(result => {
      if (result) {
        console.log("Quiz result:", result);
        const attempt = result.attemptNumber || 1;
        console.log("Attempt number:", attempt);
        setAttemptNumber(attempt);
      } else {
        console.log("No quiz result found");
      }
    })
    .catch(err => {
      console.error("Error fetching quiz result:", err);
    });
}, [quizId, userId]);

// Now you can use maxAttempts and attemptNumber anywhere in your component

  


  console.log("Max attempts:", quiz);
  const loadQuizData = useCallback(async () => {
    console.log("Loading quiz data...");
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });

    try {
      const questions = await fetchQuestions(quizId);

      if (!questions || questions.length === 0) {
        throw new Error("No questions found for this quiz");
      }

      console.log("Fetched questions:", questions.length);

      dispatch({
        type: ACTIONS.SET_QUIZ,
        payload: {
          id: quizId,
          title: 'Quiz',
          questions,
          multipleAttempts: maxAttempts
        }
      });

      let quizAlreadyCompleted = false;

      try {
        const existingResult = await fetchResult(quizId, userId);

        if (existingResult) {
          quizAlreadyCompleted = true;
          console.log("Found existing result:", existingResult);

          Object.entries(existingResult.userAnswers).forEach(
            ([qid, ans]) => {
              dispatch({
                type: ACTIONS.SAVE_ANSWER,
                payload: { questionId: qid, answerIndex: ans as string }
              });
            }
          );

          dispatch({
            type: ACTIONS.SET_SCORE,
            payload: {
              score: existingResult.score || 0,
              maxScore: existingResult.maxScore || 0
            }
          });

          dispatch({ type: ACTIONS.SUBMIT_QUIZ });
        }
      } catch (resultError) {
        console.error("No results found on server");
      }
    } catch (err) {
      console.error("Error in quiz initialization:", err);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: (err as Error).message
      });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, [quizId, userId, dispatch, maxAttempts]);

  // Initial data loading
  useEffect(() => {
    if (dataFetchedRef.current || initialLoadRef.current) {
      return;
    }

    dataFetchedRef.current = true;
    initialLoadRef.current = true;

    loadQuizData();
  }, [loadQuizData]);

  // Effect for handling new attempts
  useEffect(() => {
    // If submitted just changed to false, it means we're starting a new attempt
    if (!submitted && dataFetchedRef.current) {
      if (!quiz) {
        console.log("Quiz is null, reloading data");
        dataFetchedRef.current = false;
        initialLoadRef.current = false;
        loadQuizData();
      }
    }
  }, [submitted, quiz, loadQuizData]);

  // Local implementation of startNewAttempt
  const startNewAttemptLocal = useCallback(() => {
    console.log("Starting new attempt locally");
    dataFetchedRef.current = false;
    initialLoadRef.current = false;

    dispatch({ type: ACTIONS.START_NEW_ATTEMPT });

    // Force reload quiz data on next render
    setTimeout(() => {
      loadQuizData();
    }, 100);
  }, [dispatch, loadQuizData]);

  const goToQuestion = useCallback(
    (idx: number) => {
      if (quiz && idx >= 0 && idx < quiz.questions.length) {
        dispatch({ type: ACTIONS.SET_CURRENT_QUESTION, payload: idx });
      }
    },
    [quiz, dispatch]
  );

  const goToPreviousQuestion = useCallback(
    () => goToQuestion(currentQuestionIndex - 1),
    [currentQuestionIndex, goToQuestion]
  );

  const goToNextQuestion = useCallback(
    () => goToQuestion(currentQuestionIndex + 1),
    [currentQuestionIndex, goToQuestion]
  );

  const saveAnswer = useCallback(
    (questionId: string, answerIndex: string) => {
      if (submitted) return;

      dispatch({
        type: ACTIONS.SAVE_ANSWER,
        payload: { questionId, answerIndex }
      });
    },
    [dispatch, submitted]
  );

  const submitQuiz = useCallback(() => {
    if (submitted || isQuizCompleted(quizId, userId)) {
      return;
    }

    if (!quiz) return;

    const unanswered = quiz.questions.filter(
      (q) => !userAnswers[q._id]
    );

    if (
      unanswered.length > 0 &&
      !window.confirm(
        `You have ${unanswered.length} unanswered question(s). Submit anyway?`
      )
    ) {
      return;
    }

    dispatch({ type: ACTIONS.SET_SUBMITTING, payload: true });

    setTimeout(() => {
      dispatch({ type: ACTIONS.SUBMIT_QUIZ });
    }, 100);
  }, [quiz, userAnswers, dispatch, submitted, quizId, userId]);

  const reviewQuiz = useCallback(
    () => {
      dispatch({ type: ACTIONS.REVIEW_QUIZ });
    },
    [dispatch]
  );

  const currentQuestion = quiz
    ? quiz.questions[currentQuestionIndex]
    : null;

  const percentageScore =
    maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  const isQuestionAnswered = useCallback(
    (qid: string) => Boolean(userAnswers[qid]),
    [userAnswers]
  );

  const isAnswerCorrect = useCallback(
    (qid: string) => {
      if (!quiz) return false;
      const found = quiz.questions.find((q) => q._id === qid);
      return found ? userAnswers[qid] === found.correctAnswer : false;
    },
    [quiz, userAnswers]
  );

  // Use either the context's startNewAttempt or our local implementation
  const effectiveStartNewAttempt = contextStartNewAttempt || startNewAttemptLocal;
  
  return {
    quiz,
    isLoading,
    error,
    currentQuestionIndex,
    currentQuestion,
    userAnswers,
    submitted,
    submitting,
    score,
    maxScore,
    percentageScore,
    lastSaved,
    goToQuestion,
    goToPreviousQuestion,
    goToNextQuestion,
    saveAnswer,
    submitQuiz,
    reviewQuiz,
    isQuestionAnswered,
    isAnswerCorrect,
    reviewMode,
    attemptNumber,
    maxAttempts,
    startNewAttempt: effectiveStartNewAttempt
  };
};

export default useQuizState;