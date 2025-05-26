export interface User {
  id: string;
  username: string;
  password: string; // In a real app, this would be hashed
  highScore: number;
  createdAt: string;
}