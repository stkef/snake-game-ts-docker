import { v4 as uuidv4 } from 'uuid';

// In a real app, this would use a proper hashing library
export const hashPassword = (password: string): string => {
  // This is a placeholder - DO NOT use this in production!
  // In a real app, use bcrypt or similar
  return `${password}_hashed`;
};

export const validatePassword = (plainPassword: string, hashedPassword: string): boolean => {
  // This is a placeholder - DO NOT use this in production!
  return `${plainPassword}_hashed` === hashedPassword;
};

// Generate a secure token
export const generateToken = (): string => {
  return uuidv4();
};

// Sanitize user input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Validate username for allowed characters
export const validateUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};