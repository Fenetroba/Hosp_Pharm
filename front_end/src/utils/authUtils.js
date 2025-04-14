// Get user data from localStorage
export const getUserFromStorage = () => {
  try {
    const storedState = localStorage.getItem('authState');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      return {
        user: parsedState.user,
        isAuthenticated: parsedState.isAuthenticated,
        loading: false,
        error: null
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user from storage:', error);
    return null;
  }
};

// Save user data to localStorage
export const saveUserToStorage = (state) => {
  try {
    const dataToStore = {
      user: state.user,
      isAuthenticated: state.isAuthenticated
    };
    localStorage.setItem('authState', JSON.stringify(dataToStore));
  } catch (error) {
    console.error('Error saving user to storage:', error);
  }
};

// Clear user data from localStorage
export const clearUserFromStorage = () => {
  try {
    localStorage.removeItem('authState');
  } catch (error) {
    console.error('Error clearing user from storage:', error);
  }
}; 