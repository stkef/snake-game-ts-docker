import { expect, describe, it } from 'vitest';
import { BOARD_SIZE } from '../src/constants/gameConfig';

// These are basic unit tests for game logic
// In a real project, you'd have more comprehensive tests

describe('Snake Game Logic', () => {
  // Helper to simulate snake movement logic
  const moveSnake = (
    snake: { x: number; y: number }[], 
    direction: 'up' | 'down' | 'left' | 'right'
  ) => {
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
    
    return [head, ...snake.slice(0, -1)];
  };

  // Test snake movement
  it('should move snake in the specified direction', () => {
    const snake = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 }
    ];
    
    // Move right
    const movedRight = moveSnake(snake, 'right');
    expect(movedRight[0]).toEqual({ x: 6, y: 5 });
    expect(movedRight).toHaveLength(3);
    
    // Move down
    const movedDown = moveSnake(snake, 'down');
    expect(movedDown[0]).toEqual({ x: 5, y: 6 });
    
    // Move left
    const movedLeft = moveSnake(snake, 'left');
    expect(movedLeft[0]).toEqual({ x: 4, y: 5 });
    
    // Move up
    const movedUp = moveSnake(snake, 'up');
    expect(movedUp[0]).toEqual({ x: 5, y: 4 });
  });

  // Test collision detection with walls
  it('should detect wall collisions', () => {
    // Snake at the edge, moving right (will collide)
    const rightEdgeSnake = [
      { x: BOARD_SIZE - 1, y: 5 },
      { x: BOARD_SIZE - 2, y: 5 }
    ];
    const movedRight = moveSnake(rightEdgeSnake, 'right');
    const hasWallCollision = movedRight[0].x >= BOARD_SIZE;
    expect(hasWallCollision).toBe(true);
    
    // Snake at the edge, moving left (will collide)
    const leftEdgeSnake = [
      { x: 0, y: 5 },
      { x: 1, y: 5 }
    ];
    const movedLeft = moveSnake(leftEdgeSnake, 'left');
    const hasLeftWallCollision = movedLeft[0].x < 0;
    expect(hasLeftWallCollision).toBe(true);
  });

  // Test self-collision detection
  it('should detect self collisions', () => {
    const snake = [
      { x: 5, y: 5 }, // head
      { x: 5, y: 6 },
      { x: 6, y: 6 },
      { x: 6, y: 5 },
      { x: 6, y: 4 },
      { x: 5, y: 4 }, // tail (will be next to head)
    ];
    
    // Move left (into itself)
    const movedLeft = moveSnake(snake, 'left');
    
    // Check if head position matches any body segment
    const hasSelfCollision = snake.slice(1).some(
      segment => segment.x === movedLeft[0].x && segment.y === movedLeft[0].y
    );
    
    expect(hasSelfCollision).toBe(true);
  });
});