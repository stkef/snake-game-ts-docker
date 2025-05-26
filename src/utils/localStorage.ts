// Utility functions for working with localStorage safely

/**
 * Save data to localStorage with error handling
 */
export const saveToStorage = <T>(key: string, data: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage: ${key}`, error);
    return false;
  }
};

/**
 * Load data from localStorage with error handling
 */
export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  } catch (error) {
    console.error(`Error loading from localStorage: ${key}`, error);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage with error handling
 */
export const removeFromStorage = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage: ${key}`, error);
    return false;
  }
};

/**
 * Clear all localStorage data for the application
 */
export const clearAllStorage = (): boolean => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage', error);
    return false;
  }
};

/**
 * Check if a key exists in localStorage
 */
export const hasStorageItem = (key: string): boolean => {
  return localStorage.getItem(key) !== null;
};