// useAuth.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from './userApis';
// Import the login function

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Function to check for existing tokens and set up user state
  const checkAuthState = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        setIsAuthenticated(true);
        
        // Optionally validate token with backend
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking authentication state:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthState(); // Check authentication state on mount
  }, [isAuthenticated]);

  // Function to log in
  const handleLogin = async (username, password) => {
    try {
       
      const data = await login(username, password);
      setIsAuthenticated(true);
      await AsyncStorage.setItem('user',username)
      return data;
    } catch (error) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
      throw error;
    }
  };

  // Function to log out
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    isAuthenticated,
  
    loading,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
