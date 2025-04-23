import fetch from 'node-fetch';

const API_BASE = 'http://localhost:4000/api';
const quizId = '644000000000000000000002';
const userId = 'user123';

async function testQuizQuestions() {
  try {
    const response = await fetch(`${API_BASE}/quizzes/${quizId}/questions`);

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
  } catch (error) {
    console.error('Error testing quiz questions API:', error);
  }
}

async function testQuizResults() {
  try {
    const response = await fetch(`${API_BASE}/quiz-results/${quizId}/${userId}`);

    if (response.status === 404) {
      return;
    }

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
  } catch (error) {
    console.error('Error testing quiz results API:', error);
  }
}

await testQuizQuestions();
await testQuizResults();