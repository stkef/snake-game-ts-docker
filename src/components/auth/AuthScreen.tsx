import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Cake as Snake } from 'lucide-react';

const AuthScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <Snake size={48} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-bold">Snake Game</h1>
        <p className="text-gray-400 mt-2">Sign in to track your high scores</p>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex">
          <button
            className={`flex-1 py-3 font-medium ${
              activeTab === 'login' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-400 hover:bg-gray-700/50'
            } transition`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 font-medium ${
              activeTab === 'register' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-400 hover:bg-gray-700/50'
            } transition`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'login' ? <LoginForm /> : <RegisterForm onSuccess={() => setActiveTab('login')} />}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;