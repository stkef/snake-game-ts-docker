import { create } from 'zustand';
import { BOARD_SIZE, INITIAL_SNAKE_LENGTH } from '../constants/gameConfig';
import { Position, Direction, GameStatus } from '../types/game';

// Utility functions
const createInitialSnake = (): Position[] => {
  const startX = Math.floor(BOARD_SIZE / 4);
  const startY = Math.floor(BOARD_SIZE / 2);
  
  return Array.from({ length: INITIAL_SNAKE_LENGTH }, (_, i) => ({
    x: startX - i,
    y: startY
  }));
};

const generateFood = (snake: Position[]): Position => {
  let newFood: Position;
  
  do {
    newFood = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE)
    };
    // Make sure food doesn't appear on the snake
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  
  return newFood;
};

interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  gameOver: boolean;
  gameStatus: GameStatus;
  gameSpeed: number;
  difficulty: 'easy' | 'medium' | 'hard';
  setDirection: (direction: Direction) => void;
  startGame: () => void;
  resetGame: () => void;
  updateGame: () => void;
  setGameSpeed: (speed: number) => void;
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  snake: createInitialSnake(),
  food: { x: 0, y: 0 }, // Initial food position will be set in resetGame
  direction: 'right',
  nextDirection: 'right',
  score: 0,
  gameOver: false,
  gameStatus: 'ready',
  gameSpeed: 3, // 1-5 scale
  difficulty: 'medium',
  
  setDirection: (direction: Direction) => {
    const { direction: currentDirection } = get();
    
    // Prevent 180-degree turns
    if (
      (direction === 'up' && currentDirection === 'down') ||
      (direction === 'down' && currentDirection === 'up') ||
      (direction === 'left' && currentDirection === 'right') ||
      (direction === 'right' && currentDirection === 'left')
    ) {
      return;
    }
    
    set({ direction });
  },
  
  startGame: () => {
    set({ gameStatus: 'playing' });
  },
  
  resetGame: () => {
    const initialSnake = createInitialSnake();
    set({
      snake: initialSnake,
      food: generateFood(initialSnake),
      direction: 'right',
      nextDirection: 'right',
      score: 0,
      gameOver: false,
      gameStatus: 'ready'
    });
  },
  
  updateGame: () => {
    const { snake, food, direction, score, gameStatus } = get();
    
    if (gameStatus !== 'playing') return;
    
    // Create a new head based on current direction
    const head = { ...snake[0] };
    
    switch (direction) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
    }
    
    // Check for collisions with walls
    if (
      head.x < 0 || 
      head.x >= BOARD_SIZE || 
      head.y < 0 || 
      head.y >= BOARD_SIZE
    ) {
      set({ gameOver: true, gameStatus: 'game-over' });
      return;
    }
    
    // Check for collisions with self (except tail as it will move)
    if (snake.slice(0, -1).some(segment => segment.x === head.x && segment.y === head.y)) {
      set({ gameOver: true, gameStatus: 'game-over' });
      return;
    }
    
    // Create new snake
    const newSnake = [head, ...snake];
    
    // Check if snake ate food
    let newFood = food;
    let newScore = score;
    
    if (head.x === food.x && head.y === food.y) {
      // Generate new food and increase score
      newFood = generateFood(newSnake);
      newScore += 10;
    } else {
      // Remove tail if no food eaten
      newSnake.pop();
    }
    
    set({
      snake: newSnake,
      food: newFood,
      score: newScore
    });
  },
  
  setGameSpeed: (speed: number) => {
    set({ gameSpeed: speed });
  },
  
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => {
    set({ difficulty });
  }
}));

// Initialize the game
useGameStore.getState().resetGame();