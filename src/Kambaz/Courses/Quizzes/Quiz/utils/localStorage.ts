const STORAGE_KEYS = {
  ANSWERS: (quizId: string, userId: string) => `quiz_answers_${quizId}_${userId}`,
  COMPLETED: (quizId: string, userId: string) => `quiz_completed_${quizId}_${userId}`
};

export const saveAnswersToStorage = (
  quizId: string,
  userId: string,
  answers: Record<string, string>
): void => {
  try {
    localStorage.setItem(
      STORAGE_KEYS.ANSWERS(quizId, userId),
      JSON.stringify(answers)
    );
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadAnswersFromStorage = (
  quizId: string,
  userId: string
): Record<string, string> | null => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEYS.ANSWERS(quizId, userId));
    if (!storedData) return null;

    const answers = JSON.parse(storedData);
    return answers;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const markQuizCompleted = (quizId: string, userId: string): void => {
  try {
    localStorage.setItem(
      STORAGE_KEYS.COMPLETED(quizId, userId),
      'true'
    );

    localStorage.removeItem(STORAGE_KEYS.ANSWERS(quizId, userId));
  } catch (error) {
    console.error('Error marking quiz as completed:', error);
  }
};

export const isQuizCompleted = (quizId: string, userId: string): boolean => {
  if (!quizId || !userId) {
    console.warn('Missing quizId or userId when checking completion status');
    return false;
  }

  try {
    return localStorage.getItem(STORAGE_KEYS.COMPLETED(quizId, userId)) === 'true';
  } catch (error) {
    console.error('Error checking if quiz is completed:', error);
    return false;
  }
};

export const clearQuizData = (quizId: string, userId: string): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.ANSWERS(quizId, userId));
    localStorage.removeItem(STORAGE_KEYS.COMPLETED(quizId, userId));
  } catch (error) {
    console.error('Error clearing quiz data:', error);
  }
};