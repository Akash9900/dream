import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define theme colors
export const lightTheme = {
  background: '#f5f5f5',
  card: '#ffffff',
  text: '#333333',
  secondaryText: '#666666',
  primary: '#007bff',
  border: '#eeeeee',
  error: '#dc3545',
  success: '#28a745',
  warning: '#ffc107',
  disabled: '#cccccc',
};

export const darkTheme = {
  background: '#121212',
  card: '#1e1e1e',
  text: '#f5f5f5',
  secondaryText: '#a0a0a0',
  primary: '#0a84ff',
  border: '#2c2c2c',
  error: '#ff453a',
  success: '#32d74b',
  warning: '#ffd60a',
  disabled: '#3a3a3c',
};

// Create context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get device color scheme
  const deviceTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(deviceTheme === 'dark');
  const [theme, setTheme] = useState(isDarkMode ? darkTheme : lightTheme);

  // Update theme when isDarkMode changes
  useEffect(() => {
    setTheme(isDarkMode ? darkTheme : lightTheme);
  }, [isDarkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => useContext(ThemeContext); 