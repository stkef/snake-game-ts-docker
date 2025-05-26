import React from 'react';
import { useGameStore } from '../../stores/gameStore';

const GameSettings: React.FC = () => {
  const { 
    gameSpeed, 
    difficulty, 
    setGameSpeed, 
    setDifficulty 
  } = useGameStore();

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameSpeed(Number(e.target.value));
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value as 'easy' | 'medium' | 'hard');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Game Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Game Speed</label>
          <div className="flex items-center">
            <span className="mr-3 text-sm">Slow</span>
            <input
              type="range"
              min="1"
              max="5"
              value={gameSpeed}
              onChange={handleSpeedChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-3 text-sm">Fast</span>
          </div>
          <div className="mt-1 text-center text-sm text-gray-400">
            Current: {gameSpeed === 1 ? 'Very Slow' : 
                     gameSpeed === 2 ? 'Slow' :
                     gameSpeed === 3 ? 'Normal' :
                     gameSpeed === 4 ? 'Fast' : 'Very Fast'}
          </div>
        </div>
        
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium mb-2">
            Difficulty
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={handleDifficultyChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <div className="mt-1 text-sm text-gray-400">
            {difficulty === 'easy' ? 'Larger board, slower snake growth' : 
             difficulty === 'medium' ? 'Standard gameplay' :
             'Smaller board, faster snake growth'}
          </div>
        </div>
        
        <div className="pt-4">
          <h3 className="font-medium text-lg mb-3">How to Play</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>Use arrow keys to control the snake (or swipe on mobile)</li>
            <li>Eat the red food to grow and earn points</li>
            <li>Avoid hitting the walls or your own tail</li>
            <li>The game ends when you hit a wall or your own tail</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameSettings;