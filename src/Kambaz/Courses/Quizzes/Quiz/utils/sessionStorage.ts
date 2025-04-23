const SESSION_KEYS = {
  QUIZ_STATE: 'quiz_full_state'
};

export const saveStateToSession = (state: any): void => {
  try {
    sessionStorage.setItem(
      SESSION_KEYS.QUIZ_STATE,
      JSON.stringify(state)
    );
  } catch (error) {
    console.error('Error saving state to sessionStorage:', error);
  }
};

export const loadStateFromSession = (): any | null => {
  try {
    const storedData = sessionStorage.getItem(SESSION_KEYS.QUIZ_STATE);
    if (!storedData) return null;
    const state = JSON.parse(storedData);
    return state;
  } catch (error) {
    console.error('Error loading state from sessionStorage:', error);
    return null;
  }
};

export const clearQuizState = (): void => {
  try {
    sessionStorage.removeItem(SESSION_KEYS.QUIZ_STATE);
  } catch (error) {
    console.error('Error clearing quiz state:', error);
  }
};