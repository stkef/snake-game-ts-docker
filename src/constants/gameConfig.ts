export const CELL_SIZE = 20; // Size of each cell in pixels
export const BOARD_SIZE = 20; // Number of cells in each dimension
export const INITIAL_SNAKE_LENGTH = 3; // Initial length of the snake
export const INITIAL_SPEED = 150; // Initial game speed in milliseconds
export const SPEED_LEVELS = {
  1: 200, // Very slow
  2: 150, // Slow
  3: 100, // Normal
  4: 75,  // Fast
  5: 50   // Very fast
};

export const DIFFICULTY_SETTINGS = {
  easy: {
    boardSize: 25,
    growthRate: 1,
    speedMultiplier: 1.2
  },
  medium: {
    boardSize: 20,
    growthRate: 1,
    speedMultiplier: 1
  },
  hard: {
    boardSize: 15,
    growthRate: 2,
    speedMultiplier: 0.8
  }
};