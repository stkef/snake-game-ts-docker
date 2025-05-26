import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../stores/userStore';
import { User } from '../../types/user';
import { Trophy, Medal, Award } from 'lucide-react';

const LeaderBoard: React.FC = () => {
  const { users } = useUserStore();
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [view, setView] = useState<'global' | 'friends'>('global');

  useEffect(() => {
    // Sort users by high score in descending order
    const sortedUsers = [...users].sort((a, b) => b.highScore - a.highScore);
    setTopUsers(sortedUsers.slice(0, 10)); // Get top 10
  }, [users]);

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Trophy className="mr-2 text-yellow-500" />
          Leaderboard
        </h2>
        
        <div className="flex bg-gray-700 rounded-lg overflow-hidden">
          <button
            className={`px-4 py-1 text-sm ${
              view === 'global' ? 'bg-green-600' : 'hover:bg-gray-600'
            }`}
            onClick={() => setView('global')}
          >
            Global
          </button>
          <button
            className={`px-4 py-1 text-sm ${
              view === 'friends' ? 'bg-green-600' : 'hover:bg-gray-600'
            }`}
            onClick={() => setView('friends')}
          >
            Friends
          </button>
        </div>
      </div>
      
      {view === 'friends' && (
        <div className="text-center py-8 text-gray-400">
          <p>Friends feature coming soon!</p>
        </div>
      )}
      
      {view === 'global' && (
        <div className="bg-gray-700 rounded-lg overflow-hidden">
          <div className="flex font-medium text-xs uppercase text-gray-400 bg-gray-800 px-4 py-2">
            <div className="w-12 text-center">Rank</div>
            <div className="flex-1">Player</div>
            <div className="w-20 text-right">Score</div>
          </div>
          
          <div className="divide-y divide-gray-600">
            {topUsers.length === 0 ? (
              <div className="py-4 text-center text-gray-400">No scores yet</div>
            ) : (
              topUsers.map((user, index) => (
                <div 
                  key={user.id}
                  className={`flex items-center py-3 px-4 ${
                    index < 3 ? 'bg-gray-700/50' : ''
                  } hover:bg-gray-600/50 transition duration-150`}
                >
                  <div className="w-12 text-center flex justify-center">
                    {index === 0 ? (
                      <Trophy size={18} className="text-yellow-500" />
                    ) : index === 1 ? (
                      <Medal size={18} className="text-gray-300" />
                    ) : index === 2 ? (
                      <Award size={18} className="text-amber-700" />
                    ) : (
                      <span className="text-gray-400">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 truncate font-medium">
                    {user.username}
                  </div>
                  <div className="w-20 text-right font-semibold">
                    {user.highScore}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;