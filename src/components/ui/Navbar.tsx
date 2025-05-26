import React from 'react';
import { useUserStore } from '../../stores/userStore';
import { Cake as Snake, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useUserStore();

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Snake className="h-8 w-8 text-green-500 mr-2" />
            <span className="font-bold text-xl text-white">Snake Game</span>
          </div>
          
          <div>
            {currentUser && (
              <div className="flex items-center">
                <div className="mr-4 flex items-center">
                  <User size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-300">{currentUser.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center bg-gray-700 text-gray-300 px-3 py-1 rounded-md hover:bg-gray-600 transition"
                >
                  <LogOut size={16} className="mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;