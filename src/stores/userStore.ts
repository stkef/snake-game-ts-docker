import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/user';

interface UserState {
  users: User[];
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string) => boolean;
  updateHighScore: (userId: string, score: number) => void;
  initializeUserState: () => void;
}

// Demo users for easy testing
const DEMO_USERS: User[] = [
  {
    id: 'demo-1',
    username: 'demo',
    password: 'password', // In a real app, this would be hashed
    highScore: 50,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    username: 'player1',
    password: 'password',
    highScore: 120,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    username: 'snake_master',
    password: 'password',
    highScore: 200,
    createdAt: new Date().toISOString(),
  },
];

const STORAGE_KEYS = {
  USERS: 'snake_game_users',
  CURRENT_USER: 'snake_game_current_user',
};

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  currentUser: null,
  
  initializeUserState: () => {
    // Load users from local storage or use demo users
    let storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    let users: User[] = [];
    
    if (storedUsers) {
      try {
        users = JSON.parse(storedUsers);
      } catch (error) {
        console.error('Failed to parse users from local storage', error);
        users = [...DEMO_USERS];
      }
    } else {
      users = [...DEMO_USERS];
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
    
    // Load current user from local storage
    const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    let currentUser: User | null = null;
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Verify user exists in user list
        currentUser = users.find(u => u.id === parsedUser.id) || null;
      } catch (error) {
        console.error('Failed to parse current user from local storage', error);
      }
    }
    
    set({ users, currentUser });
  },
  
  login: (username: string, password: string) => {
    const { users } = get();
    const user = users.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );
    
    if (user) {
      set({ currentUser: user });
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      return true;
    }
    
    return false;
  },
  
  logout: () => {
    set({ currentUser: null });
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
  
  register: (username: string, password: string) => {
    const { users } = get();
    
    // Check if username already exists
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      return false;
    }
    
    const newUser: User = {
      id: uuidv4(),
      username,
      password, // In a real app, this would be hashed
      highScore: 0,
      createdAt: new Date().toISOString(),
    };
    
    const updatedUsers = [...users, newUser];
    
    set({ users: updatedUsers });
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
    
    return true;
  },
  
  updateHighScore: (userId: string, score: number) => {
    const { users, currentUser } = get();
    
    const updatedUsers = users.map(user => {
      if (user.id === userId && score > user.highScore) {
        return { ...user, highScore: score };
      }
      return user;
    });
    
    // Update current user if that's the one being updated
    let updatedCurrentUser = currentUser;
    if (currentUser && currentUser.id === userId && score > currentUser.highScore) {
      updatedCurrentUser = { ...currentUser, highScore: score };
    }
    
    set({ 
      users: updatedUsers,
      currentUser: updatedCurrentUser
    });
    
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
    if (updatedCurrentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedCurrentUser));
    }
  },
}));