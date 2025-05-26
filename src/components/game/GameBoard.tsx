import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { useUserStore } from '../../stores/userStore';
import { Position } from '../../types/game';
import { CELL_SIZE, BOARD_SIZE } from '../../constants/gameConfig';

const GameBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  
  const { 
    snake, 
    food, 
    gameOver, 
    score, 
    direction, 
    gameStatus,
    setDirection, 
    startGame,
    resetGame,
    updateGame
  } = useGameStore();
  
  const { currentUser, updateHighScore } = useUserStore();

  // Initialize canvas context
  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        setCtx(context);
      }
    }
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'down') setDirection('up');
          break;
        case 'ArrowDown':
          if (direction !== 'up') setDirection('down');
          break;
        case 'ArrowLeft':
          if (direction !== 'right') setDirection('left');
          break;
        case 'ArrowRight':
          if (direction !== 'left') setDirection('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, setDirection, gameStatus]);

  // Game loop
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const gameInterval = setInterval(() => {
      updateGame();
    }, 150);

    return () => clearInterval(gameInterval);
  }, [gameStatus, updateGame]);

  // Update canvas when game state changes
  useEffect(() => {
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, BOARD_SIZE * CELL_SIZE, BOARD_SIZE * CELL_SIZE);
    
    // Draw grid (optional, for visual reference)
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= BOARD_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, BOARD_SIZE * CELL_SIZE);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(BOARD_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }
    
    // Draw food
    ctx.fillStyle = '#f87171';
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Draw snake
    ctx.fillStyle = '#4ade80';
    snake.forEach((segment, index) => {
      // Head has different color
      if (index === 0) {
        ctx.fillStyle = '#10b981';
      } else {
        ctx.fillStyle = '#4ade80';
      }
      
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
      
      // Draw eyes on the head
      if (index === 0) {
        ctx.fillStyle = '#000';
        const eyeSize = CELL_SIZE / 6;
        const eyeOffset = CELL_SIZE / 4;
        
        // Left eye
        ctx.beginPath();
        ctx.arc(
          segment.x * CELL_SIZE + eyeOffset,
          segment.y * CELL_SIZE + eyeOffset,
          eyeSize,
          0,
          Math.PI * 2
        );
        ctx.fill();
        
        // Right eye
        ctx.beginPath();
        ctx.arc(
          segment.x * CELL_SIZE + CELL_SIZE - eyeOffset,
          segment.y * CELL_SIZE + eyeOffset,
          eyeSize,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });

  }, [snake, food, ctx]);

  // Update high score when game is over
  useEffect(() => {
    if (gameOver && currentUser) {
      updateHighScore(currentUser.id, score);
    }
  }, [gameOver, score, currentUser, updateHighScore]);

  // Mobile controls
  const handleSwipe = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameStatus !== 'playing') return;
    
    switch (direction) {
      case 'up':
        if (direction !== 'down') setDirection('up');
        break;
      case 'down':
        if (direction !== 'up') setDirection('down');
        break;
      case 'left':
        if (direction !== 'right') setDirection('left');
        break;
      case 'right':
        if (direction !== 'left') setDirection('right');
        break;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex justify-between w-full max-w-md">
        <div className="text-lg font-semibold">Score: {score}</div>
        <div className="text-lg font-semibold">High Score: {currentUser?.highScore || 0}</div>
      </div>
      
      <div className="relative border-2 border-gray-700 rounded-lg overflow-hidden">
        <canvas 
          ref={canvasRef}
          width={BOARD_SIZE * CELL_SIZE}
          height={BOARD_SIZE * CELL_SIZE}
          className="bg-gray-800"
        />
        
        {gameStatus === 'ready' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <button
              onClick={startGame}
              className="px-6 py-3 bg-green-500 text-white rounded-full font-bold text-lg hover:bg-green-600 transition"
            >
              Start Game
            </button>
          </div>
        )}
        
        {gameStatus === 'game-over' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="text-xl mb-6">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-green-500 text-white rounded-full font-bold text-lg hover:bg-green-600 transition"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      
      {/* Mobile controls */}
      <div className="md:hidden mt-6 grid grid-cols-3 gap-2 w-48">
        <div className="col-start-2">
          <button
            onTouchStart={() => handleSwipe('up')}
            className="w-full h-12 bg-gray-700 rounded-lg flex items-center justify-center"
          >
            ↑
          </button>
        </div>
        <div className="col-start-1 col-end-4 grid grid-cols-3 gap-2">
          <button
            onTouchStart={() => handleSwipe('left')}
            className="w-full h-12 bg-gray-700 rounded-lg flex items-center justify-center"
          >
            ←
          </button>
          <button
            onTouchStart={() => handleSwipe('down')}
            className="w-full h-12 bg-gray-700 rounded-lg flex items-center justify-center"
          >
            ↓
          </button>
          <button
            onTouchStart={() => handleSwipe('right')}
            className="w-full h-12 bg-gray-700 rounded-lg flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;