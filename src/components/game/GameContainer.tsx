import React, { useState } from 'react';
import GameBoard from './GameBoard';
import GameSettings from './GameSettings';
import LeaderBoard from './LeaderBoard';
import { useGameStore } from '../../stores/gameStore';
import { Gamepad2, Settings, Trophy } from 'lucide-react';

const GameContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'game' | 'leaderboard' | 'settings'>('game');
  const { gameStatus } = useGameStore();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="flex border-b border-gray-700">
          <button
            className={`flex items-center justify-center py-3 px-4 flex-1 ${
              activeTab === 'game' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700/50'
            } transition`}
            onClick={() => setActiveTab('game')}
            disabled={gameStatus === 'playing'}
          >
            <Gamepad2 size={18} className="mr-2" />
            Game
          </button>
          <button
            className={`flex items-center justify-center py-3 px-4 flex-1 ${
              activeTab === 'leaderboard' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700/50'
            } transition`}
            onClick={() => setActiveTab('leaderboard')}
            disabled={gameStatus === 'playing'}
          >
            <Trophy size={18} className="mr-2" />
            Leaderboard
          </button>
          <button
            className={`flex items-center justify-center py-3 px-4 flex-1 ${
              activeTab === 'settings' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700/50'
            } transition`}
            onClick={() => setActiveTab('settings')}
            disabled={gameStatus === 'playing'}
          >
            <Settings size={18} className="mr-2" />
            Settings
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'game' && <GameBoard />}
          {activeTab === 'leaderboard' && <LeaderBoard />}
          {activeTab === 'settings' && <GameSettings />}
        </div>
      </div>
    </div>
  );
};

export default GameContainer;