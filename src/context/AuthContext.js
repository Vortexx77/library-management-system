import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (!token) return;

      try {
        const response = await fetch('http://localhost/library-api/auth/check.php', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success && data.data.user) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: data.data.user, token },
          });
        } else {
          // Token is invalid or expired, clear storage
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        // Clear storage on error
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      }
    };

    verifyAuth();
  }, []);

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await fetch('http://localhost/library-api/auth/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      const { user, token } = data.data;

      // Store in localStorage
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message || 'An error occurred during login.',
      });
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

    // Always clear client-side state first
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    dispatch({ type: 'LOGOUT' });

    if (token) {
      try {
        await fetch('http://localhost/library-api/auth/logout.php', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout API call failed:', error);
      }
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};