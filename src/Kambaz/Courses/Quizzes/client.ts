import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const findQuizzesForCourse = async (courseId: any) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const fetchAllQuizzes = async () => {
  const { data } = await axiosWithCredentials.get(QUIZZES_API);
  return data;
};

export async function createQuiz(quiz: any) {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${quiz.courseId}/quizzes/create`, quiz);
  return response.data;
}

export async function deleteQuiz(quizId: any) {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}/delete`);
  return response.data;
}


export async function publishUnpublishQuizClient(quizId: any, quizStatus: any) {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/status`,
    { status: quizStatus == "publish" ? "unpublish" : "publish" } // this is the request body
  );
  return response.data;
}

export async function getQuizById(quizId: any) {
  console.log("quizId", quizId);
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  console.log("dfcvgbhnjkml,wuqydfwqvh", response.data);
  return response.data;
}

export async function updateQuizData(quizId: any, quizData: any) {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/update`, quizData);
  return response.data;
}

export const findQuizQuestions = async (quizId: any) => {
  console.log("quizId", quizId);
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

export const createQuizQuestion = async (quizId: any, questions: any[],totalPoints: number = 0) => {
  console.log("questions abcccc", questions);
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions/create`,
    { questions,
      totalPoints }
  );
  return response.data;
};

export const getQuizQuestionById = async (quizId: any) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
  console.log("response.data", response.data);
  return response.data;
}

// export const updateQuizQuestion = async (quizId: string, questionId: string, question: any) => {
//   const response = await axiosWithCredentials.put(
//     `${QUIZZES_API}/${quizId}/questions/${questionId}/update`,
//     question
//   );
//   return response.data;
// };
export const updateQuizQuestion = async (quizId: string, questionId: string, questionData: Record<string, any>, totalPoints: number) => {
  console.log("quizId", quizId);
  console.log("questionId", questionId);
  console.log("questionData", questionData);
  console.log("totalPoints", totalPoints);

  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/questions/${questionId}/update`,
    { 
      quizData: questionData,
      points: totalPoints 
    }
  );
  return response.data;
};
export const deleteQuizQuestion = async (quizId: string, questionId: string) => {
  console.log("quizId", quizId);
  console.log(`${QUIZZES_API}/${quizId}/questions/${questionId}/delete`);
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}/questions/${questionId}/delete`
  );
  return response.data;
}